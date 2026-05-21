import { Alert, Linking, StyleSheet, View } from "react-native";

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

const DEVELOPER_WEBSITE_URL = "https://portfolio-77060.web.app/";

export default function SettingsScreen() {
  const themeMode = useAppSettingsStore((state) => state.themeMode);
  const setThemeMode = useAppSettingsStore((state) => state.setThemeMode);
  const subscription = useSubscriptionStore((state) => state.subscription);
  const currentPlan = getSubscriptionPlanById(subscription.planId);
  const resetOnboarding = useAppSettingsStore((state) => state.resetOnboarding);

  const handleOpenDeveloperWebsite = async () => {
    const canOpen = await Linking.canOpenURL(DEVELOPER_WEBSITE_URL);

    if (!canOpen) {
      Alert.alert(
        "No se pudo abrir el enlace",
        "Tu dispositivo no puede abrir este sitio web en este momento.",
      );
      return;
    }

    await Linking.openURL(DEVELOPER_WEBSITE_URL);
  };

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
        <AppText variant="subtitle">Accesos</AppText>

        <AppButton
          variant="secondary"
          onPress={() => router.push(routes.tabs.reminders as never)}
        >
          Ver recordatorios
        </AppButton>

        <AppButton
          variant="secondary"
          onPress={() => router.push(routes.tabs.plans as never)}
        >
          Ver planes
        </AppButton>
      </AppCard>

      <AppCard style={styles.card}>
        <AppText variant="subtitle">Privacidad</AppText>
        <AppText variant="muted">
          Esta versión funciona en modo local. Tus cuentas, movimientos,
          transferencias y recordatorios se guardan únicamente en este
          dispositivo.
        </AppText>
      </AppCard>

      <AppCard style={styles.card}>
        <AppText variant="subtitle">Datos locales</AppText>
        <AppText variant="muted">
          Tus datos se guardan en este dispositivo. Más adelante se podrá
          activar sincronización con cuenta.
        </AppText>

        <AppButton
          variant="secondary"
          onPress={() => {
            resetOnboarding();
            router.replace(routes.onboarding.welcome as never);
          }}
        >
          Ver onboarding otra vez
        </AppButton>

        <AppButton variant="secondary" onPress={handleResetLocalData}>
          Borrar datos locales
        </AppButton>
      </AppCard>

      <AppCard style={styles.card}>
        <AppText variant="subtitle">Acerca de Orvian</AppText>

        <View style={styles.infoList}>
          <View style={styles.infoRow}>
            <AppText variant="muted">Aplicación</AppText>
            <AppText>Orvian</AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText variant="muted">Versión</AppText>
            <AppText>1.0.0</AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText variant="muted">Desarrollador</AppText>
            <AppText>Diego Segovia</AppText>
          </View>
        </View>

        <AppText variant="muted">
          Orvian es una app de finanzas personales creada para ayudarte a
          registrar tus cuentas, movimientos, presupuestos y reportes desde un
          solo lugar.
        </AppText>

        <AppButton variant="secondary" onPress={handleOpenDeveloperWebsite}>
          Visitar web del desarrollador
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

  infoList: {
    gap: 12,
  },

  infoRow: {
    gap: 4,
  },
});
