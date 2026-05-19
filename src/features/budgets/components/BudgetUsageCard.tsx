import { StyleSheet, View } from "react-native";

import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { getCategoryById } from "@/constants/categories";
import { colors } from "@/constants/colors";
import { getBudgetPeriodLabel } from "@/services/budget.service";
import { formatMoney } from "@/services/money.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { MonthlyBudgetUsage } from "@/types/budget.types";

type BudgetUsageCardProps = {
  usage: MonthlyBudgetUsage;
};

export function BudgetUsageCard({ usage }: BudgetUsageCardProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const statusColor =
    usage.totalStatus === "exceeded"
      ? themeColors.expense
      : usage.totalStatus === "warning"
        ? themeColors.warning
        : themeColors.income;

  return (
    <AppCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <AppText variant="subtitle">
            Presupuesto de{" "}
            {getBudgetPeriodLabel(usage.budget.year, usage.budget.month)}
          </AppText>

          <AppText variant="muted">
            Gasto actual vs presupuesto mensual.
          </AppText>
        </View>

        <AppText style={{ color: statusColor }}>
          {usage.totalPercentageUsed.toFixed(0)}%
        </AppText>
      </View>

      <View style={styles.amounts}>
        <View>
          <AppText variant="caption">Gastado</AppText>
          <AppText style={{ color: statusColor }}>
            {formatMoney({
              amount: usage.totalSpent,
              currencyCode: usage.budget.currency,
            })}
          </AppText>
        </View>

        <View style={styles.amountRight}>
          <AppText variant="caption">Límite</AppText>
          <AppText>
            {formatMoney({
              amount: usage.budget.generalLimit,
              currencyCode: usage.budget.currency,
            })}
          </AppText>
        </View>
      </View>

      <View
        style={[
          styles.progressTrack,
          {
            backgroundColor: themeColors.cardSoft,
          },
        ]}
      >
        <View
          style={[
            styles.progressFill,
            {
              width: `${Math.min(usage.totalPercentageUsed, 100)}%`,
              backgroundColor: statusColor,
            },
          ]}
        />
      </View>

      {usage.totalStatus === "exceeded" ? (
        <AppText variant="caption" style={{ color: themeColors.expense }}>
          Superaste tu presupuesto mensual.
        </AppText>
      ) : usage.totalStatus === "warning" ? (
        <AppText variant="caption" style={{ color: themeColors.warning }}>
          Estás cerca de alcanzar tu presupuesto mensual.
        </AppText>
      ) : (
        <AppText variant="caption" style={{ color: themeColors.income }}>
          Tu gasto está dentro del presupuesto.
        </AppText>
      )}

      {usage.categories.length > 0 ? (
        <View style={styles.categoryList}>
          <AppText variant="subtitle">Categorías limitadas</AppText>

          {usage.categories.map((categoryUsage) => {
            const category = getCategoryById(categoryUsage.categoryId);

            const categoryStatusColor =
              categoryUsage.status === "exceeded"
                ? themeColors.expense
                : categoryUsage.status === "warning"
                  ? themeColors.warning
                  : themeColors.income;

            return (
              <View key={categoryUsage.categoryId} style={styles.categoryItem}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryCopy}>
                    <AppText>{category?.name ?? "Categoría"}</AppText>
                    <AppText variant="caption">
                      {formatMoney({
                        amount: categoryUsage.spent,
                        currencyCode: usage.budget.currency,
                      })}{" "}
                      de{" "}
                      {formatMoney({
                        amount: categoryUsage.limit,
                        currencyCode: usage.budget.currency,
                      })}
                    </AppText>
                  </View>

                  <AppText
                    variant="caption"
                    style={{ color: categoryStatusColor }}
                  >
                    {categoryUsage.percentageUsed.toFixed(0)}%
                  </AppText>
                </View>

                <View
                  style={[
                    styles.categoryTrack,
                    {
                      backgroundColor: themeColors.cardSoft,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.categoryFill,
                      {
                        width: `${Math.min(categoryUsage.percentageUsed, 100)}%`,
                        backgroundColor: categoryStatusColor,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </View>
      ) : null}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  copy: {
    flex: 1,
    gap: 4,
  },

  amounts: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  amountRight: {
    alignItems: "flex-end",
  },

  progressTrack: {
    height: 12,
    borderRadius: 999,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
  },

  categoryList: {
    gap: 14,
  },

  categoryItem: {
    gap: 8,
  },

  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  categoryCopy: {
    flex: 1,
    gap: 2,
  },

  categoryTrack: {
    height: 8,
    borderRadius: 999,
    overflow: "hidden",
  },

  categoryFill: {
    height: "100%",
    borderRadius: 999,
  },
});
