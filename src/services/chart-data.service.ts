import * as Localization from "expo-localization";

import { getCategoryById } from "@/constants/categories";
import { CategoryChartPoint, MonthlyChartPoint } from "@/types/chart.types";
import { CurrencyCode, Movement } from "@/types/finance.types";

function getMonthKey(year: number, month: number) {
  return `${year}-${String(month).padStart(2, "0")}`;
}

function getDeviceLocale() {
  return Localization.getLocales()[0]?.languageTag ?? "en-US";
}

function normalizeMonthLabel(label: string) {
  return label.replace(".", "").slice(0, 3);
}

function getMonthLabel(year: number, month: number) {
  const date = new Date(year, month - 1, 1);

  const label = date.toLocaleDateString(getDeviceLocale(), {
    month: "short",
  });

  return normalizeMonthLabel(label);
}

function getMonthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function getMonthDifference(startDate: Date, endDate: Date) {
  return (
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    endDate.getMonth() -
    startDate.getMonth()
  );
}

function getConfirmedMovementsByCurrency(
  movements: Movement[],
  currency: CurrencyCode,
) {
  return movements.filter(
    (movement) =>
      movement.status === "confirmed" && movement.currency === currency,
  );
}

function getFirstMovementMonth(
  movements: Movement[],
  currency: CurrencyCode,
): Date | null {
  const validMovements = getConfirmedMovementsByCurrency(movements, currency);

  if (validMovements.length === 0) {
    return null;
  }

  const firstMovement = validMovements.reduce((oldest, current) => {
    return new Date(current.date).getTime() < new Date(oldest.date).getTime()
      ? current
      : oldest;
  });

  return getMonthStart(new Date(firstMovement.date));
}

export function getChartMonthPeriods(params: {
  movements: Movement[];
  currency: CurrencyCode;
  monthCount?: number;
}) {
  const { movements, currency, monthCount = 6 } = params;

  const now = getMonthStart(new Date());
  const firstMovementMonth = getFirstMovementMonth(movements, currency);

  if (!firstMovementMonth) {
    return Array.from({ length: monthCount })
      .map((_, index) => {
        const date = addMonths(now, -index);

        return {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          key: getMonthKey(date.getFullYear(), date.getMonth() + 1),
          label: getMonthLabel(date.getFullYear(), date.getMonth() + 1),
        };
      })
      .reverse();
  }

  const oldestAllowedMonth = addMonths(now, -(monthCount - 1));

  const startMonth =
    firstMovementMonth.getTime() > oldestAllowedMonth.getTime()
      ? firstMovementMonth
      : oldestAllowedMonth;

  const totalMonths = getMonthDifference(startMonth, now) + 1;

  return Array.from({ length: totalMonths }).map((_, index) => {
    const date = addMonths(startMonth, index);

    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      key: getMonthKey(date.getFullYear(), date.getMonth() + 1),
      label: getMonthLabel(date.getFullYear(), date.getMonth() + 1),
    };
  });
}

export function buildMonthlyIncomeExpenseData(params: {
  movements: Movement[];
  currency: CurrencyCode;
  monthCount?: number;
}): MonthlyChartPoint[] {
  const { movements, currency, monthCount = 6 } = params;

  const periods = getChartMonthPeriods({
    movements,
    currency,
    monthCount,
  });

  return periods.map((period) => {
    const periodMovements = movements.filter((movement) => {
      const date = new Date(movement.date);

      return (
        movement.status === "confirmed" &&
        movement.currency === currency &&
        date.getFullYear() === period.year &&
        date.getMonth() + 1 === period.month
      );
    });

    const income = periodMovements
      .filter((movement) => movement.kind === "income")
      .reduce((total, movement) => total + movement.amount, 0);

    const expense = periodMovements
      .filter((movement) => movement.kind === "expense")
      .reduce((total, movement) => total + movement.amount, 0);

    return {
      key: period.key,
      label: period.label,
      year: period.year,
      month: period.month,
      income,
      expense,
      balance: income - expense,
      currency,
    };
  });
}

export function buildBalanceEvolutionData(params: {
  movements: Movement[];
  currency: CurrencyCode;
  monthCount?: number;
}): MonthlyChartPoint[] {
  const monthlyData = buildMonthlyIncomeExpenseData(params);

  if (monthlyData.length === 0) {
    return monthlyData;
  }

  const firstItem = monthlyData[0];

  const firstDate = new Date(firstItem.year, firstItem.month - 1, 1);
  const previousDate = addMonths(firstDate, -1);

  const shouldAddBaseline = monthlyData.length < 3;

  const dataWithBaseline = shouldAddBaseline
    ? [
        {
          key: getMonthKey(
            previousDate.getFullYear(),
            previousDate.getMonth() + 1,
          ),
          label: getMonthLabel(
            previousDate.getFullYear(),
            previousDate.getMonth() + 1,
          ),
          year: previousDate.getFullYear(),
          month: previousDate.getMonth() + 1,
          income: 0,
          expense: 0,
          balance: 0,
          currency: firstItem.currency,
        },
        ...monthlyData,
      ]
    : monthlyData;

  let accumulatedBalance = 0;

  return dataWithBaseline.map((item) => {
    accumulatedBalance += item.balance;

    return {
      ...item,
      balance: accumulatedBalance,
    };
  });
}

export function buildTopExpenseCategoriesData(params: {
  movements: Movement[];
  currency: CurrencyCode;
  limit?: number;
}): CategoryChartPoint[] {
  const { movements, currency, limit = 5 } = params;

  const expenses = movements.filter(
    (movement) =>
      movement.status === "confirmed" &&
      movement.kind === "expense" &&
      movement.currency === currency,
  );

  const totalExpense = expenses.reduce(
    (total, movement) => total + movement.amount,
    0,
  );

  const groupedExpenses = expenses.reduce<Record<string, number>>(
    (result, movement) => {
      result[movement.categoryId] =
        (result[movement.categoryId] ?? 0) + movement.amount;

      return result;
    },
    {},
  );

  return Object.entries(groupedExpenses)
    .map(([categoryId, value]) => {
      const category = getCategoryById(categoryId);

      return {
        categoryId,
        label: category?.name ?? "Sin categoría",
        labelI18nKey: category?.labelI18nKey ?? "common.category",
        value,
        percentage: totalExpense > 0 ? (value / totalExpense) * 100 : 0,
        color: category?.color ?? "#9665E0",
      };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}
