import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { routes } from "@/constants/routes";

export default function SetupScreen() {
  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <AppText variant="title">Configura tu experiencia</AppText>
        <AppText variant="muted">
          Estas preguntas nos ayudan a preparar la app según tu forma de manejar
          el dinero.
        </AppText>
      </View>

      <View style={styles.section}>
        <AppCard>
          <AppText variant="subtitle">Moneda principal</AppText>
          <AppText variant="muted" style={styles.cardText}>
            Por ahora usaremos USD como moneda base. Luego podrás cambiarlo en
            ajustes.
          </AppText>
        </AppCard>

        <AppCard>
          <AppText variant="subtitle">Patrimonio total</AppText>
          <AppText variant="muted" style={styles.cardText}>
            La app podrá sumar bancos, efectivo, cripto, deudas y activos para
            mostrar una visión general.
          </AppText>
        </AppCard>

        <AppCard>
          <AppText variant="subtitle">Criptomonedas</AppText>
          <AppText variant="muted" style={styles.cardText}>
            Binance y Metamask se manejarán como cuentas especiales con varias
            monedas.
          </AppText>
        </AppCard>
      </View>

      <AppButton onPress={() => router.push(routes.onboarding.plans)}>
        Continuar
      </AppButton>
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

  section: {
    gap: 14,
    flex: 1,
  },

  cardText: {
    marginTop: 8,
  },
});
