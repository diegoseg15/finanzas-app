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
        <AppText variant="title">Elige cómo quieres empezar</AppText>

        <AppText variant="muted">
          Puedes usar la app gratis y activar funciones avanzadas más adelante.
        </AppText>
      </View>

      <View style={styles.plans}>
        {subscriptionPlans.map((plan) => {
          const isSelected = subscription.planId === plan.id;

          return (
            <AppCard key={plan.id} style={styles.planCard}>
              <View style={styles.planHeader}>
                <AppText variant="subtitle">{plan.name}</AppText>
                {plan.id === "plus" ? <PremiumBadge /> : null}
              </View>

              <AppText variant="muted">{plan.description}</AppText>

              <View>
                <AppText variant="title">
                  {plan.monthlyPrice === 0 ? "$0" : `$${plan.monthlyPrice}`}
                </AppText>
                <AppText variant="caption">por mes</AppText>
              </View>

              <View style={styles.features}>
                {plan.features.slice(0, 4).map((feature) => (
                  <AppText key={feature} variant="muted">
                    • {feature}
                  </AppText>
                ))}
              </View>

              <AppButton
                variant={plan.id === "plus" ? "primary" : "secondary"}
                onPress={() => handleSelectPlan(plan.id)}
              >
                {plan.id === "free"
                  ? "Continuar gratis"
                  : isSelected
                    ? "Continuar con Plus"
                    : "Activar Plus demo"}
              </AppButton>
            </AppCard>
          );
        })}
      </View>
    </Screen>
  );
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
