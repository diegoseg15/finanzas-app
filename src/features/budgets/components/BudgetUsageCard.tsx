import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const statusColor =
    usage.totalStatus === "exceeded"
      ? themeColors.expense
      : usage.totalStatus === "warning"
        ? themeColors.warning
        : themeColors.income;

  const budgetPeriodLabel = getBudgetPeriodLabel(
    usage.budget.year,
    usage.budget.month,
  );

  return (
    <AppCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <AppText variant="subtitle">
            {t("budgets.budgetOf", {
              period: budgetPeriodLabel,
              defaultValue: `Presupuesto de ${budgetPeriodLabel}`,
            })}
          </AppText>

          <AppText variant="muted" i18nKey="budgets.currentSpendingVsBudget" />
        </View>

        <AppText style={{ color: statusColor }}>
          {usage.totalPercentageUsed.toFixed(0)}%
        </AppText>
      </View>

      <View style={styles.amounts}>
        <View>
          <AppText variant="caption" i18nKey="budgets.spent" />

          <AppText style={{ color: statusColor }}>
            {formatMoney({
              amount: usage.totalSpent,
              currencyCode: usage.budget.currency,
            })}
          </AppText>
        </View>

        <View style={styles.amountRight}>
          <AppText variant="caption" i18nKey="budgets.limit" />

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
        <AppText
          variant="caption"
          style={{ color: themeColors.expense }}
          i18nKey="budgets.status.exceeded"
        />
      ) : usage.totalStatus === "warning" ? (
        <AppText
          variant="caption"
          style={{ color: themeColors.warning }}
          i18nKey="budgets.status.warning"
        />
      ) : (
        <AppText
          variant="caption"
          style={{ color: themeColors.income }}
          i18nKey="budgets.status.safe"
        />
      )}

      {usage.categories.length > 0 ? (
        <View style={styles.categoryList}>
          <AppText variant="subtitle" i18nKey="budgets.limitedCategories" />

          {usage.categories.map((categoryUsage) => {
            const category = getCategoryById(categoryUsage.categoryId);

            const categoryStatusColor =
              categoryUsage.status === "exceeded"
                ? themeColors.expense
                : categoryUsage.status === "warning"
                  ? themeColors.warning
                  : themeColors.income;

            const spentText = formatMoney({
              amount: categoryUsage.spent,
              currencyCode: usage.budget.currency,
            });

            const limitText = formatMoney({
              amount: categoryUsage.limit,
              currencyCode: usage.budget.currency,
            });

            return (
              <View key={categoryUsage.categoryId} style={styles.categoryItem}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryCopy}>
                    <AppText>{category?.name ?? t("common.category")}</AppText>

                    <AppText variant="caption">
                      {t("budgets.spentOfLimit", {
                        spent: spentText,
                        limit: limitText,
                        defaultValue: `${spentText} de ${limitText}`,
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
