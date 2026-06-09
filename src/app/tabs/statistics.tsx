import { useFocusEffect } from "expo-router";
import { SlidersHorizontal } from "lucide-react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isTourPreviewMode, setIsTourPreviewMode] = useState(false);

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const mainCurrency = useAppSettingsStore((state) => state.mainCurrency);

  const hasSeenStatisticsTour = useAppSettingsStore((state) =>
    state.hasSeenGuide("statistics_tour"),
  );

  const accounts = useAccountStore((state) => state.accounts);
  const movements = useMovementStore((state) => state.movements);
  const transfers = useTransferStore((state) => state.transfers);
  const budgets = useBudgetStore((state) => state.budgets);

  const filters = useReportFilterStore((state) => state.filters);

  type AccountItem = (typeof accounts)[number];
  type MovementItem = (typeof movements)[number];

  const now = useMemo(() => new Date().toISOString(), []);

  const currentPeriod = getCurrentBudgetPeriod();

  const currentBudget = budgets.find(
    (budget) =>
      budget.year === currentPeriod.year &&
      budget.month === currentPeriod.month,
  );

  const realReport = useMemo(
    () =>
      buildReport({
        accounts,
        movements,
        transfers,
        filters: {
          ...filters,
          currency:
            filters.currency === "all" ? mainCurrency : filters.currency,
        },
      }),
    [accounts, filters, mainCurrency, movements, transfers],
  );

  const createTourAccount = useCallback(
    ({
      id,
      name,
      amount,
      color,
      icon,
    }: {
      id: string;
      name: string;
      amount: number;
      color: string;
      icon: string;
    }) => {
      const baseAccount = accounts[0];

      const baseAccountRecord = baseAccount as unknown as
        | (Record<string, unknown> & {
            type?: string;
            icon?: string;
            createdAt?: string;
          })
        | undefined;

      return {
        ...(baseAccountRecord ?? {}),
        id,
        name,
        type: baseAccountRecord?.type ?? "cash",
        balances: [
          {
            currency: mainCurrency,
            currencyCode: mainCurrency,
            amount,
            balance: amount,
          },
        ],
        defaultCurrency: mainCurrency,
        currencyCode: mainCurrency,
        mainCurrency,
        color,
        icon: baseAccountRecord?.icon ?? icon,
        createdAt: baseAccountRecord?.createdAt ?? now,
        updatedAt: now,
      } as unknown as AccountItem;
    },
    [accounts, mainCurrency, now],
  );

  const tourPreviewAccounts = useMemo(
    () =>
      [
        createTourAccount({
          id: "tour-account-main",
          name: "Cuenta principal",
          amount: 1240,
          color: themeColors.primary,
          icon: "wallet",
        }),
        createTourAccount({
          id: "tour-account-savings",
          name: "Ahorros",
          amount: 650,
          color: themeColors.accent,
          icon: "piggy-bank",
        }),
      ] as AccountItem[],
    [createTourAccount, themeColors.accent, themeColors.primary],
  );

  const createTourMovement = useCallback(
    ({
      id,
      type,
      amount,
      categoryId,
      accountId,
      title,
    }: {
      id: string;
      type: "income" | "expense";
      amount: number;
      categoryId: string;
      accountId: string;
      title: string;
    }) => {
      const baseMovement = movements[0];

      const baseMovementRecord = baseMovement as
        | Record<string, unknown>
        | undefined;

      return {
        ...(baseMovementRecord ?? {}),
        id,
        type,
        title,
        amount,
        currency: mainCurrency,
        currencyCode: mainCurrency,
        accountId,
        categoryId,
        date: now,
        note: "",
        createdAt: now,
        updatedAt: now,
      } as unknown as MovementItem;
    },
    [mainCurrency, movements, now],
  );

  const tourPreviewMovements = useMemo(
    () =>
      [
        createTourMovement({
          id: "tour-movement-income",
          type: "income",
          title: "Salario",
          amount: 1850,
          categoryId: "salary",
          accountId: "tour-account-main",
        }),
        createTourMovement({
          id: "tour-movement-food",
          type: "expense",
          title: "Comida",
          amount: 320,
          categoryId: "food",
          accountId: "tour-account-main",
        }),
        createTourMovement({
          id: "tour-movement-transport",
          type: "expense",
          title: "Transporte",
          amount: 210,
          categoryId: "transport",
          accountId: "tour-account-main",
        }),
        createTourMovement({
          id: "tour-movement-home",
          type: "expense",
          title: "Hogar",
          amount: 400,
          categoryId: "home",
          accountId: "tour-account-savings",
        }),
      ] as MovementItem[],
    [createTourMovement],
  );

  const tourPreviewReport = useMemo(
    () =>
      ({
        ...realReport,
        movements: tourPreviewMovements,
        transfers: [],
        summary: {
          ...realReport.summary,
          currency: mainCurrency,
          totalIncome: 1850,
          totalExpense: 930,
          transferCount: 2,
          transferFees: 4.5,
          balance: 920,
        },
        expensesByCategory: [
          {
            categoryId: "food",
            amount: 320,
            percentage: 34.4,
          },
          {
            categoryId: "transport",
            amount: 210,
            percentage: 22.6,
          },
          {
            categoryId: "home",
            amount: 400,
            percentage: 43,
          },
        ],
        accountsSummary: [
          {
            accountId: "tour-account-main",
            income: 1200,
            expense: 530,
            balance: 670,
          },
          {
            accountId: "tour-account-savings",
            income: 650,
            expense: 400,
            balance: 250,
          },
        ],
      }) as typeof realReport,
    [mainCurrency, realReport, tourPreviewMovements],
  );

  const tourPreviewChartData = useMemo(
    () => ({
      monthlyData: [
        {
          key: "2026-01",
          label: "ene",
          year: 2026,
          month: 1,
          income: 0,
          expense: 0,
          balance: 120,
          currency: mainCurrency,
        },
        {
          key: "2026-02",
          label: "feb",
          year: 2026,
          month: 2,
          income: 0,
          expense: 0,
          balance: 180,
          currency: mainCurrency,
        },
        {
          key: "2026-03",
          label: "mar",
          year: 2026,
          month: 3,
          income: 0,
          expense: 0,
          balance: 260,
          currency: mainCurrency,
        },
        {
          key: "2026-04",
          label: "abr",
          year: 2026,
          month: 4,
          income: 1200,
          expense: 520,
          balance: 680,
          currency: mainCurrency,
        },
        {
          key: "2026-05",
          label: "may",
          year: 2026,
          month: 5,
          income: 650,
          expense: 410,
          balance: 920,
          currency: mainCurrency,
        },
        {
          key: "2026-06",
          label: "jun",
          year: 2026,
          month: 6,
          income: 1850,
          expense: 930,
          balance: 1040,
          currency: mainCurrency,
        },
      ],
      balanceData: [
        {
          key: "2026-01",
          label: "ene",
          year: 2026,
          month: 1,
          balance: 120,
          currency: mainCurrency,
        },
        {
          key: "2026-02",
          label: "feb",
          year: 2026,
          month: 2,
          balance: 180,
          currency: mainCurrency,
        },
        {
          key: "2026-03",
          label: "mar",
          year: 2026,
          month: 3,
          balance: 260,
          currency: mainCurrency,
        },
        {
          key: "2026-04",
          label: "abr",
          year: 2026,
          month: 4,
          balance: 680,
          currency: mainCurrency,
        },
        {
          key: "2026-05",
          label: "may",
          year: 2026,
          month: 5,
          balance: 920,
          currency: mainCurrency,
        },
        {
          key: "2026-06",
          label: "jun",
          year: 2026,
          month: 6,
          balance: 1040,
          currency: mainCurrency,
        },
      ],
      topCategories: [
        {
          categoryId: "services",
          label: "Servicios",
          value: 400,
          color: "#F59E0B",
        },
        {
          categoryId: "food",
          label: "Comida",
          value: 320,
          color: "#22C55E",
        },
        {
          categoryId: "transport",
          label: "Transporte",
          value: 210,
          color: "#3B82F6",
        },
      ],
    }),
    [mainCurrency],
  );

  const displayReport = isTourPreviewMode ? tourPreviewReport : realReport;

  const reportAccounts = isTourPreviewMode ? tourPreviewAccounts : accounts;
  const reportMovements = isTourPreviewMode ? tourPreviewMovements : movements;

  const hasReportData =
    isTourPreviewMode ||
    displayReport.movements.length > 0 ||
    displayReport.transfers.length > 0;

  const registerTourSection = useCallback((stepName: string) => {
    return {
      onLayout: (event: LayoutChangeEvent) => {
        tourOffsetsRef.current[stepName] = event.nativeEvent.layout.y;
      },
    };
  }, []);

  const clearRefreshTimeout = useCallback(() => {
    if (!refreshTimeoutRef.current) {
      return;
    }

    clearTimeout(refreshTimeoutRef.current);
    refreshTimeoutRef.current = null;
  }, []);

  const scrollToTourStep = useCallback((stepName?: string) => {
    if (!stepName) {
      return;
    }

    const sectionY = tourOffsetsRef.current[stepName];

    if (typeof sectionY !== "number") {
      return;
    }

    const targetY = Math.max(sectionY - 80, 0);

    scrollRef.current?.scrollTo({
      y: targetY,
      animated: false,
    });
  }, []);

  useEffect(() => {
    if (hasSeenStatisticsTour) {
      setIsTourPreviewMode(false);
      return;
    }

    hasStartedTourRef.current = false;
    refreshedStepsRef.current = {};
  }, [hasSeenStatisticsTour]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      let startTimeout: ReturnType<typeof setTimeout> | undefined;

      if (hasSeenStatisticsTour || hasStartedTourRef.current) {
        return () => {
          isActive = false;
          clearRefreshTimeout();
        };
      }

      const interactionTask = InteractionManager.runAfterInteractions(() => {
        startTimeout = setTimeout(() => {
          if (!isActive || hasStartedTourRef.current || hasSeenStatisticsTour) {
            return;
          }

          hasStartedTourRef.current = true;
          setIsTourPreviewMode(true);
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

        clearRefreshTimeout();
        interactionTask.cancel();
      };
    }, [clearRefreshTimeout, hasSeenStatisticsTour, scrollToTourStep, start]),
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

    clearRefreshTimeout();

    refreshTimeoutRef.current = setTimeout(() => {
      goToNth(stepIndex);
    }, 900);

    return () => {
      clearRefreshTimeout();
    };
  }, [clearRefreshTimeout, currentStep?.name, goToNth, scrollToTourStep]);

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
                      amount: displayReport.summary.totalIncome,
                      currencyCode: displayReport.summary.currency,
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
                      amount: displayReport.summary.totalExpense,
                      currencyCode: displayReport.summary.currency,
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

                  <AppText>{displayReport.summary.transferCount}</AppText>
                </AppCard>

                <AppCard style={styles.card}>
                  <AppText
                    variant="caption"
                    i18nKey="statistics.cards.commissions"
                  />

                  <AppText style={{ color: themeColors.warning }}>
                    {formatMoney({
                      amount: displayReport.summary.transferFees,
                      currencyCode: displayReport.summary.currency,
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
                      displayReport.summary.balance >= 0
                        ? themeColors.income
                        : themeColors.expense,
                  }}
                >
                  {formatMoney({
                    amount: displayReport.summary.balance,
                    currencyCode: displayReport.summary.currency,
                  })}
                </AppText>
              </AppCard>
            </View>
          </CopilotView>
        </CopilotStep>
      </View>

      <FinancialChartsPanel
        movements={reportMovements}
        currency={displayReport.summary.currency}
        currentBudget={currentBudget}
        previewData={isTourPreviewMode ? tourPreviewChartData : undefined}
        incomeExpenseWrapper={(children) => (
          <View {...registerTourSection("statistics-charts-panel")}>
            <CopilotStep
              text={t("guides.statisticsTour.chartsPanel")}
              order={2}
              name="statistics-charts-panel"
            >
              <CopilotView>{children}</CopilotView>
            </CopilotStep>
          </View>
        )}
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

              {displayReport.expensesByCategory.length > 0 ? (
                <View style={styles.categoryList}>
                  {displayReport.expensesByCategory.map((item) => {
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
                              currencyCode: displayReport.summary.currency,
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
                {displayReport.accountsSummary
                  .filter(
                    (item) =>
                      item.income !== 0 ||
                      item.expense !== 0 ||
                      item.balance !== 0,
                  )
                  .map((item) => {
                    const account = reportAccounts.find(
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
                                currencyCode: displayReport.summary.currency,
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
                              currencyCode: displayReport.summary.currency,
                            })}
                          </AppText>

                          <AppText
                            variant="caption"
                            style={{ color: themeColors.expense }}
                          >
                            -
                            {formatMoney({
                              amount: item.expense,
                              currencyCode: displayReport.summary.currency,
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
