import Papa from "papaparse";

import { categories } from "@/constants/categories";
import { currencies, defaultCurrencyCode } from "@/constants/currencies";
import { sanitizeMoneyValue } from "@/services/money.service";
import {
    Account,
    CreateMovementInput,
    CurrencyCode,
    Movement,
    MovementKind,
} from "@/types/finance.types";
import {
    CsvMovementImportRow,
    MovementImportPreviewItem,
    MovementImportResult,
} from "@/types/import.types";

const requiredColumns = ["Fecha", "Tipo", "Cuenta", "Monto"];

function normalizeText(value?: string) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function parseMovementKind(value?: string): MovementKind | undefined {
  const normalized = normalizeText(value);

  if (["ingreso", "income", "entrada"].includes(normalized)) {
    return "income";
  }

  if (["egreso", "expense", "gasto", "salida"].includes(normalized)) {
    return "expense";
  }

  return undefined;
}

function parseDate(value?: string) {
  if (!value?.trim()) {
    return undefined;
  }

  const directDate = new Date(value);

  if (!Number.isNaN(directDate.getTime())) {
    return directDate.toISOString();
  }

  const parts = value.trim().split(/[/-]/);

  if (parts.length === 3) {
    const [day, month, year] = parts.map(Number);

    if (day && month && year) {
      const date = new Date(year, month - 1, day);

      if (!Number.isNaN(date.getTime())) {
        return date.toISOString();
      }
    }
  }

  return undefined;
}

function findAccountByName(accounts: Account[], accountName?: string) {
  const normalizedAccountName = normalizeText(accountName);

  return accounts.find(
    (account) =>
      account.status === "active" &&
      normalizeText(account.name) === normalizedAccountName,
  );
}

function findCategoryByName(categoryName?: string) {
  const normalizedCategoryName = normalizeText(categoryName);

  if (!normalizedCategoryName) {
    return categories[0];
  }

  return (
    categories.find(
      (category) => normalizeText(category.name) === normalizedCategoryName,
    ) ?? categories[0]
  );
}

function resolveCurrency(
  value: string | undefined,
  fallback: CurrencyCode,
): CurrencyCode {
  const code = String(value ?? fallback)
    .trim()
    .toUpperCase();

  const currency = currencies.find((item) => item.code === code);

  return currency?.code ?? fallback;
}

function buildFingerprint(input: CreateMovementInput) {
  return [
    input.date.slice(0, 10),
    input.kind,
    input.accountId,
    input.categoryId,
    input.amount.toFixed(2),
    input.currency,
    normalizeText(input.note),
  ].join("|");
}

function getExistingMovementFingerprints(movements: Movement[]) {
  return new Set(
    movements.map((movement) =>
      [
        movement.date.slice(0, 10),
        movement.kind,
        movement.accountId,
        movement.categoryId,
        movement.amount.toFixed(2),
        movement.currency,
        normalizeText(movement.note),
      ].join("|"),
    ),
  );
}

function validateColumns(fields?: string[]) {
  const normalizedFields = new Set((fields ?? []).map((field) => field.trim()));

  return requiredColumns.filter((column) => !normalizedFields.has(column));
}

function mapRowToMovementInput(params: {
  row: CsvMovementImportRow;
  rowIndex: number;
  accounts: Account[];
}): MovementImportPreviewItem {
  const { row, rowIndex, accounts } = params;

  const errors: string[] = [];

  const kind = parseMovementKind(row.Tipo);
  const account = findAccountByName(accounts, row.Cuenta);
  const date = parseDate(row.Fecha);
  const amount = sanitizeMoneyValue(row.Monto ?? "");
  const category = findCategoryByName(row.Categoría);

  if (!date) {
    errors.push("Fecha inválida.");
  }

  if (!kind) {
    errors.push("Tipo inválido. Usa Ingreso o Egreso.");
  }

  if (!account) {
    errors.push(`Cuenta no encontrada: ${row.Cuenta ?? ""}.`);
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    errors.push("Monto inválido. Debe ser mayor a 0.");
  }

  if (errors.length > 0 || !kind || !account || !date) {
    return {
      rowIndex,
      raw: row,
      status: "invalid",
      errors,
    };
  }

  const currency = resolveCurrency(
    row.Moneda,
    account.mainCurrency ?? defaultCurrencyCode,
  );

  const input: CreateMovementInput = {
    kind,
    amount,
    currency,
    accountId: account.id,
    categoryId: category.id,
    tagIds: [],
    note: row.Nota?.trim(),
    status: "confirmed",
    date,
  };

  const fingerprint = buildFingerprint(input);

  return {
    rowIndex,
    raw: row,
    input,
    status: "valid",
    errors: [],
    fingerprint,
  };
}

export function parseMovementCsv(params: {
  csvContent: string;
  accounts: Account[];
  existingMovements: Movement[];
}): MovementImportResult {
  const { csvContent, accounts, existingMovements } = params;

  const parsed = Papa.parse<CsvMovementImportRow>(csvContent, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  const missingColumns = validateColumns(parsed.meta.fields);

  if (missingColumns.length > 0) {
    const message = `Faltan columnas obligatorias: ${missingColumns.join(", ")}.`;

    return {
      totalRows: parsed.data.length,
      validRows: 0,
      invalidRows: parsed.data.length || 1,
      duplicateRows: 0,
      items: [
        {
          rowIndex: 1,
          raw: {},
          status: "invalid",
          errors: [message],
        },
      ],
    };
  }

  const existingFingerprints =
    getExistingMovementFingerprints(existingMovements);
  const importFingerprints = new Set<string>();

  const items = parsed.data.map((row, index) => {
    const item = mapRowToMovementInput({
      row,
      rowIndex: index + 2,
      accounts,
    });

    if (!item.fingerprint || item.status !== "valid") {
      return item;
    }

    if (
      existingFingerprints.has(item.fingerprint) ||
      importFingerprints.has(item.fingerprint)
    ) {
      return {
        ...item,
        status: "duplicate" as const,
        errors: ["Movimiento duplicado detectado."],
      };
    }

    importFingerprints.add(item.fingerprint);

    return item;
  });

  return {
    totalRows: items.length,
    validRows: items.filter((item) => item.status === "valid").length,
    invalidRows: items.filter((item) => item.status === "invalid").length,
    duplicateRows: items.filter((item) => item.status === "duplicate").length,
    items,
  };
}
