import { Alert, StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { resetLocalData } from "@/services/storage/reset-local-data.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

export default function SettingsScreen() {
  const themeMode = useAppSettingsStore((state) => state.themeMode);
  const setThemeMode = useAppSettingsStore((state) => state.setThemeMode);

  const handleResetLocalData = () => {
    Alert.alert(
      "Borrar datos locales",
      "Esto eliminará cuentas, movimientos, transferencias y configuración guardada en este dispositivo.",
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
