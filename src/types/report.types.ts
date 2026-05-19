import { CurrencyCode, MovementKind } from "@/types/finance.types";

export type ReportPeriodPreset =
  | "current_month"
  | "last_month"
  | "last_3_months"
  | "current_year"
  | "custom";

export type ReportFilters = {
  periodPreset: ReportPeriodPreset;
  startDate?: string;
  endDate?: string;
  accountId?: string;
  movementKind?: MovementKind | "all";
  categoryId?: string;
  currency?: CurrencyCode | "all";
};

export type ReportSummary = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transferCount: number;
  transferFees: number;
  movementCount: number;
  currency: CurrencyCode;
};

export type CategoryReportItem = {
  categoryId: string;
  amount: number;
  percentage: number;
};

export type AccountReportItem = {
  accountId: string;
  income: number;
  expense: number;
  balance: number;
};

export type ReportResult<TMovement, TTransfer> = {
  filters: ReportFilters;
  movements: TMovement[];
  transfers: TTransfer[];
  summary: ReportSummary;
  expensesByCategory: CategoryReportItem[];
  accountsSummary: AccountReportItem[];
};
