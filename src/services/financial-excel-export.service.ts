import * as XLSX from "xlsx-js-style";

import { getAccountTypeOption } from "@/constants/accountTypes";
import { getCategoryById } from "@/constants/categories";
import { saveAndShareBase64File } from "@/services/file-export.service";
import { Account, Movement, Transfer } from "@/types/finance.types";

type ExcelRow = Record<string, string | number | boolean>;

const brand = {
  dark: "050505",
  purple: "9665E0",
  softPurple: "EDE4FF",
  white: "FFFFFF",
  border: "D9D9E3",
  muted: "6B7280",
  income: "16A34A",
  expense: "DC2626",
  warning: "D97706",
};

const titleStyle = {
  font: {
    bold: true,
    sz: 18,
    color: { rgb: brand.white },
  },
  fill: {
    fgColor: { rgb: brand.purple },
  },
  alignment: {
    horizontal: "center",
    vertical: "center",
  },
};

const subtitleStyle = {
  font: {
    bold: true,
    sz: 12,
    color: { rgb: brand.dark },
  },
  fill: {
    fgColor: { rgb: brand.softPurple },
  },
  alignment: {
    horizontal: "left",
    vertical: "center",
  },
};

const headerStyle = {
  font: {
    bold: true,
    color: { rgb: brand.white },
  },
  fill: {
    fgColor: { rgb: brand.dark },
  },
  alignment: {
    horizontal: "center",
    vertical: "center",
  },
  border: {
    top: { style: "thin", color: { rgb: brand.border } },
    bottom: { style: "thin", color: { rgb: brand.border } },
    left: { style: "thin", color: { rgb: brand.border } },
    right: { style: "thin", color: { rgb: brand.border } },
  },
};

const bodyStyle = {
  alignment: {
    vertical: "center",
    wrapText: true,
  },
  border: {
    top: { style: "thin", color: { rgb: brand.border } },
    bottom: { style: "thin", color: { rgb: brand.border } },
    left: { style: "thin", color: { rgb: brand.border } },
    right: { style: "thin", color: { rgb: brand.border } },
  },
};

const moneyStyle = {
  ...bodyStyle,
  numFmt: "#,##0.00",
  alignment: {
    horizontal: "right",
    vertical: "center",
  },
};

const percentageStyle = {
  ...bodyStyle,
  numFmt: "0.00%",
  alignment: {
    horizontal: "right",
    vertical: "center",
  },
};

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

function getAccountName(accounts: Account[], accountId: string) {
  return (
    accounts.find((account) => account.id === accountId)?.name ??
    "Cuenta no encontrada"
  );
}

function buildAccountsRows(accounts: Account[]): ExcelRow[] {
  return accounts
    .filter((account) => account.status === "active")
    .map((account) => ({
      ID: account.id,
      Nombre: account.name,
      Tipo: getAccountTypeOption(account.type)?.label ?? account.type,
      "Moneda principal": account.mainCurrency,
      "Saldo principal": account.balances[0]?.amount ?? 0,
      "Incluida en patrimonio": account.includeInTotalBalance ? "Sí" : "No",
      Estado: account.status,
      "Fecha creación": formatDate(account.createdAt),
      "Fecha actualización": formatDate(account.updatedAt),
    }));
}

function buildMovementsRows(
  accounts: Account[],
  movements: Movement[],
): ExcelRow[] {
  return movements.map((movement) => ({
    ID: movement.id,
    Fecha: formatDate(movement.date),
    Tipo: movement.kind === "income" ? "Ingreso" : "Egreso",
    Cuenta: getAccountName(accounts, movement.accountId),
    Categoría: getCategoryById(movement.categoryId)?.name ?? "Sin categoría",
    Monto: movement.amount,
    Moneda: movement.currency,
    "Saldo después": movement.balanceAfterMovement ?? "",
    "Tiene comprobante": movement.attachment ? "Sí" : "No",
    "Archivo comprobante": movement.attachment?.name ?? "",
    Estado: movement.status,
    Nota: movement.note ?? "",
    "Fecha creación": formatDate(movement.createdAt),
    "Fecha actualización": formatDate(movement.updatedAt),
  }));
}

function buildTransfersRows(
  accounts: Account[],
  transfers: Transfer[],
): ExcelRow[] {
  return transfers.map((transfer) => ({
    ID: transfer.id,
    Fecha: formatDate(transfer.date),
    "Cuenta origen": getAccountName(accounts, transfer.fromAccountId),
    "Cuenta destino": getAccountName(accounts, transfer.toAccountId),
    "Monto enviado": transfer.fromAmount,
    "Moneda enviada": transfer.fromCurrency,
    "Monto recibido": transfer.toAmount,
    "Moneda recibida": transfer.toCurrency,
    Comisión: transfer.feeAmount,
    "Moneda comisión": transfer.feeCurrency,
    "Tipo de cambio": transfer.exchangeRate,
    Estado: transfer.status,
    Nota: transfer.note ?? "",
    "Fecha creación": formatDate(transfer.createdAt),
    "Fecha actualización": formatDate(transfer.updatedAt),
  }));
}

function buildSummaryRows(params: {
  accounts: Account[];
  movements: Movement[];
  transfers: Transfer[];
}): ExcelRow[] {
  const { accounts, movements, transfers } = params;

  const activeAccounts = accounts.filter(
    (account) => account.status === "active",
  );

  const confirmedMovements = movements.filter(
    (movement) => movement.status === "confirmed",
  );

  const totalIncomeByCurrency = confirmedMovements
    .filter((movement) => movement.kind === "income")
    .reduce<Record<string, number>>((result, movement) => {
      result[movement.currency] =
        (result[movement.currency] ?? 0) + movement.amount;

      return result;
    }, {});

  const totalExpenseByCurrency = confirmedMovements
    .filter((movement) => movement.kind === "expense")
    .reduce<Record<string, number>>((result, movement) => {
      result[movement.currency] =
        (result[movement.currency] ?? 0) + movement.amount;

      return result;
    }, {});

  const balanceRows = Object.keys({
    ...totalIncomeByCurrency,
    ...totalExpenseByCurrency,
  }).map((currency) => {
    const income = totalIncomeByCurrency[currency] ?? 0;
    const expense = totalExpenseByCurrency[currency] ?? 0;

    return {
      Métrica: `Balance movimientos ${currency}`,
      Valor: income - expense,
      Detalle: `Ingresos: ${income} / Egresos: ${expense}`,
    };
  });

  return [
    {
      Métrica: "Fecha de exportación",
      Valor: formatDate(new Date().toISOString()),
      Detalle: "Archivo generado desde Orvian",
    },
    {
      Métrica: "Cuentas activas",
      Valor: activeAccounts.length,
      Detalle: "Total de cuentas visibles en la app",
    },
    {
      Métrica: "Movimientos exportados",
      Valor: movements.length,
      Detalle: "Ingresos y egresos incluidos",
    },
    {
      Métrica: "Transferencias exportadas",
      Valor: transfers.length,
      Detalle: "Transferencias incluidas",
    },
    ...balanceRows,
  ];
}

function getCellAddress(columnIndex: number, rowIndex: number) {
  return XLSX.utils.encode_cell({
    c: columnIndex,
    r: rowIndex,
  });
}

function getSheetRange(worksheet: XLSX.WorkSheet) {
  if (!worksheet["!ref"]) {
    return undefined;
  }

  return XLSX.utils.decode_range(worksheet["!ref"]);
}

function autosizeColumns(rows: ExcelRow[]) {
  if (rows.length === 0) {
    return [{ wch: 24 }];
  }

  const headers = Object.keys(rows[0]);

  return headers.map((header) => {
    const maxLength = rows.reduce((max, row) => {
      const value = row[header];
      const valueLength =
        value === null || value === undefined ? 0 : String(value).length;

      return Math.max(max, valueLength);
    }, header.length);

    return {
      wch: Math.min(Math.max(maxLength + 3, 14), 46),
    };
  });
}

function applyTableStyles(worksheet: XLSX.WorkSheet, rows: ExcelRow[]) {
  const range = getSheetRange(worksheet);

  if (!range) {
    return;
  }

  for (let rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex += 1) {
    for (
      let columnIndex = range.s.c;
      columnIndex <= range.e.c;
      columnIndex += 1
    ) {
      const address = getCellAddress(columnIndex, rowIndex);
      const cell = worksheet[address];

      if (!cell) {
        continue;
      }

      cell.s = rowIndex === 0 ? headerStyle : bodyStyle;

      const headerAddress = getCellAddress(columnIndex, 0);
      const header = worksheet[headerAddress]?.v;

      if (
        typeof header === "string" &&
        [
          "Monto",
          "Saldo principal",
          "Saldo después",
          "Monto enviado",
          "Monto recibido",
          "Comisión",
          "Tipo de cambio",
          "Valor",
        ].includes(header)
      ) {
        cell.s = rowIndex === 0 ? headerStyle : moneyStyle;
      }

      if (typeof header === "string" && header.includes("%")) {
        cell.s = rowIndex === 0 ? headerStyle : percentageStyle;
      }
    }
  }
}

function appendStyledJsonSheet(
  workbook: XLSX.WorkBook,
  sheetName: string,
  rows: ExcelRow[],
) {
  const safeRows = rows.length > 0 ? rows : [{ Información: "Sin datos" }];
  const worksheet = XLSX.utils.json_to_sheet(safeRows);

  worksheet["!cols"] = autosizeColumns(safeRows);
  worksheet["!freeze"] = { xSplit: 0, ySplit: 1 };

  applyTableStyles(worksheet, safeRows);

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
}

function buildStyledSummarySheet(rows: ExcelRow[]) {
  const worksheet = XLSX.utils.aoa_to_sheet([
    ["Orvian · Reporte financiero", "", ""],
    ["Resumen general", "", ""],
    [],
    ["Métrica", "Valor", "Detalle"],
    ...rows.map((row) => [row.Métrica, row.Valor, row.Detalle]),
  ]);

  worksheet["!merges"] = [
    {
      s: { r: 0, c: 0 },
      e: { r: 0, c: 2 },
    },
    {
      s: { r: 1, c: 0 },
      e: { r: 1, c: 2 },
    },
  ];

  worksheet["!cols"] = [{ wch: 32 }, { wch: 24 }, { wch: 52 }];
  worksheet["!rows"] = [{ hpt: 30 }, { hpt: 24 }];

  worksheet["A1"].s = titleStyle;
  worksheet["A2"].s = subtitleStyle;

  const range = getSheetRange(worksheet);

  if (range) {
    for (let rowIndex = 3; rowIndex <= range.e.r; rowIndex += 1) {
      for (let columnIndex = 0; columnIndex <= 2; columnIndex += 1) {
        const address = getCellAddress(columnIndex, rowIndex);
        const cell = worksheet[address];

        if (!cell) {
          continue;
        }

        cell.s = rowIndex === 3 ? headerStyle : bodyStyle;

        if (columnIndex === 1 && rowIndex > 3 && typeof cell.v === "number") {
          cell.s = moneyStyle;
        }
      }
    }
  }

  return worksheet;
}

export function buildFinancialExcelBase64(params: {
  accounts: Account[];
  movements: Movement[];
  transfers: Transfer[];
}) {
  const { accounts, movements, transfers } = params;

  const workbook = XLSX.utils.book_new();

  const summaryRows = buildSummaryRows({
    accounts,
    movements,
    transfers,
  });

  XLSX.utils.book_append_sheet(
    workbook,
    buildStyledSummarySheet(summaryRows),
    "Resumen",
  );

  appendStyledJsonSheet(workbook, "Cuentas", buildAccountsRows(accounts));
  appendStyledJsonSheet(
    workbook,
    "Movimientos",
    buildMovementsRows(accounts, movements),
  );
  appendStyledJsonSheet(
    workbook,
    "Transferencias",
    buildTransfersRows(accounts, transfers),
  );

  return XLSX.write(workbook, {
    bookType: "xlsx",
    type: "base64",
  }) as string;
}

export async function exportFinancialExcel(params: {
  accounts: Account[];
  movements: Movement[];
  transfers: Transfer[];
  filePrefix?: string;
}) {
  const {
    accounts,
    movements,
    transfers,
    filePrefix = "orvian_export",
  } = params;

  const base64Content = buildFinancialExcelBase64({
    accounts,
    movements,
    transfers,
  });

  const today = new Date().toISOString().slice(0, 10);

  return saveAndShareBase64File({
    fileName: `${filePrefix}_${today}.xlsx`,
    base64Content,
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    dialogTitle: "Exportar Excel de Orvian",
    UTI: "org.openxmlformats.spreadsheetml.sheet",
  });
}
