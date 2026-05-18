import { StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { defaultCurrencyCode } from "@/constants/currencies";
import { MovementCard } from "@/features/movements/components/MovementCard";
import { formatMoney } from "@/services/money.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useMovementStore } from "@/store/useMovementStore";

export default function HomeScreen() {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const accounts = useAccountStore((state) => state.accounts);
  const movements = useMovementStore((state) => state.movements);

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

  const monthlyMovements = movements.filter((movement) => {
    const movementDate = new Date(movement.date);
    const now = new Date();

    return (
      movementDate.getMonth() === now.getMonth() &&
      movementDate.getFullYear() === now.getFullYear() &&
      movement.currency === defaultCurrencyCode
    );
  });

  const monthlyIncome = monthlyMovements
    .filter((movement) => movement.kind === "income")
    .reduce((total, movement) => total + movement.amount, 0);

  const monthlyExpense = monthlyMovements
    .filter((movement) => movement.kind === "expense")
    .reduce((total, movement) => total + movement.amount, 0);

  const latestMovements = movements.slice(0, 3);

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
          <AppText variant="caption">Ingresos del mes</AppText>
          <AppText style={{ color: themeColors.income }}>
            {formatMoney({
              amount: monthlyIncome,
              currencyCode: defaultCurrencyCode,
            })}
          </AppText>
        </AppCard>

        <AppCard style={styles.summaryCard}>
          <AppText variant="caption">Egresos del mes</AppText>
          <AppText style={{ color: themeColors.expense }}>
            {formatMoney({
              amount: monthlyExpense,
              currencyCode: defaultCurrencyCode,
            })}
          </AppText>
        </AppCard>
      </View>

      <View style={styles.summaryGrid}>
        <AppCard style={styles.summaryCard}>
          <AppText variant="caption">Cuentas</AppText>
          <AppText>{activeAccounts.length}</AppText>
        </AppCard>

        <AppCard style={styles.summaryCard}>
          <AppText variant="caption">Balance mensual</AppText>
          <AppText
            style={{
              color:
                monthlyIncome - monthlyExpense >= 0
                  ? themeColors.income
                  : themeColors.expense,
            }}
          >
            {formatMoney({
              amount: monthlyIncome - monthlyExpense,
              currencyCode: defaultCurrencyCode,
            })}
          </AppText>
        </AppCard>
      </View>

      <View style={styles.section}>
        <AppText variant="subtitle">Últimos movimientos</AppText>

        {latestMovements.length > 0 ? (
          <View style={styles.list}>
            {latestMovements.map((movement) => (
              <MovementCard key={movement.id} movement={movement} />
            ))}
          </View>
        ) : (
          <AppCard>
            <AppText variant="muted">
              Todavía no has registrado movimientos.
            </AppText>
          </AppCard>
        )}
      </View>
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

  section: {
    gap: 12,
  },

  list: {
    gap: 12,
  },
});
