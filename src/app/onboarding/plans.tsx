import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { routes } from "@/constants/routes";

export default function PlansScreen() {
  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <AppText variant="title">Elige cómo quieres empezar</AppText>
        <AppText variant="muted">
          Puedes usar la app gratis y activar funciones avanzadas más adelante.
        </AppText>
      </View>

      <View style={styles.plans}>
        <AppCard style={styles.planCard}>
          <AppText variant="subtitle">Gratis</AppText>
          <AppText variant="muted">
            Para registrar ingresos, egresos y cuentas básicas.
          </AppText>
          <AppText variant="body">$0 / mes</AppText>
        </AppCard>

        <AppCard style={styles.planCard}>
          <AppText variant="subtitle">Plus</AppText>
          <AppText variant="muted">
            Para múltiples cuentas, monedas, reportes y control avanzado.
          </AppText>
          <AppText variant="body">$2.99 / mes</AppText>
        </AppCard>
      </View>

      <View style={styles.actions}>
        <AppButton onPress={() => router.replace(routes.tabs.home)}>
          Continuar gratis
        </AppButton>

        <AppButton
          variant="secondary"
          onPress={() => router.replace(routes.tabs.home)}
        >
          Ver Plus luego
        </AppButton>
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
    gap: 12,
  },

  actions: {
    gap: 12,
  },
});
