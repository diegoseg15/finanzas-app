import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import { CopilotStep, walkthroughable } from "react-native-copilot";
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

const cardOuterHorizontalPadding = 40;
const cardInnerHorizontalPadding = 32;
const chartWidth = Math.max(
  screenWidth - cardOuterHorizontalPadding - cardInnerHorizontalPadding,
  260,
);

const chartHeight = 190;
const lineChartHeight = 190;

const incomeExpenseBarWidth = 13;
const incomeExpensePairSpacing = 4;
const incomeExpenseGroupSpacing = 12;

const lineInitialSpacing = 26;
const lineEndSpacing = 26;

const CopilotView = walkthroughable(View);

function hasAnyValue(values: number[]) {
  return values.some((value) => value > 0 || value < 0);
}

function addEmptyMonthsToRight(
  data: Array<{
    key: string;
    label: string;
    year: number;
    month: number;
    income: number;
    expense: number;
    balance: number;
    currency: CurrencyCode;
  }>,
  targetMonthCount: number,
) {
  if (data.length === 0 || data.length >= targetMonthCount) {
    return data;
  }

  const result = [...data];
  const lastItem = result[result.length - 1];

  for (let index = 1; result.length < targetMonthCount; index += 1) {
    const nextDate = new Date(lastItem.year, lastItem.month - 1 + index, 1);
    const year = nextDate.getFullYear();
    const month = nextDate.getMonth() + 1;

    const label = nextDate
      .toLocaleDateString(undefined, {
        month: "short",
      })
      .replace(".", "")
      .slice(0, 3);

    result.push({
      key: `${year}-${String(month).padStart(2, "0")}`,
      label,
      year,
      month,
      income: 0,
      expense: 0,
      balance: 0,
      currency: lastItem.currency,
    });
  }

  return result;
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
  const maxWithPadding = max * 1.45;

  if (maxWithPadding <= 10) return 10;
  if (maxWithPadding <= 100) return Math.ceil(maxWithPadding / 10) * 10;
  if (maxWithPadding <= 1000) return Math.ceil(maxWithPadding / 100) * 100;

  return Math.ceil(maxWithPadding / 1000) * 1000;
}

function getPositiveChartMax(values: number[]) {
  const max = Math.max(...values, 1);
  const maxWithPadding = max * 1.25;

  if (maxWithPadding <= 10) return 10;
  if (maxWithPadding <= 100) return Math.ceil(maxWithPadding / 10) * 10;
  if (maxWithPadding <= 1000) return Math.ceil(maxWithPadding / 100) * 100;

  return Math.ceil(maxWithPadding / 1000) * 1000;
}

function getLineChartSpacing(pointCount: number) {
  if (pointCount <= 1) {
    return 40;
  }

  const availableWidth = chartWidth - lineInitialSpacing - lineEndSpacing - 24;

  return Math.max(34, availableWidth / (pointCount - 1));
}

export function FinancialChartsPanel({
  movements,
  currency,
  currentBudget,
}: FinancialChartsPanelProps) {
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const realMonthlyData = buildMonthlyIncomeExpenseData({
    movements,
    currency,
    monthCount: 6,
  });

  const monthlyData = addEmptyMonthsToRight(realMonthlyData, 6);

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

  const incomeExpenseValues = monthlyData.flatMap((item) => [
    item.income,
    item.expense,
  ]);

  const incomeExpenseBarData = monthlyData.flatMap((item, index) => [
    {
      value: item.income,
      label: item.label,
      labelWidth: 34,
      frontColor: themeColors.income,
      spacing: incomeExpensePairSpacing,
    },
    {
      value: item.expense,
      frontColor: themeColors.expense,
      spacing: index === monthlyData.length - 1 ? 0 : incomeExpenseGroupSpacing,
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

  const balanceLineSpacing = getLineChartSpacing(balanceLineData.length);

  const categoryPieData = topCategories.map((item) => ({
    value: item.value,
    color: item.color,
  }));

  const hasIncomeExpenseData = hasAnyValue(incomeExpenseValues);
  const hasBalanceData = hasAnyValue(balanceValues);
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
      <CopilotStep
        text={t("guides.statisticsTour.incomeVsExpense")}
        order={3}
        name="statistics-income-expense-chart"
      >
        <CopilotView>
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
              <View style={styles.chartContent}>
                <View style={styles.chartFrame}>
                  <BarChart
                    data={incomeExpenseBarData}
                    width={chartWidth}
                    height={chartHeight}
                    barWidth={incomeExpenseBarWidth}
                    spacing={incomeExpenseGroupSpacing}
                    initialSpacing={18}
                    endSpacing={18}
                    roundedTop
                    roundedBottom
                    yAxisThickness={0}
                    xAxisThickness={0}
                    hideRules
                    noOfSections={4}
                    yAxisLabelWidth={42}
                    xAxisLabelsHeight={28}
                    maxValue={getPositiveChartMax(incomeExpenseValues)}
                    yAxisTextStyle={{
                      color: themeColors.textMuted,
                      fontSize: 10,
                    }}
                    xAxisLabelTextStyle={{
                      color: themeColors.textMuted,
                      fontSize: 10,
                      width: 34,
                      textAlign: "center",
                    }}
                  />
                </View>

                <View style={styles.legend}>
                  <View style={styles.legendItem}>
                    <View
                      style={[
                        styles.legendDot,
                        { backgroundColor: themeColors.income },
                      ]}
                    />
                    <AppText
                      variant="caption"
                      i18nKey="statistics.labels.income"
                    />
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
        </CopilotView>
      </CopilotStep>

      <CopilotStep
        text={t("guides.statisticsTour.balanceEvolution")}
        order={4}
        name="statistics-balance-evolution-chart"
      >
        <CopilotView>
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
              <View style={styles.chartContent}>
                <View style={styles.chartFrame}>
                  <LineChart
                    data={balanceLineData}
                    width={chartWidth}
                    height={lineChartHeight}
                    curved
                    curvature={0.16}
                    thickness={3}
                    color={themeColors.primary}
                    dataPointsColor={themeColors.primary}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    hideRules
                    hideDataPoints={false}
                    noOfSections={4}
                    maxValue={balanceAbsMax}
                    mostNegativeValue={hasNegativeBalance ? -balanceAbsMax : 0}
                    initialSpacing={lineInitialSpacing}
                    endSpacing={lineEndSpacing}
                    spacing={balanceLineSpacing}
                    yAxisLabelWidth={46}
                    xAxisLabelsHeight={28}
                    overflowTop={24}
                    overflowBottom={12}
                    yAxisTextStyle={{
                      color: themeColors.textMuted,
                      fontSize: 10,
                    }}
                    xAxisLabelTextStyle={{
                      color: themeColors.textMuted,
                      fontSize: 10,
                      width: 34,
                      textAlign: "center",
                    }}
                    dataPointsHeight={6}
                    dataPointsWidth={6}
                  />
                </View>
              </View>
            ) : (
              <EmptyChartState i18nKey="statistics.empty.noBalanceTrend" />
            )}
          </AppCard>
        </CopilotView>
      </CopilotStep>

      <CopilotStep
        text={t("guides.statisticsTour.topCategories")}
        order={5}
        name="statistics-top-categories-chart"
      >
        <CopilotView>
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
                <View style={styles.pieBox}>
                  <PieChart
                    data={categoryPieData}
                    donut
                    radius={70}
                    innerRadius={44}
                    showText={false}
                    centerLabelComponent={() => (
                      <View style={styles.centerLabel}>
                        <AppText
                          variant="caption"
                          i18nKey="statistics.labels.top"
                        />
                      </View>
                    )}
                  />
                </View>

                <View style={styles.categoryLegend}>
                  {topCategories.map((item) => (
                    <View
                      key={item.categoryId}
                      style={styles.categoryLegendItem}
                    >
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
        </CopilotView>
      </CopilotStep>

      <CopilotStep
        text={t("guides.statisticsTour.budgetUsed")}
        order={6}
        name="statistics-budget-chart"
      >
        <CopilotView>
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
                <View style={styles.pieBox}>
                  <PieChart
                    data={budgetPieData}
                    donut
                    radius={70}
                    innerRadius={46}
                    showText={false}
                    centerLabelComponent={() => (
                      <View style={styles.centerLabel}>
                        <AppText
                          variant="caption"
                          i18nKey="statistics.labels.used"
                        />

                        <AppText variant="body">
                          {budgetUsage.totalPercentageUsed.toFixed(0)}%
                        </AppText>
                      </View>
                    )}
                  />
                </View>

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
        </CopilotView>
      </CopilotStep>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },

  card: {
    gap: 16,
    overflow: "hidden",
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

  chartContent: {
    gap: 12,
  },

  chartFrame: {
    width: "100%",
    height: 230,
    overflow: "hidden",
    justifyContent: "center",
  },

  legend: {
    flexDirection: "row",
    gap: 14,
    flexWrap: "wrap",
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
    gap: 14,
    overflow: "hidden",
  },

  pieBox: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
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
    gap: 14,
    overflow: "hidden",
  },

  budgetCopy: {
    flex: 1,
    gap: 8,
  },
});
