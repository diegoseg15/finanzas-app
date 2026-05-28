import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { PremiumBadge } from "@/components/ui/PremiumBadge";
import { routes } from "@/constants/routes";
import { subscriptionPlans } from "@/constants/subscriptionPlans";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { SubscriptionPlanId } from "@/types/subscription.types";

export default function OnboardingPlansScreen() {
  const setPlan = useSubscriptionStore((state) => state.setPlan);
  const subscription = useSubscriptionStore((state) => state.subscription);
  const completeOnboarding = useAppSettingsStore(
    (state) => state.completeOnboarding,
  );

  const handleSelectPlan = (planId: SubscriptionPlanId) => {
    setPlan(planId);
    completeOnboarding();
    router.replace(routes.tabs.home as never);
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <AppText variant="title" i18nKey="onboarding.plans.title" />

        <AppText variant="muted" i18nKey="onboarding.plans.description" />
      </View>

      <View style={styles.plans}>
        {subscriptionPlans.map((plan) => {
          const isSelected = subscription.planId === plan.id;
          const isPlus = plan.id === "plus";

          return (
            <AppCard key={plan.id} style={styles.planCard}>
              <View style={styles.planHeader}>
                <AppText
                  variant="subtitle"
                  i18nKey={
                    isPlus ? "plans.plusPlan.name" : "plans.freePlan.name"
                  }
                />

                {isPlus ? <PremiumBadge /> : null}
              </View>

              <AppText
                variant="muted"
                i18nKey={
                  isPlus
                    ? "plans.plusPlan.description"
                    : "plans.freePlan.description"
                }
              />

              <View>
                <AppText variant="title">
                  {plan.monthlyPrice === 0 ? "$0" : `$${plan.monthlyPrice}`}
                </AppText>

                <AppText
                  variant="caption"
                  i18nKey={
                    plan.monthlyPrice === 0
                      ? "plans.freePlan.period"
                      : "plans.monthlyPeriod"
                  }
                />
              </View>

              <View style={styles.features}>
                {plan.features.slice(0, 4).map((feature, index) => (
                  <View key={`${plan.id}-${feature}`}>
                    <AppText
                      variant="muted"
                      i18nKey={
                        isPlus
                          ? getPlusFeatureKey(index)
                          : getFreeFeatureKey(index)
                      }
                    />
                  </View>
                ))}
              </View>

              <AppButton
                variant={isPlus ? "primary" : "secondary"}
                onPress={() => handleSelectPlan(plan.id)}
                i18nKey={
                  plan.id === "free"
                    ? "plans.freePlan.cta"
                    : isSelected
                      ? "onboarding.plans.continueWithPlus"
                      : "plans.activatePlusDemo"
                }
              />
            </AppCard>
          );
        })}
      </View>
    </Screen>
  );
}

function getFreeFeatureKey(index: number) {
  const keys = [
    "plans.freePlan.features.accountsLimit",
    "plans.freePlan.features.movementsLimit",
    "plans.freePlan.features.basicStatistics",
    "plans.freePlan.features.localData",
  ];

  return keys[index] ?? "plans.freePlan.features.localData";
}

function getPlusFeatureKey(index: number) {
  const keys = [
    "plans.plusPlan.features.unlimitedAccounts",
    "plans.plusPlan.features.unlimitedMovements",
    "plans.plusPlan.features.advancedStatistics",
    "plans.plusPlan.features.budgets",
  ];

  return keys[index] ?? "plans.plusPlan.features.budgets";
}

const styles = StyleSheet.create({
  container: {
    gap: 28,
  },

  header: {
    gap: 12,
  },

  plans: {
    gap: 14,
    flex: 1,
  },

  planCard: {
    gap: 14,
  },

  planHeader: {
    gap: 8,
  },

  features: {
    gap: 6,
  },
});
