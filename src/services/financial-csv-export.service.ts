import { getAccountTypeOption } from "@/constants/accountTypes";
import { getCategoryById } from "@/constants/categories";
import { buildCsvSection, CsvColumn } from "@/services/csv.service";
import { saveAndShareTextFile } from "@/services/file-export.service";
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

const accountColumns: CsvColumn<Account>[] = [
  {
    header: "ID",
    value: (account) => account.id,
  },
  {
    header: "Nombre",
    value: (account) => account.name,
  },
  {
    header: "Tipo",
    value: (account) =>
      getAccountTypeOption(account.type)?.label ?? account.type,
  },
  {
    header: "Moneda principal",
    value: (account) => account.mainCurrency,
  },
  {
    header: "Saldo principal",
    value: (account) => account.balances[0]?.amount ?? 0,
  },
  {
    header: "Incluida en patrimonio",
    value: (account) => (account.includeInTotalBalance ? "Sí" : "No"),
  },
  {
    header: "Estado",
    value: (account) => account.status,
  },
  {
    header: "Creada",
    value: (account) => formatDate(account.createdAt),
  },
];

function getMovementColumns(accounts: Account[]): CsvColumn<Movement>[] {
  return [
    {
      header: "ID",
      value: (movement) => movement.id,
    },
    {
      header: "Fecha",
      value: (movement) => formatDate(movement.date),
    },
    {
      header: "Tipo",
      value: (movement) => (movement.kind === "income" ? "Ingreso" : "Egreso"),
    },
    {
      header: "Cuenta",
      value: (movement) => getAccountName(accounts, movement.accountId),
    },
    {
      header: "Categoría",
      value: (movement) =>
        getCategoryById(movement.categoryId)?.name ?? "Sin categoría",
    },
    {
      header: "Monto",
      value: (movement) => movement.amount,
    },
    {
      header: "Moneda",
      value: (movement) => movement.currency,
    },
    {
      header: "Estado",
      value: (movement) => movement.status,
    },
    {
      header: "Nota",
      value: (movement) => movement.note ?? "",
    },
  ];
}

function getTransferColumns(accounts: Account[]): CsvColumn<Transfer>[] {
  return [
    {
      header: "ID",
      value: (transfer) => transfer.id,
    },
    {
      header: "Fecha",
      value: (transfer) => formatDate(transfer.date),
    },
    {
      header: "Cuenta origen",
      value: (transfer) => getAccountName(accounts, transfer.fromAccountId),
    },
    {
      header: "Cuenta destino",
      value: (transfer) => getAccountName(accounts, transfer.toAccountId),
    },
    {
      header: "Monto enviado",
      value: (transfer) => transfer.fromAmount,
    },
    {
      header: "Moneda enviada",
      value: (transfer) => transfer.fromCurrency,
    },
    {
      header: "Monto recibido",
      value: (transfer) => transfer.toAmount,
    },
    {
      header: "Moneda recibida",
      value: (transfer) => transfer.toCurrency,
    },
    {
      header: "Comisión",
      value: (transfer) => transfer.feeAmount,
    },
    {
      header: "Moneda comisión",
      value: (transfer) => transfer.feeCurrency,
    },
    {
      header: "Tipo de cambio",
      value: (transfer) => transfer.exchangeRate,
    },
    {
      header: "Estado",
      value: (transfer) => transfer.status,
    },
    {
      header: "Nota",
      value: (transfer) => transfer.note ?? "",
    },
  ];
}

export function buildFinancialCsv(params: {
  accounts: Account[];
  movements: Movement[];
  transfers: Transfer[];
}) {
  const { accounts, movements, transfers } = params;

  const activeAccounts = accounts.filter(
    (account) => account.status === "active",
  );

  return [
    buildCsvSection({
      title: "CUENTAS",
      columns: accountColumns,
      rows: activeAccounts,
    }),
    "",
    buildCsvSection({
      title: "MOVIMIENTOS",
      columns: getMovementColumns(accounts),
      rows: movements,
    }),
    "",
    buildCsvSection({
      title: "TRANSFERENCIAS",
      columns: getTransferColumns(accounts),
      rows: transfers,
    }),
  ].join("\n");
}

export async function exportFinancialCsv(params: {
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

  const csv = buildFinancialCsv({
    accounts,
    movements,
    transfers,
  });

  const today = new Date().toISOString().slice(0, 10);

  return saveAndShareTextFile({
    fileName: `${filePrefix}_${today}.csv`,
    content: csv,
    mimeType: "text/csv",
    dialogTitle: "Exportar CSV de Orvian",
  });
}
