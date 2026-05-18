import { CurrencyCode } from "@/types/finance.types";

export type UserProfileType =
  | "personal"
  | "freelancer"
  | "entrepreneur"
  | "investor"
  | "student";

export type FinancialGoal =
  | "control_expenses"
  | "save_more"
  | "pay_debts"
  | "track_income"
  | "understand_investments"
  | "avoid_small_expenses";

export type CryptoUsage = "none" | "basic" | "advanced";

export type MultiCurrencyUsage = "none" | "occasional" | "frequent";

export type OnboardingSettings = {
  hasCompletedOnboarding: boolean;
  mainCurrency: CurrencyCode;
  shouldCalculateTotalNetWorth: boolean;
  userProfileType: UserProfileType;
  cryptoUsage: CryptoUsage;
  multiCurrencyUsage: MultiCurrencyUsage;
  financialGoal: FinancialGoal;
  wantsReminders: boolean;
};
