import { StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { defaultCurrencyCode } from "@/constants/currencies";
import { formatMoney } from "@/services/money.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

export default function HomeScreen() {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const accounts = useAccountStore((state) => state.accounts);

  const activeAccounts = accounts.filter(
    (account) => account.status === "active",
  );

  const totalBalance = activeAccounts.reduce((total, account) => {
    if (!account.includeInTotalBalance) {
      return total;
    }

    const mainBalance = account.balances[0];

    if (!mainBalance || mainBalance.currency !== defaultCurrencyCode) {
      return total;
    }

    return total + mainBalance.amount;
  }, 0);

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <AppText variant="muted">Balance total estimado</AppText>
        <AppText variant="title">
          {formatMoney({
            amount: totalBalance,
            currencyCode: defaultCurrencyCode,
          })}
        </AppText>
      </View>

      <View style={styles.summaryGrid}>
        <AppCard style={styles.summaryCard}>
          <AppText variant="caption">Cuentas</AppText>
          <AppText>{activeAccounts.length}</AppText>
        </AppCard>

        <AppCard style={styles.summaryCard}>
          <AppText variant="caption">Moneda base</AppText>
          <AppText style={{ color: themeColors.primary }}>
            {defaultCurrencyCode}
          </AppText>
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
