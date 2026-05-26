import { CurrencyCode } from "@/types/finance.types";

export type MonthlyChartPoint = {
  key: string;
  label: string;
  income: number;
  expense: number;
  balance: number;
  currency: CurrencyCode;
};

export type CategoryChartPoint = {
  categoryId: string;
  label: string;
  value: number;
  percentage: number;
  color: string;
};

export type BudgetChartPoint = {
  label: string;
  value: number;
  color: string;
};
