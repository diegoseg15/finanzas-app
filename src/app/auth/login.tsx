import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { routes } from "@/constants/routes";

export default function LoginScreen() {
  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <AppText variant="title">Iniciar sesión</AppText>
        <AppText variant="muted">
          El inicio de sesión será opcional. Por ahora puedes continuar usando
          la app en modo local.
        </AppText>
      </View>

      <AppCard style={styles.card}>
        <AppText variant="subtitle">Modo local</AppText>
        <AppText variant="muted">
          Tus datos se manejarán en el dispositivo mientras preparamos la
          sincronización segura.
        </AppText>

        <AppButton onPress={() => router.replace(routes.tabs.home)}>
          Continuar sin cuenta
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
