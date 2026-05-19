import { StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { getCategoryById } from "@/constants/categories";
import { colors } from "@/constants/colors";
import { formatMoney } from "@/services/money.service";
import {
  getBalanceFromMovements,
  getExpenseByCategory,
  getMovementsByCurrentMonth,
  getTotalExpense,
  getTotalIncome,
} from "@/services/statistics.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useMovementStore } from "@/store/useMovementStore";
import { useTransferStore } from "@/store/useTransferStore";

export default function StatisticsScreen() {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const mainCurrency = useAppSettingsStore((state) => state.mainCurrency);

  const movements = useMovementStore((state) => state.movements);
  const transfers = useTransferStore((state) => state.transfers);

  const monthlyMovements = getMovementsByCurrentMonth(movements).filter(
    (movement) => movement.currency === mainCurrency,
  );

  const monthlyTransfers = transfers.filter((transfer) => {
    const transferDate = new Date(transfer.date);
    const now = new Date();

    return (
      transferDate.getMonth() === now.getMonth() &&
      transferDate.getFullYear() === now.getFullYear()
    );
  });

  const totalIncome = getTotalIncome(monthlyMovements);
  const totalExpense = getTotalExpense(monthlyMovements);
  const monthlyBalance = getBalanceFromMovements(monthlyMovements);
  const hasMonthlyData =
    monthlyMovements.length > 0 || monthlyTransfers.length > 0;

  const totalTransferFees = monthlyTransfers
    .filter((transfer) => transfer.feeCurrency === mainCurrency)
    .reduce((total, transfer) => total + transfer.feeAmount, 0);

  const expenseByCategory = Object.entries(
    getExpenseByCategory(monthlyMovements),
  ).sort(([, amountA], [, amountB]) => amountB - amountA);

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <AppText variant="title">Estadísticas</AppText>
        <AppText variant="muted">Resumen básico del mes actual.</AppText>
      </View>

      {!hasMonthlyData ? (
        <AppCard style={styles.card}>
          <AppText variant="subtitle">Sin datos este mes</AppText>
          <AppText variant="muted">
            Registra ingresos, egresos o transferencias para ver tus
            estadísticas.
          </AppText>
        </AppCard>
      ) : null}

      <View style={styles.grid}>
        <AppCard style={styles.card}>
          <AppText variant="caption">Ingresos</AppText>
          <AppText style={{ color: themeColors.income }}>
            {formatMoney({
              amount: totalIncome,
              currencyCode: mainCurrency,
            })}
          </AppText>
        </AppCard>

        <AppCard style={styles.card}>
          <AppText variant="caption">Egresos</AppText>
          <AppText style={{ color: themeColors.expense }}>
            {formatMoney({
              amount: totalExpense,
              currencyCode: mainCurrency,
            })}
          </AppText>
        </AppCard>
      </View>

      <View style={styles.grid}>
        <AppCard style={styles.card}>
          <AppText variant="caption">Transferencias</AppText>
          <AppText>{monthlyTransfers.length}</AppText>
        </AppCard>

        <AppCard style={styles.card}>
          <AppText variant="caption">Comisiones</AppText>
          <AppText style={{ color: themeColors.warning }}>
            {formatMoney({
              amount: totalTransferFees,
              currencyCode: mainCurrency,
            })}
          </AppText>
        </AppCard>
      </View>

      <AppCard style={styles.card}>
        <AppText variant="caption">Balance del mes</AppText>
        <AppText
          variant="subtitle"
          style={{
            color:
              monthlyBalance >= 0 ? themeColors.income : themeColors.expense,
          }}
        >
          {formatMoney({
            amount: monthlyBalance,
            currencyCode: mainCurrency,
          })}
        </AppText>
      </AppCard>

      <AppCard style={styles.card}>
        <AppText variant="subtitle">Gastos por categoría</AppText>

        {expenseByCategory.length > 0 ? (
          <View style={styles.categoryList}>
            {expenseByCategory.map(([categoryId, amount]) => {
              const category = getCategoryById(categoryId);

              return (
                <View key={categoryId} style={styles.categoryRow}>
                  <View style={styles.categoryCopy}>
                    <AppText>{category?.name ?? "Sin categoría"}</AppText>
                    <AppText variant="caption">
                      {formatMoney({
                        amount,
                        currencyCode: mainCurrency,
                      })}
                    </AppText>
                  </View>

                  <View
                    style={[
                      styles.categoryBar,
                      {
                        backgroundColor: themeColors.cardSoft,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.categoryBarFill,
                        {
                          width: `${Math.min(
                            (amount / Math.max(totalExpense, 1)) * 100,
                            100,
                          )}%`,
                          backgroundColor:
                            category?.color ?? themeColors.primary,
                        },
                      ]}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <AppText variant="muted" style={styles.emptyText}>
            Todavía no hay egresos registrados este mes.
          </AppText>
        )}
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },

  header: {
    gap: 8,
  },

  grid: {
    flexDirection: "row",
    gap: 12,
  },

  card: {
    flex: 1,
    gap: 12,
  },

  categoryList: {
    gap: 16,
  },

  categoryRow: {
    gap: 8,
  },

  categoryCopy: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  categoryBar: {
    height: 8,
    borderRadius: 999,
    overflow: "hidden",
  },

  categoryBarFill: {
    height: "100%",
    borderRadius: 999,
  },

  emptyText: {
    marginTop: 8,
  },
});
