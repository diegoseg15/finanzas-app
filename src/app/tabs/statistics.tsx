import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { getCategoryById } from "@/constants/categories";
import { colors } from "@/constants/colors";
import { ReportFilterModal } from "@/features/reports/components/ReportFilterModal";
import { formatMoney } from "@/services/money.service";
import { buildReport } from "@/services/report.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useMovementStore } from "@/store/useMovementStore";
import { useReportFilterStore } from "@/store/useReportFilterStore";
import { useTransferStore } from "@/store/useTransferStore";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function StatisticsScreen() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const mainCurrency = useAppSettingsStore((state) => state.mainCurrency);

  const accounts = useAccountStore((state) => state.accounts);
  const movements = useMovementStore((state) => state.movements);
  const transfers = useTransferStore((state) => state.transfers);

  const filters = useReportFilterStore((state) => state.filters);

  const report = buildReport({
    accounts,
    movements,
    transfers,
    filters: {
      ...filters,
      currency: filters.currency === "all" ? mainCurrency : filters.currency,
    },
  });

  const hasReportData =
    report.movements.length > 0 || report.transfers.length > 0;

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <AppText variant="title">Estadísticas</AppText>
        <AppText variant="muted">
          Analiza tus ingresos, egresos, transferencias y categorías.
        </AppText>
      </View>

      <View style={styles.filterBar}>
        <AppButton
          variant="secondary"
          onPress={() => setIsFilterModalOpen(true)}
        >
          Abrir filtros
        </AppButton>
      </View>

      <ReportFilterModal
        visible={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />

      {!hasReportData ? (
        <AppCard style={styles.card}>
          <AppText variant="subtitle">Sin datos para estos filtros</AppText>
          <AppText variant="muted">
            Cambia el período o registra movimientos para ver estadísticas.
          </AppText>
        </AppCard>
      ) : null}

      <View style={styles.grid}>
        <AppCard style={styles.card}>
          <AppText variant="caption">Ingresos</AppText>
          <AppText style={{ color: themeColors.income }}>
            {formatMoney({
              amount: report.summary.totalIncome,
              currencyCode: report.summary.currency,
            })}
          </AppText>
        </AppCard>

        <AppCard style={styles.card}>
          <AppText variant="caption">Egresos</AppText>
          <AppText style={{ color: themeColors.expense }}>
            {formatMoney({
              amount: report.summary.totalExpense,
              currencyCode: report.summary.currency,
            })}
          </AppText>
        </AppCard>
      </View>

      <View style={styles.grid}>
        <AppCard style={styles.card}>
          <AppText variant="caption">Transferencias</AppText>
          <AppText>{report.summary.transferCount}</AppText>
        </AppCard>

        <AppCard style={styles.card}>
          <AppText variant="caption">Comisiones</AppText>
          <AppText style={{ color: themeColors.warning }}>
            {formatMoney({
              amount: report.summary.transferFees,
              currencyCode: report.summary.currency,
            })}
          </AppText>
        </AppCard>
      </View>

      <AppCard style={styles.card}>
        <AppText variant="caption">Balance del período</AppText>
        <AppText
          variant="subtitle"
          style={{
            color:
              report.summary.balance >= 0
                ? themeColors.income
                : themeColors.expense,
          }}
        >
          {formatMoney({
            amount: report.summary.balance,
            currencyCode: report.summary.currency,
          })}
        </AppText>
      </AppCard>

      <AppCard style={styles.card}>
        <AppText variant="subtitle">Gastos por categoría</AppText>

        {report.expensesByCategory.length > 0 ? (
          <View style={styles.categoryList}>
            {report.expensesByCategory.map((item) => {
              const category = getCategoryById(item.categoryId);

              return (
                <View key={item.categoryId} style={styles.categoryRow}>
                  <View style={styles.categoryCopy}>
                    <View style={styles.categoryText}>
                      <AppText>{category?.name ?? "Sin categoría"}</AppText>
                      <AppText variant="caption">
                        {item.percentage.toFixed(1)}%
                      </AppText>
                    </View>

                    <AppText variant="caption">
                      {formatMoney({
                        amount: item.amount,
                        currencyCode: report.summary.currency,
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
                          width: `${Math.min(item.percentage, 100)}%`,
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
            No hay egresos para estos filtros.
          </AppText>
        )}
      </AppCard>

      <AppCard style={styles.card}>
        <AppText variant="subtitle">Resumen por cuenta</AppText>

        <View style={styles.accountList}>
          {report.accountsSummary
            .filter(
              (item) =>
                item.income !== 0 || item.expense !== 0 || item.balance !== 0,
            )
            .map((item) => {
              const account = accounts.find(
                (currentAccount) => currentAccount.id === item.accountId,
              );

              return (
                <View key={item.accountId} style={styles.accountRow}>
                  <View style={styles.accountCopy}>
                    <AppText>{account?.name ?? "Cuenta eliminada"}</AppText>
                    <AppText variant="caption">
                      Balance:{" "}
                      {formatMoney({
                        amount: item.balance,
                        currencyCode: report.summary.currency,
                      })}
                    </AppText>
                  </View>

                  <View style={styles.accountAmounts}>
                    <AppText
                      variant="caption"
                      style={{ color: themeColors.income }}
                    >
                      +
                      {formatMoney({
                        amount: item.income,
                        currencyCode: report.summary.currency,
                      })}
                    </AppText>

                    <AppText
                      variant="caption"
                      style={{ color: themeColors.expense }}
                    >
                      -
                      {formatMoney({
                        amount: item.expense,
                        currencyCode: report.summary.currency,
                      })}
                    </AppText>
                  </View>
                </View>
              );
            })}
        </View>
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

  filterBar: {
    gap: 10,
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

  categoryText: {
    flex: 1,
    gap: 2,
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

  accountList: {
    gap: 14,
  },

  accountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  accountCopy: {
    flex: 1,
    gap: 4,
  },

  accountAmounts: {
    alignItems: "flex-end",
    gap: 4,
  },

  emptyText: {
    marginTop: 8,
  },
});
