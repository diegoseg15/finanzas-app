import { Alert, StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { routes } from "@/constants/routes";
import { getSubscriptionPlanById } from "@/constants/subscriptionPlans";
import { resetLocalData } from "@/services/storage/reset-local-data.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { router } from "expo-router";

export default function SettingsScreen() {
  const themeMode = useAppSettingsStore((state) => state.themeMode);
  const setThemeMode = useAppSettingsStore((state) => state.setThemeMode);
  const subscription = useSubscriptionStore((state) => state.subscription);
  const currentPlan = getSubscriptionPlanById(subscription.planId);
  const handleResetLocalData = () => {
    Alert.alert(
      "Borrar datos locales",
      "Esto eliminará cuentas, movimientos, transferencias, recordatorios y configuración guardada en este dispositivo.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Borrar",
          style: "destructive",
          onPress: async () => {
            await resetLocalData();
          },
        },
      ],
    );
  };

  return (
    <Screen style={styles.container}>
      <AppText variant="title">Ajustes</AppText>

      <AppCard style={styles.card}>
        <AppText variant="subtitle">Apariencia</AppText>
        <AppText variant="muted">Tema actual: {themeMode}</AppText>

        <View style={styles.actions}>
          <AppButton variant="secondary" onPress={() => setThemeMode("system")}>
            Sistema
          </AppButton>

          <AppButton variant="secondary" onPress={() => setThemeMode("dark")}>
            Oscuro
          </AppButton>

          <AppButton variant="secondary" onPress={() => setThemeMode("light")}>
            Claro
          </AppButton>
        </View>
      </AppCard>

      <AppCard style={styles.card}>
        <AppText variant="subtitle">Plan actual</AppText>
        <AppText variant="muted">
          Estás usando el plan {currentPlan?.name ?? "Gratis"}.
        </AppText>

        <AppButton
          variant="secondary"
          onPress={() => router.push(routes.tabs.plans as never)}
        >
          Ver planes
        </AppButton>
      </AppCard>

      <AppCard style={styles.card}>
        <AppText variant="subtitle">Datos locales</AppText>
        <AppText variant="muted">
          Tus datos se guardan en este dispositivo. Más adelante se podrá
          activar sincronización con cuenta.
        </AppText>

        <AppButton variant="secondary" onPress={handleResetLocalData}>
          Borrar datos locales
        </AppButton>
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },

  card: {
    gap: 16,
  },

  actions: {
    gap: 10,
  },
});
