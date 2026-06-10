import {
  defaultSubscriptionPlanId,
  getSubscriptionPlanById,
} from "@/constants/subscriptionPlans";
import { Movement } from "@/types/finance.types";
import {
  ProductEntitlement,
  SubscriptionPlanId,
  UserSubscription,
} from "@/types/subscription.types";

const LEGACY_PLUS_UNTIL = "2026-10-01T04:59:59.999Z";

export function createDefaultSubscription(): UserSubscription {
  return {
    planId: defaultSubscriptionPlanId,
    status: "active",
    source: "free",
    startedAt: new Date().toISOString(),
    purchases: [],
  };
}

export function isPlusPlan(subscription: UserSubscription) {
  return subscription.planId === "plus" && subscription.status === "active";
}

export function isLegacyTester(subscription: UserSubscription) {
  return Boolean(subscription.legacyTesterSince);
}

export function getLegacyPlusUntil(legacyTesterSince?: string) {
  if (!legacyTesterSince) {
    return undefined;
  }

  return LEGACY_PLUS_UNTIL;
}

export function hasActiveLegacyPlus(subscription: UserSubscription) {
  const legacyPlusUntil =
    getLegacyPlusUntil(subscription.legacyTesterSince) ??
    subscription.legacyPlusUntil;

  if (!legacyPlusUntil) {
    return false;
  }

  return new Date(legacyPlusUntil).getTime() > Date.now();
}

export function hasPurchasedEntitlement(
  subscription: UserSubscription,
  entitlement: ProductEntitlement,
) {
  return Boolean(
    subscription.purchases?.some((purchase) => {
      if (purchase.productId !== entitlement) {
        return false;
      }

      if (!purchase.expiresAt) {
        return true;
      }

      return new Date(purchase.expiresAt).getTime() > Date.now();
    }),
  );
}

export function hasPlusAccess(subscription: UserSubscription) {
  return (
    isPlusPlan(subscription) ||
    hasActiveLegacyPlus(subscription) ||
    hasPurchasedEntitlement(subscription, "plus_lifetime")
  );
}

export function getCurrentPlan(subscription: UserSubscription) {
  if (hasPlusAccess(subscription)) {
    return (
      getSubscriptionPlanById("plus") ??
      getSubscriptionPlanById(defaultSubscriptionPlanId)
    );
  }

  return (
    getSubscriptionPlanById(subscription.planId) ??
    getSubscriptionPlanById(defaultSubscriptionPlanId)
  );
}

export function canCreateAccount(
  subscription: UserSubscription,
  currentAccountsCount: number,
) {
  const plan = getCurrentPlan(subscription);

  if (!plan?.limits.maxAccounts) {
    return true;
  }

  return currentAccountsCount < plan.limits.maxAccounts;
}

export function getRemainingFreeAccounts(
  subscription: UserSubscription,
  currentAccountsCount: number,
) {
  const plan = getCurrentPlan(subscription);

  if (!plan?.limits.maxAccounts) {
    return null;
  }

  return Math.max(plan.limits.maxAccounts - currentAccountsCount, 0);
}

export function getCurrentMonthMovements(movements: Movement[]) {
  const now = new Date();

  return movements.filter((movement) => {
    const movementDate = new Date(movement.date);

    return (
      movementDate.getMonth() === now.getMonth() &&
      movementDate.getFullYear() === now.getFullYear()
    );
  });
}

export function canCreateMovement(
  subscription: UserSubscription,
  movements: Movement[],
) {
  const plan = getCurrentPlan(subscription);

  if (!plan?.limits.maxMovementsPerMonth) {
    return true;
  }

  return (
    getCurrentMonthMovements(movements).length <
    plan.limits.maxMovementsPerMonth
  );
}

export function getRemainingFreeMovements(
  subscription: UserSubscription,
  movements: Movement[],
) {
  const plan = getCurrentPlan(subscription);

  if (!plan?.limits.maxMovementsPerMonth) {
    return null;
  }

  return Math.max(
    plan.limits.maxMovementsPerMonth -
      getCurrentMonthMovements(movements).length,
    0,
  );
}

export function canUseMultiCurrencyTransfers(subscription: UserSubscription) {
  const plan = getCurrentPlan(subscription);

  return Boolean(plan?.limits.multiCurrencyTransfers);
}

export function canUseUnlimitedReminders(subscription: UserSubscription) {
  const plan = getCurrentPlan(subscription);

  return Boolean(plan?.limits.unlimitedReminders);
}

export function canUseCustomCategories(subscription: UserSubscription) {
  const plan = getCurrentPlan(subscription);

  return Boolean(plan?.limits.customCategories);
}

export function canUseAdvancedStatistics(subscription: UserSubscription) {
  const plan = getCurrentPlan(subscription);

  return Boolean(plan?.limits.advancedStatistics);
}

export function canExportData(subscription: UserSubscription) {
  const plan = getCurrentPlan(subscription);

  return Boolean(plan?.limits.exportData);
}

export function upgradeToPlan(planId: SubscriptionPlanId): UserSubscription {
  return {
    planId,
    status: "active",
    source: "promo",
    startedAt: new Date().toISOString(),
    purchases: [],
  };
}

export function markAsLegacyTester(
  subscription: UserSubscription,
): UserSubscription {
  return {
    ...subscription,
    legacyPlusUntil: LEGACY_PLUS_UNTIL,
    source: subscription.source ?? "legacy_tester",
    legacyTesterSince:
      subscription.legacyTesterSince ?? new Date().toISOString(),
    legacyDiscountEligible: true,
  };
}
