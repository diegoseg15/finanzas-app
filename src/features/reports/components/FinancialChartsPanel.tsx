import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";

import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { calculateMonthlyBudgetUsage } from "@/services/budget.service";
import {
  buildBalanceEvolutionData,
  buildMonthlyIncomeExpenseData,
  buildTopExpenseCategoriesData,
} from "@/services/chart-data.service";
import { formatMoney } from "@/services/money.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { MonthlyBudget } from "@/types/budget.types";
import { CurrencyCode, Movement } from "@/types/finance.types";

type FinancialChartsPanelProps = {
  movements: Movement[];
  currency: CurrencyCode;
  currentBudget?: MonthlyBudget;
};

type EmptyChartStateProps = {
  i18nKey: string;
};

const screenWidth = Dimensions.get("window").width;
const cardHorizontalPadding = 32;
const screenHorizontalPadding = 40;
const chartWidth = Math.max(
  screenWidth - screenHorizontalPadding - cardHorizontalPadding,
  260,
);

function hasAnyValue(values: number[]) {
  return values.some((value) => value > 0 || value < 0);
}

function EmptyChartState({ i18nKey }: EmptyChartStateProps) {
  return (
    <View style={styles.emptyChart}>
      <AppText variant="caption" i18nKey={i18nKey} />
    </View>
  );
}

function getChartAbsMax(values: number[]) {
  const max = Math.max(...values.map((value) => Math.abs(value)), 1);

  if (max <= 10) return 10;
  if (max <= 100) return Math.ceil(max / 10) * 10;
  if (max <= 1000) return Math.ceil(max / 100) * 100;

  return Math.ceil(max / 1000) * 1000;
}

function formatChartValue(value: number) {
  if (Math.abs(value) >= 1000) {
    return `${Math.round(value / 1000)}k`;
  }

  return String(Math.round(value));
}

export function FinancialChartsPanel({
  movements,
  currency,
  currentBudget,
}: FinancialChartsPanelProps) {
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const monthlyData = buildMonthlyIncomeExpenseData({
    movements,
    currency,
    monthCount: 6,
  });

  const balanceData = buildBalanceEvolutionData({
    movements,
    currency,
    monthCount: 6,
  });

  const topCategories = buildTopExpenseCategoriesData({
    movements,
    currency,
    limit: 5,
  });

  const incomeExpenseBarData = monthlyData.flatMap((item) => [
    {
      value: item.income,
      label: item.label,
      labelWidth: 36,
      frontColor: themeColors.income,
      spacing: 4,
    },
    {
      value: item.expense,
      frontColor: themeColors.expense,
      spacing: 12,
    },
  ]);

  const balanceValues = balanceData.map((item) => item.balance);
  const balanceAbsMax = getChartAbsMax(balanceValues);
  const hasNegativeBalance = balanceValues.some((value) => value < 0);

  const balanceLineData = balanceData.map((item) => ({
    value: item.balance,
    label: item.label,
    dataPointText: "",
  }));

  const categoryPieData = topCategories.map((item) => ({
    value: item.value,
    color: item.color,
  }));

  const hasIncomeExpenseData = hasAnyValue(
    monthlyData.flatMap((item) => [item.income, item.expense]),
  );

  const hasBalanceData = hasAnyValue(balanceData.map((item) => item.balance));
  const hasCategoryData = topCategories.length > 0;

  const budgetUsage =
    currentBudget && currentBudget.currency === currency
      ? calculateMonthlyBudgetUsage({
          budget: currentBudget,
          movements,
        })
      : null;

  const budgetUsedPercentage = budgetUsage
    ? Math.min(budgetUsage.totalPercentageUsed, 100)
    : 0;

  const budgetRemainingPercentage = budgetUsage
    ? Math.max(100 - budgetUsedPercentage, 0)
    : 0;

  const budgetPieData = budgetUsage
    ? [
        {
          value: budgetUsedPercentage,
          color:
            budgetUsage.totalStatus === "exceeded"
              ? themeColors.expense
              : budgetUsage.totalStatus === "warning"
                ? themeColors.warning
                : themeColors.income,
          text: "",
        },
        {
          value: budgetRemainingPercentage,
          color: themeColors.cardSoft,
          text: "",
        },
      ]
    : [];

  return (
    <View style={styles.container}>
      <AppCard style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.copy}>
            <AppText
              variant="subtitle"
              i18nKey="statistics.charts.incomeVsExpense"
            />

            <AppText
              variant="muted"
              i18nKey="statistics.charts.incomeVsExpenseDescription"
            />
          </View>
        </View>

        {hasIncomeExpenseData ? (
          <View style={styles.chartBox}>
            <BarChart
              data={incomeExpenseBarData}
              width={chartWidth}
              height={180}
              barWidth={10}
              spacing={10}
              initialSpacing={8}
              endSpacing={8}
              roundedTop
              roundedBottom
              yAxisThickness={0}
              xAxisThickness={0}
              hideRules
              noOfSections={4}
              maxValue={
                Math.max(
                  ...monthlyData.flatMap((item) => [item.income, item.expense]),
                  1,
                ) * 1.25
              }
              yAxisTextStyle={{
                color: themeColors.textMuted,
                fontSize: 10,
              }}
              xAxisLabelTextStyle={{
                color: themeColors.textMuted,
                fontSize: 10,
                width: 36,
                textAlign: "center",
              }}
            />

            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View
                  style={[
                    styles.legendDot,
                    { backgroundColor: themeColors.income },
                  ]}
                />
                <AppText variant="caption" i18nKey="statistics.labels.income" />
              </View>

              <View style={styles.legendItem}>
                <View
                  style={[
                    styles.legendDot,
                    { backgroundColor: themeColors.expense },
                  ]}
                />
                <AppText
                  variant="caption"
                  i18nKey="statistics.labels.expenses"
                />
              </View>
            </View>
          </View>
        ) : (
          <EmptyChartState i18nKey="statistics.empty.noIncomeExpenseChart" />
        )}
      </AppCard>

      <AppCard style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.copy}>
            <AppText
              variant="subtitle"
              i18nKey="statistics.charts.balanceEvolution"
            />

            <AppText
              variant="muted"
              i18nKey="statistics.charts.balanceEvolutionDescription"
            />
          </View>
        </View>

        {hasBalanceData ? (
          <View style={styles.chartBox}>
            <LineChart
              data={balanceLineData}
              width={chartWidth}
              height={180}
              overflowTop={8}
              overflowBottom={8}
              adjustToWidth
              hideDataPoints={false}
              curved={!hasNegativeBalance}
              thickness={3}
              color={themeColors.primary}
              dataPointsColor={themeColors.primary}
              yAxisThickness={0}
              xAxisThickness={0}
              hideRules
              noOfSections={4}
              maxValue={balanceAbsMax}
              mostNegativeValue={hasNegativeBalance ? -balanceAbsMax : 0}
              initialSpacing={12}
              endSpacing={12}
              yAxisLabelWidth={42}
              yAxisTextStyle={{
                color: themeColors.textMuted,
                fontSize: 10,
              }}
              xAxisLabelTextStyle={{
                color: themeColors.textMuted,
                fontSize: 10,
                width: 36,
                textAlign: "center",
              }}
              dataPointsHeight={6}
              dataPointsWidth={6}
            />
          </View>
        ) : (
          <EmptyChartState i18nKey="statistics.empty.noBalanceTrend" />
        )}
      </AppCard>

      <AppCard style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.copy}>
            <AppText
              variant="subtitle"
              i18nKey="statistics.charts.topExpenseCategories"
            />

            <AppText
              variant="muted"
              i18nKey="statistics.charts.topExpenseCategoriesDescription"
            />
          </View>
        </View>

        {hasCategoryData ? (
          <View style={styles.pieLayout}>
            <PieChart
              data={categoryPieData}
              donut
              radius={78}
              innerRadius={48}
              showText={false}
              centerLabelComponent={() => (
                <View style={styles.centerLabel}>
                  <AppText variant="caption" i18nKey="statistics.labels.top" />
                  <AppText
                    variant="body"
                    i18nKey="statistics.labels.expenses"
                  />
                </View>
              )}
            />

            <View style={styles.categoryLegend}>
              {topCategories.map((item) => (
                <View key={item.categoryId} style={styles.categoryLegendItem}>
                  <View
                    style={[
                      styles.legendDot,
                      {
                        backgroundColor: item.color,
                      },
                    ]}
                  />

                  <View style={styles.categoryCopy}>
                    <AppText variant="caption" i18nKey={item.labelI18nKey}>
                      {item.label}
                    </AppText>
                    <AppText variant="caption">
                      {formatMoney({
                        amount: item.value,
                        currencyCode: currency,
                      })}
                    </AppText>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <EmptyChartState i18nKey="statistics.empty.noExpenseCategoriesChart" />
        )}
      </AppCard>

      <AppCard style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.copy}>
            <AppText
              variant="subtitle"
              i18nKey="statistics.charts.budgetUsed"
            />

            <AppText
              variant="muted"
              i18nKey="statistics.charts.budgetUsedDescription"
            />
          </View>
        </View>

        {budgetUsage ? (
          <View style={styles.budgetLayout}>
            <PieChart
              data={budgetPieData}
              donut
              radius={78}
              innerRadius={52}
              showText={false}
              centerLabelComponent={() => (
                <View style={styles.centerLabel}>
                  <AppText variant="caption" i18nKey="statistics.labels.used" />
                  <AppText variant="body">
                    {budgetUsage.totalPercentageUsed.toFixed(0)}%
                  </AppText>
                </View>
              )}
            />

            <View style={styles.budgetCopy}>
              <AppText variant="body">
                {t("statistics.labels.spentAmount", {
                  amount: formatMoney({
                    amount: budgetUsage.totalSpent,
                    currencyCode: budgetUsage.budget.currency,
                  }),
                })}
              </AppText>

              <AppText variant="caption">
                {t("statistics.labels.limitAmount", {
                  amount: formatMoney({
                    amount: budgetUsage.budget.generalLimit,
                    currencyCode: budgetUsage.budget.currency,
                  }),
                })}
              </AppText>

              <AppText
                variant="caption"
                style={{
                  color:
                    budgetUsage.totalStatus === "exceeded"
                      ? themeColors.expense
                      : budgetUsage.totalStatus === "warning"
                        ? themeColors.warning
                        : themeColors.income,
                }}
                i18nKey={
                  budgetUsage.totalStatus === "exceeded"
                    ? "budgets.status.exceeded"
                    : budgetUsage.totalStatus === "warning"
                      ? "budgets.status.warning"
                      : "budgets.status.safe"
                }
              />
            </View>
          </View>
        ) : (
          <EmptyChartState i18nKey="statistics.empty.noBudget" />
        )}
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },

  card: {
    gap: 16,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  copy: {
    flex: 1,
    gap: 4,
  },

  chartBox: {
    gap: 12,
    overflow: "hidden",
  },

  legend: {
    flexDirection: "row",
    gap: 14,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },

  emptyChart: {
    minHeight: 120,
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },

  pieLayout: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },

  centerLabel: {
    alignItems: "center",
    justifyContent: "center",
  },

  categoryLegend: {
    flex: 1,
    gap: 10,
  },

  categoryLegendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  categoryCopy: {
    flex: 1,
    gap: 2,
  },

  budgetLayout: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },

  budgetCopy: {
    flex: 1,
    gap: 8,
  },
});
