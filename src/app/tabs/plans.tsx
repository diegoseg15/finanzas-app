import { StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { PremiumBadge } from "@/components/ui/PremiumBadge";
import { subscriptionPlans } from "@/constants/subscriptionPlans";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";

export default function PlansScreen() {
  const subscription = useSubscriptionStore((state) => state.subscription);
  const setPlan = useSubscriptionStore((state) => state.setPlan);

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <AppText variant="title" i18nKey="plans.title" />

        <AppText variant="muted" i18nKey="plans.demoDescription" />
      </View>

      <View style={styles.list}>
        {subscriptionPlans.map((plan) => {
          const isCurrentPlan = subscription.planId === plan.id;
          const isPlus = plan.id === "plus";

          return (
            <AppCard key={plan.id} style={styles.planCard}>
              <View style={styles.planHeader}>
                <View style={styles.planTitle}>
                  <AppText
                    variant="subtitle"
                    i18nKey={
                      isPlus ? "plans.plusPlan.name" : "plans.freePlan.name"
                    }
                  />

                  {isPlus ? <PremiumBadge /> : null}
                </View>

                {isCurrentPlan ? (
                  <AppText variant="caption" i18nKey="plans.currentPlan" />
                ) : null}
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

              {plan.yearlyPrice > 0 ? (
                <AppText
                  variant="muted"
                  i18nKey="plans.yearlyAvailable"
                  i18nValues={{ price: plan.yearlyPrice }}
                />
              ) : null}

              <View style={styles.features}>
                {plan.features.map((feature, index) => (
                  <AppText key={`${plan.id}-${feature}`} variant="muted">
                    •{" "}
                    <AppText
                      variant="muted"
                      i18nKey={
                        isPlus
                          ? getPlusFeatureKey(index)
                          : getFreeFeatureKey(index)
                      }
                    />
                  </AppText>
                ))}
              </View>

              {isPlus ? (
                <AppButton
                  onPress={() => setPlan("plus")}
                  disabled={isCurrentPlan}
                  i18nKey={
                    isCurrentPlan
                      ? "plans.plusActive"
                      : "plans.activatePlusDemo"
                  }
                />
              ) : (
                <AppButton
                  variant="secondary"
                  onPress={() => setPlan("free")}
                  disabled={isCurrentPlan}
                  i18nKey={
                    isCurrentPlan ? "plans.freeActive" : "plans.backToFree"
                  }
                />
              )}
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
    "plans.plusPlan.features.reminders",
    "plans.plusPlan.features.exportData",
    "plans.plusPlan.features.priorityFeatures",
  ];

  return keys[index] ?? "plans.plusPlan.features.priorityFeatures";
}

const styles = StyleSheet.create({
  container: {
    gap: 22,
  },

  header: {
    gap: 8,
  },

  list: {
    gap: 16,
  },

  planCard: {
    gap: 16,
  },

  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  planTitle: {
    flex: 1,
    gap: 8,
  },

  features: {
    gap: 6,
  },
});
