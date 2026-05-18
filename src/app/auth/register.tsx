import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { routes } from "@/constants/routes";

export default function RegisterScreen() {
  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <AppText variant="title">Crear cuenta</AppText>
        <AppText variant="muted">
          Esta función quedará preparada para sincronización, backups y planes
          premium.
        </AppText>
      </View>

      <AppCard style={styles.card}>
        <AppText variant="subtitle">Próximamente</AppText>
        <AppText variant="muted">
          Por ahora puedes usar la app sin registrarte.
        </AppText>

        <AppButton onPress={() => router.replace(routes.tabs.home)}>
          Continuar gratis
        </AppButton>
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },

  header: {
    gap: 10,
  },

  card: {
    gap: 16,
  },
});
