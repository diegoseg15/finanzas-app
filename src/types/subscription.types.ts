export type SubscriptionPlanId = "free" | "plus";

export type SubscriptionStatus = "active" | "inactive" | "expired";

export type SubscriptionSource =
  | "free"
  | "legacy_tester"
  | "google_play"
  | "promo";

export type SubscriptionPlan = {
  id: SubscriptionPlanId;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  limits: {
    maxAccounts: number | null;
    maxMovementsPerMonth: number | null;
    multiCurrencyTransfers: boolean;
    advancedStatistics: boolean;
    exportData: boolean;
    customCategories: boolean;
    unlimitedReminders: boolean;
  };
};

export type UserSubscription = {
  planId: SubscriptionPlanId;
  status: SubscriptionStatus;
  source?: SubscriptionSource;
  startedAt?: string;
  expiresAt?: string;

  legacyTesterSince?: string;
  legacyDiscountEligible?: boolean;
  legacyPlusUntil?: string;
};
