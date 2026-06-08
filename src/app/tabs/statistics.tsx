import { useFocusEffect } from "expo-router";
import { SlidersHorizontal } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  InteractionManager,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  CopilotProvider,
  CopilotStep,
  useCopilot,
  walkthroughable,
} from "react-native-copilot";

import { Screen } from "@/components/layout/Screen";
import {
  AppTourStepNumber,
  AppTourTooltip,
} from "@/components/tour/AppTourTooltip";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { getCategoryById } from "@/constants/categories";
import { colors } from "@/constants/colors";
import { FinancialChartsPanel } from "@/features/reports/components/FinancialChartsPanel";
import { ReportFilterModal } from "@/features/reports/components/ReportFilterModal";
import { getCurrentBudgetPeriod } from "@/services/budget.service";
import { formatMoney } from "@/services/money.service";
import { buildReport } from "@/services/report.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useBudgetStore } from "@/store/useBudgetStore";
import { useMovementStore } from "@/store/useMovementStore";
import { useReportFilterStore } from "@/store/useReportFilterStore";
import { useTransferStore } from "@/store/useTransferStore";

const CopilotView = walkthroughable(View);

type TourStepChangePayload = {
  name?: string;
};

const tourStepIndexes: Record<string, number> = {
  "statistics-summary": 1,
  "statistics-charts-panel": 2,
  "statistics-expenses-by-category": 3,
  "statistics-account-summary": 4,
};

function StatisticsTourProvider({ children }: { children: React.ReactNode }) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <CopilotProvider
      overlay="svg"
      animated
      verticalOffset={0}
      tooltipComponent={AppTourTooltip}
      stepNumberComponent={AppTourStepNumber}
      tooltipStyle={{
        width: 300,
        maxWidth: 300,
        backgroundColor: "transparent",
        borderRadius: 0,
        padding: 0,
        margin: 0,
        elevation: 0,
        shadowOpacity: 0,
      }}
      arrowColor={themeColors.card}
      backdropColor="rgba(0, 0, 0, 0.55)"
      labels={{
        previous: "Atrás",
        next: "Siguiente",
        skip: "Omitir",
        finish: "Finalizar",
      }}
    >
      {children}
    </CopilotProvider>
  );
}

export default function StatisticsScreen() {
  return (
    <StatisticsTourProvider>
      <StatisticsScreenContent />
    </StatisticsTourProvider>
  );
}

function StatisticsScreenContent() {
  const { t } = useTranslation();

  const { start, goToNth, currentStep } = useCopilot() as unknown as {
    start: () => void;
    goToNth: (stepNumber: number) => void;
    currentStep?: TourStepChangePayload;
  };

  const hasStartedTourRef = useRef(false);
  const scrollRef = useRef<ScrollView>(null);
  const tourOffsetsRef = useRef<Record<string, number>>({});
  const refreshedStepsRef = useRef<Record<string, boolean>>({});

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const mainCurrency = useAppSettingsStore((state) => state.mainCurrency);

  const hasSeenStatisticsTour = useAppSettingsStore((state) =>
    state.hasSeenGuide("statistics_tour"),
  );
  const markGuideAsSeen = useAppSettingsStore((state) => state.markGuideAsSeen);

  const accounts = useAccountStore((state) => state.accounts);
  const movements = useMovementStore((state) => state.movements);
  const transfers = useTransferStore((state) => state.transfers);
  const budgets = useBudgetStore((state) => state.budgets);

  const filters = useReportFilterStore((state) => state.filters);

  const currentPeriod = getCurrentBudgetPeriod();

  const currentBudget = budgets.find(
    (budget) =>
      budget.year === currentPeriod.year &&
      budget.month === currentPeriod.month,
  );

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

  const registerTourSection = useCallback((stepName: string) => {
    return {
      onLayout: (event: LayoutChangeEvent) => {
        tourOffsetsRef.current[stepName] = event.nativeEvent.layout.y;
      },
    };
  }, []);

  const scrollToTourStep = useCallback((stepName?: string) => {
    if (!stepName) {
      return;
    }

    const sectionY = tourOffsetsRef.current[stepName];

    // console.log("TOUR SCROLL:", stepName, sectionY);

    if (typeof sectionY !== "number") {
      return;
    }

    const targetY = Math.max(sectionY - 110, 0);

    scrollRef.current?.scrollTo({
      y: targetY,
      animated: true,
    });
  }, []);

  useEffect(() => {
    if (!hasSeenStatisticsTour) {
      hasStartedTourRef.current = false;
      refreshedStepsRef.current = {};
    }
  }, [hasSeenStatisticsTour]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      let startTimeout: ReturnType<typeof setTimeout> | undefined;

      if (hasSeenStatisticsTour || hasStartedTourRef.current) {
        return () => {
          isActive = false;
        };
      }

      const interactionTask = InteractionManager.runAfterInteractions(() => {
        startTimeout = setTimeout(() => {
          if (!isActive || hasStartedTourRef.current || hasSeenStatisticsTour) {
            return;
          }

          hasStartedTourRef.current = true;
          scrollToTourStep("statistics-summary");

          requestAnimationFrame(() => {
            if (!isActive) {
              return;
            }

            start();
          });
        }, 1400);
      });

      return () => {
        isActive = false;

        if (startTimeout) {
          clearTimeout(startTimeout);
        }

        interactionTask.cancel();
      };
    }, [hasSeenStatisticsTour, markGuideAsSeen, scrollToTourStep, start]),
  );

  useEffect(() => {
    const stepName = currentStep?.name;

    if (!stepName || !hasStartedTourRef.current) {
      return undefined;
    }

    scrollToTourStep(stepName);

    const stepIndex = tourStepIndexes[stepName];

    if (!stepIndex || refreshedStepsRef.current[stepName]) {
      return undefined;
    }

    refreshedStepsRef.current[stepName] = true;

    const refreshTimeout = setTimeout(() => {
      goToNth(stepIndex);
    }, 650);

    return () => {
      clearTimeout(refreshTimeout);
    };
  }, [currentStep?.name, goToNth, scrollToTourStep]);

  return (
    <Screen scrollRef={scrollRef} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerCopy}>
            <AppText variant="title" i18nKey="statistics.title" />

            <AppText variant="muted" i18nKey="statistics.description" />
          </View>

          <Pressable
            onPress={() => setIsFilterModalOpen(true)}
            style={({ pressed }) => [
              styles.filterIconButton,
              {
                backgroundColor: themeColors.cardSoft,
                borderColor: themeColors.border,
                opacity: pressed ? 0.75 : 1,
              },
            ]}
          >
            <SlidersHorizontal size={20} color={themeColors.text} />
          </Pressable>
        </View>
      </View>

      <ReportFilterModal
        visible={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />

      {!hasReportData ? (
        <AppCard style={styles.card}>
          <AppText
            variant="subtitle"
            i18nKey="statistics.empty.noFilterDataTitle"
          />

          <AppText
            variant="muted"
            i18nKey="statistics.empty.noFilterDataDescription"
          />
        </AppCard>
      ) : null}

      <View {...registerTourSection("statistics-summary")}>
        <CopilotStep
          text={t("guides.statisticsTour.summary")}
          order={1}
          name="statistics-summary"
        >
          <CopilotView>
            <View style={styles.summaryGroup}>
              <View style={styles.grid}>
                <AppCard style={styles.card}>
                  <AppText
                    variant="caption"
                    i18nKey="statistics.cards.income"
                  />

                  <AppText style={{ color: themeColors.income }}>
                    {formatMoney({
                      amount: report.summary.totalIncome,
                      currencyCode: report.summary.currency,
                    })}
                  </AppText>
                </AppCard>

                <AppCard style={styles.card}>
                  <AppText
                    variant="caption"
                    i18nKey="statistics.cards.expenses"
                  />

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
                  <AppText
                    variant="caption"
                    i18nKey="statistics.cards.transfers"
                  />

                  <AppText>{report.summary.transferCount}</AppText>
                </AppCard>

                <AppCard style={styles.card}>
                  <AppText
                    variant="caption"
                    i18nKey="statistics.cards.commissions"
                  />

                  <AppText style={{ color: themeColors.warning }}>
                    {formatMoney({
                      amount: report.summary.transferFees,
                      currencyCode: report.summary.currency,
                    })}
                  </AppText>
                </AppCard>
              </View>

              <AppCard style={styles.card}>
                <AppText
                  variant="caption"
                  i18nKey="statistics.cards.periodBalance"
                />

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
            </View>
          </CopilotView>
        </CopilotStep>
      </View>

      <View {...registerTourSection("statistics-charts-panel")}>
        <CopilotStep
          text={t("guides.statisticsTour.chartsPanel")}
          order={2}
          name="statistics-charts-panel"
        >
          <CopilotView>
            <View
              style={[
                styles.tourCompactTarget,
                {
                  backgroundColor: themeColors.card,
                  borderColor: themeColors.border,
                },
              ]}
            >
              <AppText
                variant="caption"
                i18nKey="statistics.charts.incomeVsExpense"
              />
            </View>
          </CopilotView>
        </CopilotStep>
      </View>

      <FinancialChartsPanel
        movements={movements}
        currency={report.summary.currency}
        currentBudget={currentBudget}
      />

      <View {...registerTourSection("statistics-expenses-by-category")}>
        <CopilotStep
          text={t("guides.statisticsTour.expensesByCategory")}
          order={3}
          name="statistics-expenses-by-category"
        >
          <CopilotView>
            <AppCard style={styles.card}>
              <AppText
                variant="subtitle"
                i18nKey="statistics.charts.expensesByCategory"
              />

              {report.expensesByCategory.length > 0 ? (
                <View style={styles.categoryList}>
                  {report.expensesByCategory.map((item) => {
                    const category = getCategoryById(item.categoryId);

                    return (
                      <View key={item.categoryId} style={styles.categoryRow}>
                        <View style={styles.categoryCopy}>
                          <View style={styles.categoryText}>
                            <AppText>
                              {category?.name ??
                                t("statistics.labels.noCategory")}
                            </AppText>

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
                <AppText
                  variant="muted"
                  style={styles.emptyText}
                  i18nKey="statistics.empty.noExpensesForFilters"
                />
              )}
            </AppCard>
          </CopilotView>
        </CopilotStep>
      </View>

      <View {...registerTourSection("statistics-account-summary")}>
        <CopilotStep
          text={t("guides.statisticsTour.accountSummary")}
          order={4}
          name="statistics-account-summary"
        >
          <CopilotView>
            <AppCard style={styles.card}>
              <AppText
                variant="subtitle"
                i18nKey="statistics.charts.accountSummary"
              />

              <View style={styles.accountList}>
                {report.accountsSummary
                  .filter(
                    (item) =>
                      item.income !== 0 ||
                      item.expense !== 0 ||
                      item.balance !== 0,
                  )
                  .map((item) => {
                    const account = accounts.find(
                      (currentAccount) => currentAccount.id === item.accountId,
                    );

                    return (
                      <View key={item.accountId} style={styles.accountRow}>
                        <View style={styles.accountCopy}>
                          <AppText>
                            {account?.name ??
                              t("movements.card.deletedAccount")}
                          </AppText>

                          <AppText
                            variant="caption"
                            i18nKey="statistics.labels.balanceAmount"
                            i18nValues={{
                              amount: formatMoney({
                                amount: item.balance,
                                currencyCode: report.summary.currency,
                              }),
                            }}
                          />
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
          </CopilotView>
        </CopilotStep>
      </View>
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

  tourCompactTarget: {
    minHeight: 54,
    borderWidth: 1,
    borderRadius: 18,
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 14,
  },

  headerCopy: {
    flex: 1,
    gap: 8,
  },

  filterIconButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  summaryGroup: {
    gap: 12,
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
