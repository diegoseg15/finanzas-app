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

export function getLastMonthPeriods(monthCount = 6) {
  const now = new Date();

  return Array.from({ length: monthCount })
    .map((_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - index, 1);

      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        key: getMonthKey(date.getFullYear(), date.getMonth() + 1),
        label: getMonthLabel(date.getFullYear(), date.getMonth() + 1),
      };
    })
    .reverse();
}

export function buildMonthlyIncomeExpenseData(params: {
  movements: Movement[];
  currency: CurrencyCode;
  monthCount?: number;
}): MonthlyChartPoint[] {
  const { movements, currency, monthCount = 6 } = params;

  const periods = getLastMonthPeriods(monthCount);

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

  let accumulatedBalance = 0;

  return monthlyData.map((item) => {
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
