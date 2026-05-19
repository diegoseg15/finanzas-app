import * as XLSX from "xlsx";

import { getAccountTypeOption } from "@/constants/accountTypes";
import { getCategoryById } from "@/constants/categories";
import { saveAndShareBinaryFile } from "@/services/file-export.service";
import { Account, Movement, Transfer } from "@/types/finance.types";

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

function getAccountName(accounts: Account[], accountId: string) {
  return (
    accounts.find((account) => account.id === accountId)?.name ??
    "Cuenta no encontrada"
  );
}

function buildAccountsRows(accounts: Account[]) {
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

function buildMovementsRows(accounts: Account[], movements: Movement[]) {
  return movements.map((movement) => ({
    ID: movement.id,
    Fecha: formatDate(movement.date),
    Tipo: movement.kind === "income" ? "Ingreso" : "Egreso",
    Cuenta: getAccountName(accounts, movement.accountId),
    Categoría: getCategoryById(movement.categoryId)?.name ?? "Sin categoría",
    Monto: movement.amount,
    Moneda: movement.currency,
    Estado: movement.status,
    Nota: movement.note ?? "",
    "Fecha creación": formatDate(movement.createdAt),
    "Fecha actualización": formatDate(movement.updatedAt),
  }));
}

function buildTransfersRows(accounts: Account[], transfers: Transfer[]) {
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
}) {
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

function autosizeColumns(rows: Record<string, unknown>[]) {
  if (rows.length === 0) {
    return [];
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
      wch: Math.min(Math.max(maxLength + 2, 12), 42),
    };
  });
}

function appendJsonSheet(
  workbook: XLSX.WorkBook,
  sheetName: string,
  rows: Record<string, unknown>[],
) {
  const safeRows = rows.length > 0 ? rows : [{ Información: "Sin datos" }];
  const worksheet = XLSX.utils.json_to_sheet(safeRows);

  worksheet["!cols"] = autosizeColumns(safeRows);

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
}

export function buildFinancialExcel(params: {
  accounts: Account[];
  movements: Movement[];
  transfers: Transfer[];
}) {
  const { accounts, movements, transfers } = params;

  const workbook = XLSX.utils.book_new();

  appendJsonSheet(
    workbook,
    "Resumen",
    buildSummaryRows({
      accounts,
      movements,
      transfers,
    }),
  );

  appendJsonSheet(workbook, "Cuentas", buildAccountsRows(accounts));
  appendJsonSheet(
    workbook,
    "Movimientos",
    buildMovementsRows(accounts, movements),
  );
  appendJsonSheet(
    workbook,
    "Transferencias",
    buildTransfersRows(accounts, transfers),
  );

  return XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  }) as Uint8Array;
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

  const bytes = buildFinancialExcel({
    accounts,
    movements,
    transfers,
  });

  const today = new Date().toISOString().slice(0, 10);

  return saveAndShareBinaryFile({
    fileName: `${filePrefix}_${today}.xlsx`,
    bytes,
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    dialogTitle: "Exportar Excel de Orvian",
  });
}
