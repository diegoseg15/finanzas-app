import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { routes } from "@/constants/routes";
import { MovementCard } from "@/features/movements/components/MovementCard";
import { TransferCard } from "@/features/transfers/components/TransferCard";
import { formatMoney } from "@/services/money.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useMovementStore } from "@/store/useMovementStore";
import { useReminderStore } from "@/store/useReminderStore";
import { useTransferStore } from "@/store/useTransferStore";
import { router } from "expo-router";

export default function HomeScreen() {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const mainCurrency = useAppSettingsStore((state) => state.mainCurrency);

  const accounts = useAccountStore((state) => state.accounts);
  const movements = useMovementStore((state) => state.movements);
  const transfers = useTransferStore((state) => state.transfers);
  const reminders = useReminderStore((state) => state.reminders);

  const activeAccounts = useMemo(
    () => accounts.filter((account) => account.status === "active"),
    [accounts],
  );

  const totalBalance = activeAccounts.reduce((total, account) => {
    if (!account.includeInTotalBalance) {
      return total;
    }

    const mainBalance = account.balances[0];

    if (!mainBalance || mainBalance.currency !== mainCurrency) {
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
      movement.currency === mainCurrency
    );
  });

  const monthlyIncome = monthlyMovements
    .filter((movement) => movement.kind === "income")
    .reduce((total, movement) => total + movement.amount, 0);

  const monthlyExpense = monthlyMovements
    .filter((movement) => movement.kind === "expense")
    .reduce((total, movement) => total + movement.amount, 0);

  const latestItems = useMemo(() => {
    const movementItems = movements.map((movement) => ({
      id: movement.id,
      type: "movement" as const,
      date: movement.date,
      data: movement,
    }));

    const transferItems = transfers.map((transfer) => ({
      id: transfer.id,
      type: "transfer" as const,
      date: transfer.date,
      data: transfer,
    }));

    return [...movementItems, ...transferItems]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }, [movements, transfers]);

  const upcomingReminders = useMemo(
    () =>
      reminders
        .filter(
          (reminder) =>
            reminder.status === "active" &&
            new Date(reminder.scheduledAt).getTime() >= Date.now(),
        )
        .sort(
          (a, b) =>
            new Date(a.scheduledAt).getTime() -
            new Date(b.scheduledAt).getTime(),
        )
        .slice(0, 2),
    [reminders],
  );

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <AppText variant="muted">Balance total estimado</AppText>
        <AppText variant="title">
          {formatMoney({
            amount: totalBalance,
            currencyCode: mainCurrency,
          })}
        </AppText>
      </View>

      <View style={styles.summaryGrid}>
        <AppCard style={styles.summaryCard}>
          <AppText variant="caption">Ingresos del mes</AppText>
          <AppText style={{ color: themeColors.income }}>
            {formatMoney({
              amount: monthlyIncome,
              currencyCode: mainCurrency,
            })}
          </AppText>
        </AppCard>

        <AppCard style={styles.summaryCard}>
          <AppText variant="caption">Egresos del mes</AppText>
          <AppText style={{ color: themeColors.expense }}>
            {formatMoney({
              amount: monthlyExpense,
              currencyCode: mainCurrency,
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
              currencyCode: mainCurrency,
            })}
          </AppText>
        </AppCard>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <AppText variant="subtitle">Próximos recordatorios</AppText>

          <AppButton
            variant="ghost"
            onPress={() => router.push(routes.tabs.reminders as never)}
            style={styles.sectionAction}
          >
            Ver todos
          </AppButton>
        </View>

        {upcomingReminders.length > 0 ? (
          <View style={styles.list}>
            {upcomingReminders.map((reminder) => (
              <AppCard key={reminder.id}>
                <AppText variant="body">{reminder.title}</AppText>
                <AppText variant="caption" style={{ marginTop: 6 }}>
                  {new Date(reminder.scheduledAt).toLocaleDateString()} ·{" "}
                  {new Date(reminder.scheduledAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </AppText>
              </AppCard>
            ))}
          </View>
        ) : (
          <AppCard>
            <AppText variant="muted">No tienes recordatorios próximos.</AppText>
          </AppCard>
        )}
      </View>

      <View style={styles.section}>
        <AppText variant="subtitle">Actividad reciente</AppText>

        {latestItems.length > 0 ? (
          <View style={styles.list}>
            {latestItems.map((item) =>
              item.type === "movement" ? (
                <MovementCard key={item.id} movement={item.data} />
              ) : (
                <TransferCard key={item.id} transfer={item.data} />
              ),
            )}
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
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  sectionAction: {
    minHeight: 38,
    paddingHorizontal: 14,
  },
});
