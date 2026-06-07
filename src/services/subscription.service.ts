import {
  defaultSubscriptionPlanId,
  getSubscriptionPlanById,
} from "@/constants/subscriptionPlans";
import { Movement } from "@/types/finance.types";
import {
  SubscriptionPlanId,
  UserSubscription,
} from "@/types/subscription.types";

export function createDefaultSubscription(): UserSubscription {
  return {
    planId: defaultSubscriptionPlanId,
    status: "active",
    source: "free",
    startedAt: new Date().toISOString(),
  };
}

export function isPlusPlan(subscription: UserSubscription) {
  return subscription.planId === "plus" && subscription.status === "active";
}

export function getCurrentPlan(subscription: UserSubscription) {
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

export function upgradeToPlan(planId: SubscriptionPlanId): UserSubscription {
  return {
    planId,
    status: "active",
    source: "promo",
    startedAt: new Date().toISOString(),
  };
}

export function markAsLegacyTester(
  subscription: UserSubscription,
): UserSubscription {
  if (subscription.legacyTesterSince) {
    return subscription;
  }

  return {
    ...subscription,
    source: subscription.source ?? "legacy_tester",
    legacyTesterSince: new Date().toISOString(),
    legacyDiscountEligible: true,
  };
}
