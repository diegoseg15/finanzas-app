import { CurrencyCode, MovementKind } from "@/types/finance.types";

export type HomeMonthlySummary = {
  income: number;
  expense: number;
  balance: number;
};

export type HomeActivityItem = {
  id: string;
  type: "movement" | "transfer";
  date: string;
  amount: number;
  currency: CurrencyCode;
  kind: MovementKind | "transfer";
  labelI18nKey?: string;
  fallbackLabel: string;
};
