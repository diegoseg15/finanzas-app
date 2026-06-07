export type SubscriptionPlanId = "free" | "plus";

export type SubscriptionStatus = "active" | "inactive" | "expired";

export type SubscriptionSource =
  | "free"
  | "legacy_tester"
  | "google_play"
  | "promo";

export type ProductEntitlement =
  | "plus_lifetime"
  | "card_pack_dark"
  | "card_pack_luxury"
  | "card_pack_crypto"
  | "card_pack_minimal";

export type UserPurchaseSource = "google_play" | "promo" | "legacy_tester";

export type UserPurchase = {
  productId: ProductEntitlement;
  source: UserPurchaseSource;
  purchasedAt: string;
  expiresAt?: string;
  purchaseToken?: string;
};

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

  purchases?: UserPurchase[];
};
