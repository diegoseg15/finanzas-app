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

const screenWidth = Dimensions.get("window").width;
const chartWidth = Math.max(screenWidth - 72, 280);

function hasAnyValue(values: number[]) {
  return values.some((value) => value > 0 || value < 0);
}

function EmptyChartState({ message }: { message: string }) {
  return (
    <View style={styles.emptyChart}>
      <AppText variant="caption">{message}</AppText>
    </View>
  );
}

export function FinancialChartsPanel({
  movements,
  currency,
  currentBudget,
}: FinancialChartsPanelProps) {
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
      frontColor: themeColors.income,
      spacing: 2,
    },
    {
      value: item.expense,
      frontColor: themeColors.expense,
    },
  ]);

  const balanceLineData = balanceData.map((item) => ({
    value: item.balance,
    label: item.label,
    dataPointText: item.balance !== 0 ? String(Math.round(item.balance)) : "",
  }));

  const categoryPieData = topCategories.map((item) => ({
    value: item.value,
    text: `${item.percentage.toFixed(0)}%`,
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
          text: `${budgetUsedPercentage.toFixed(0)}%`,
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
            <AppText variant="subtitle">Ingresos vs egresos</AppText>
            <AppText variant="muted">
              Comparación mensual de entradas y salidas.
            </AppText>
          </View>
        </View>

        {hasIncomeExpenseData ? (
          <View style={styles.chartBox}>
            <BarChart
              data={incomeExpenseBarData}
              width={chartWidth}
              height={190}
              barWidth={14}
              spacing={14}
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
                <AppText variant="caption">Ingresos</AppText>
              </View>

              <View style={styles.legendItem}>
                <View
                  style={[
                    styles.legendDot,
                    { backgroundColor: themeColors.expense },
                  ]}
                />
                <AppText variant="caption">Egresos</AppText>
              </View>
            </View>
          </View>
        ) : (
          <EmptyChartState message="No hay ingresos o egresos para graficar." />
        )}
      </AppCard>

      <AppCard style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.copy}>
            <AppText variant="subtitle">Evolución del balance</AppText>
            <AppText variant="muted">
              Balance acumulado de los últimos meses.
            </AppText>
          </View>
        </View>

        {hasBalanceData ? (
          <View style={styles.chartBox}>
            <LineChart
              data={balanceLineData}
              width={chartWidth}
              height={190}
              curved
              thickness={3}
              color={themeColors.primary}
              dataPointsColor={themeColors.primary}
              yAxisThickness={0}
              xAxisThickness={0}
              hideRules
              noOfSections={4}
              yAxisTextStyle={{
                color: themeColors.textMuted,
                fontSize: 10,
              }}
              xAxisLabelTextStyle={{
                color: themeColors.textMuted,
                fontSize: 10,
              }}
              dataPointsHeight={6}
              dataPointsWidth={6}
            />
          </View>
        ) : (
          <EmptyChartState message="Aún no hay balance suficiente para mostrar tendencia." />
        )}
      </AppCard>

      <AppCard style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.copy}>
            <AppText variant="subtitle">Top categorías de gasto</AppText>
            <AppText variant="muted">
              Categorías con mayor salida de dinero.
            </AppText>
          </View>
        </View>

        {hasCategoryData ? (
          <View style={styles.pieLayout}>
            <PieChart
              data={categoryPieData}
              donut
              radius={78}
              innerRadius={48}
              showText
              textColor={themeColors.text}
              textSize={11}
              centerLabelComponent={() => (
                <View style={styles.centerLabel}>
                  <AppText variant="caption">Top</AppText>
                  <AppText variant="body">Gastos</AppText>
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
                    <AppText variant="caption">{item.label}</AppText>
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
          <EmptyChartState message="No hay egresos por categoría para graficar." />
        )}
      </AppCard>

      <AppCard style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.copy}>
            <AppText variant="subtitle">Presupuesto usado</AppText>
            <AppText variant="muted">
              Avance del presupuesto mensual actual.
            </AppText>
          </View>
        </View>

        {budgetUsage ? (
          <View style={styles.budgetLayout}>
            <PieChart
              data={budgetPieData}
              donut
              radius={78}
              innerRadius={52}
              showText
              textColor={themeColors.text}
              textSize={12}
              centerLabelComponent={() => (
                <View style={styles.centerLabel}>
                  <AppText variant="caption">Usado</AppText>
                  <AppText variant="body">
                    {budgetUsage.totalPercentageUsed.toFixed(0)}%
                  </AppText>
                </View>
              )}
            />

            <View style={styles.budgetCopy}>
              <AppText variant="body">
                {formatMoney({
                  amount: budgetUsage.totalSpent,
                  currencyCode: budgetUsage.budget.currency,
                })}{" "}
                gastados
              </AppText>

              <AppText variant="caption">
                Límite:{" "}
                {formatMoney({
                  amount: budgetUsage.budget.generalLimit,
                  currencyCode: budgetUsage.budget.currency,
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
              >
                {budgetUsage.totalStatus === "exceeded"
                  ? "Presupuesto superado"
                  : budgetUsage.totalStatus === "warning"
                    ? "Cerca del límite"
                    : "Dentro del presupuesto"}
              </AppText>
            </View>
          </View>
        ) : (
          <EmptyChartState message="Crea un presupuesto mensual para ver este gráfico." />
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
