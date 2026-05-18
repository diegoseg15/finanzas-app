import { StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

export default function HomeScreen() {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <AppText variant="muted">Balance total</AppText>
        <AppText variant="title">$ 0.00</AppText>
      </View>

      <View style={styles.summaryGrid}>
        <AppCard style={styles.summaryCard}>
          <AppText variant="caption">Ingresos</AppText>
          <AppText style={{ color: themeColors.income }}>+$0.00</AppText>
        </AppCard>

        <AppCard style={styles.summaryCard}>
          <AppText variant="caption">Egresos</AppText>
          <AppText style={{ color: themeColors.expense }}>-$0.00</AppText>
        </AppCard>
      </View>

      <AppCard>
        <AppText variant="subtitle">Últimos movimientos</AppText>
        <AppText variant="muted" style={styles.emptyText}>
          Todavía no has registrado movimientos.
        </AppText>
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },

  header: {
    gap: 6,
  },

  summaryGrid: {
    flexDirection: "row",
    gap: 12,
  },

  summaryCard: {
    flex: 1,
    gap: 8,
  },

  emptyText: {
    marginTop: 10,
  },
});
