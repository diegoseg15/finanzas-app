import { CurrencyCode } from "@/types/finance.types";

export type BudgetPeriod = {
  year: number;
  month: number;
};

export type MonthlyBudget = {
  id: string;
  year: number;
  month: number;
  currency: CurrencyCode;
  generalLimit: number;
  categoryLimits: CategoryBudgetLimit[];
  createdAt: string;
  updatedAt: string;
};

export type CategoryBudgetLimit = {
  categoryId: string;
  limit: number;
};

export type BudgetUsageStatus = "safe" | "warning" | "exceeded";

export type CategoryBudgetUsage = {
  categoryId: string;
  limit: number;
  spent: number;
  remaining: number;
  percentageUsed: number;
  status: BudgetUsageStatus;
};

export type MonthlyBudgetUsage = {
  budget: MonthlyBudget;
  totalSpent: number;
  totalRemaining: number;
  totalPercentageUsed: number;
  totalStatus: BudgetUsageStatus;
  categories: CategoryBudgetUsage[];
};
