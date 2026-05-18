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
        <AppText variant="title">Planes</AppText>
        <AppText variant="muted">
          Empieza gratis y activa funciones avanzadas cuando las necesites.
        </AppText>
      </View>

      <View style={styles.list}>
        {subscriptionPlans.map((plan) => {
          const isCurrentPlan = subscription.planId === plan.id;

          return (
            <AppCard key={plan.id} style={styles.planCard}>
              <View style={styles.planHeader}>
                <View style={styles.planTitle}>
                  <AppText variant="subtitle">{plan.name}</AppText>
                  {plan.id === "plus" ? <PremiumBadge /> : null}
                </View>

                {isCurrentPlan ? (
                  <AppText variant="caption">Plan actual</AppText>
                ) : null}
              </View>

              <AppText variant="muted">{plan.description}</AppText>

              <View>
                <AppText variant="title">
                  {plan.monthlyPrice === 0 ? "$0" : `$${plan.monthlyPrice}`}
                </AppText>
                <AppText variant="caption">por mes</AppText>
              </View>

              {plan.yearlyPrice > 0 ? (
                <AppText variant="muted">
                  También disponible por ${plan.yearlyPrice} al año.
                </AppText>
              ) : null}

              <View style={styles.features}>
                {plan.features.map((feature) => (
                  <AppText key={feature} variant="muted">
                    • {feature}
                  </AppText>
                ))}
              </View>

              {plan.id === "plus" ? (
                <AppButton
                  onPress={() => setPlan("plus")}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? "Plus activo" : "Activar Plus demo"}
                </AppButton>
              ) : (
                <AppButton
                  variant="secondary"
                  onPress={() => setPlan("free")}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? "Gratis activo" : "Volver a gratis"}
                </AppButton>
              )}
            </AppCard>
          );
        })}
      </View>
    </Screen>
  );
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
