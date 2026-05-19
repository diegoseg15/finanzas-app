import { defaultCurrencyCode } from "@/constants/currencies";
import {
    getDateRangeFromPreset,
    isDateInsideRange,
} from "@/services/date.service";
import {
    Account,
    CurrencyCode,
    Movement,
    Transfer,
} from "@/types/finance.types";
import {
    AccountReportItem,
    CategoryReportItem,
    ReportFilters,
    ReportResult,
    ReportSummary,
} from "@/types/report.types";

function resolveReportCurrency(filters: ReportFilters): CurrencyCode {
  return filters.currency && filters.currency !== "all"
    ? filters.currency
    : defaultCurrencyCode;
}

export function filterMovementsByReport(
  movements: Movement[],
  filters: ReportFilters,
) {
  const { startDate, endDate } = getDateRangeFromPreset(
    filters.periodPreset,
    filters.startDate,
    filters.endDate,
  );

  return movements.filter((movement) => {
    const matchesDate = isDateInsideRange(movement.date, startDate, endDate);

    const matchesAccount = filters.accountId
      ? movement.accountId === filters.accountId
      : true;

    const matchesKind =
      filters.movementKind && filters.movementKind !== "all"
        ? movement.kind === filters.movementKind
        : true;

    const matchesCategory = filters.categoryId
      ? movement.categoryId === filters.categoryId
      : true;

    const matchesCurrency =
      filters.currency && filters.currency !== "all"
        ? movement.currency === filters.currency
        : true;

    return (
      matchesDate &&
      matchesAccount &&
      matchesKind &&
      matchesCategory &&
      matchesCurrency
    );
  });
}

export function filterTransfersByReport(
  transfers: Transfer[],
  filters: ReportFilters,
) {
  const { startDate, endDate } = getDateRangeFromPreset(
    filters.periodPreset,
    filters.startDate,
    filters.endDate,
  );

  return transfers.filter((transfer) => {
    const matchesDate = isDateInsideRange(transfer.date, startDate, endDate);

    const matchesAccount = filters.accountId
      ? transfer.fromAccountId === filters.accountId ||
        transfer.toAccountId === filters.accountId
      : true;

    const matchesCurrency =
      filters.currency && filters.currency !== "all"
        ? transfer.fromCurrency === filters.currency ||
          transfer.toCurrency === filters.currency ||
          transfer.feeCurrency === filters.currency
        : true;

    return matchesDate && matchesAccount && matchesCurrency;
  });
}

export function getReportSummary(params: {
  movements: Movement[];
  transfers: Transfer[];
  currency: CurrencyCode;
}): ReportSummary {
  const { movements, transfers, currency } = params;

  const movementsInCurrency = movements.filter(
    (movement) => movement.currency === currency,
  );

  const transfersInCurrency = transfers.filter(
    (transfer) =>
      transfer.fromCurrency === currency ||
      transfer.toCurrency === currency ||
      transfer.feeCurrency === currency,
  );

  const totalIncome = movementsInCurrency
    .filter((movement) => movement.kind === "income")
    .reduce((total, movement) => total + movement.amount, 0);

  const totalExpense = movementsInCurrency
    .filter((movement) => movement.kind === "expense")
    .reduce((total, movement) => total + movement.amount, 0);

  const transferFees = transfersInCurrency
    .filter((transfer) => transfer.feeCurrency === currency)
    .reduce((total, transfer) => total + transfer.feeAmount, 0);

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    transferCount: transfersInCurrency.length,
    transferFees,
    movementCount: movementsInCurrency.length,
    currency,
  };
}

export function getExpensesByCategory(
  movements: Movement[],
  currency: CurrencyCode,
): CategoryReportItem[] {
  const expenses = movements.filter(
    (movement) => movement.kind === "expense" && movement.currency === currency,
  );

  const totalExpense = expenses.reduce(
    (total, movement) => total + movement.amount,
    0,
  );

  const grouped = expenses.reduce<Record<string, number>>(
    (result, movement) => {
      result[movement.categoryId] =
        (result[movement.categoryId] ?? 0) + movement.amount;

      return result;
    },
    {},
  );

  return Object.entries(grouped)
    .map(([categoryId, amount]) => ({
      categoryId,
      amount,
      percentage: totalExpense > 0 ? (amount / totalExpense) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function getAccountsSummary(params: {
  accounts: Account[];
  movements: Movement[];
  currency: CurrencyCode;
}): AccountReportItem[] {
  const { accounts, movements, currency } = params;

  return accounts.map((account) => {
    const accountMovements = movements.filter(
      (movement) =>
        movement.accountId === account.id && movement.currency === currency,
    );

    const income = accountMovements
      .filter((movement) => movement.kind === "income")
      .reduce((total, movement) => total + movement.amount, 0);

    const expense = accountMovements
      .filter((movement) => movement.kind === "expense")
      .reduce((total, movement) => total + movement.amount, 0);

    return {
      accountId: account.id,
      income,
      expense,
      balance: income - expense,
    };
  });
}

export function buildReport(params: {
  accounts: Account[];
  movements: Movement[];
  transfers: Transfer[];
  filters: ReportFilters;
}): ReportResult<Movement, Transfer> {
  const { accounts, movements, transfers, filters } = params;

  const currency = resolveReportCurrency(filters);

  const filteredMovements = filterMovementsByReport(movements, filters);
  const filteredTransfers = filterTransfersByReport(transfers, filters);

  return {
    filters,
    movements: filteredMovements,
    transfers: filteredTransfers,
    summary: getReportSummary({
      movements: filteredMovements,
      transfers: filteredTransfers,
      currency,
    }),
    expensesByCategory: getExpensesByCategory(filteredMovements, currency),
    accountsSummary: getAccountsSummary({
      accounts,
      movements: filteredMovements,
      currency,
    }),
  };
}
