import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  InteractionManager,
  LayoutChangeEvent,
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
import { colors } from "@/constants/colors";
import { getVisibleAccounts } from "@/features/accounts/services/account-filter.service";
import { sortAccountsByImportance } from "@/features/accounts/services/account-order.service";
import { HomeAccountsCarousel } from "@/features/home/components/HomeAccountsCarousel";
import { HomeHero } from "@/features/home/components/HomeHero";
import { HomeMonthlySummaryCard } from "@/features/home/components/HomeMonthlySummaryCard";
import { HomeRecentActivity } from "@/features/home/components/HomeRecentActivity";
import {
  calculateMonthlySummary,
  calculateTotalBalance,
} from "@/features/home/services/home-dashboard.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useMovementStore } from "@/store/useMovementStore";
import { useTransferStore } from "@/store/useTransferStore";

const CopilotView = walkthroughable(View);

type TourStepChangePayload = {
  name?: string;
};

const homeTourStepIndexes: Record<string, number> = {
  "home-total-balance": 1,
  "home-accounts-carousel": 2,
  "home-monthly-summary": 3,
  "home-recent-activity": 4,
};

function HomeTourProvider({ children }: { children: React.ReactNode }) {
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

export default function HomeScreen() {
  return (
    <HomeTourProvider>
      <HomeScreenContent />
    </HomeTourProvider>
  );
}

function HomeScreenContent() {
  const { t } = useTranslation();

  const { start, goToNth, currentStep } = useCopilot() as unknown as {
    start: () => void;
    goToNth: (stepNumber: number) => void;
    currentStep?: TourStepChangePayload;
  };

  const hasStartedTourRef = useRef(false);
  const scrollRef = useRef<ScrollView>(null);
  const tourOffsetsRef = useRef<Record<string, number>>({});
  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const TOUR_INITIAL_MEASURE_DELAY_MS = 260;
  const TOUR_STEP_REMEASURE_DELAY_MS = 120;

  const [isTourPreviewMode, setIsTourPreviewMode] = useState(false);

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const mainCurrency = useAppSettingsStore((state) => state.mainCurrency);

  const hasSeenHomeTour = useAppSettingsStore((state) =>
    state.hasSeenGuide("home_tour"),
  );

  const accounts = useAccountStore((state) => state.accounts);
  const movements = useMovementStore((state) => state.movements);
  const transfers = useTransferStore((state) => state.transfers);

  const now = useMemo(() => new Date().toISOString(), []);

  const activeAccounts = useMemo(
    () => sortAccountsByImportance(getVisibleAccounts(accounts)),
    [accounts],
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
      const baseAccount = activeAccounts[0] ?? accounts[0];
      const baseAccountRecord = (baseAccount ?? {}) as Record<string, unknown>;

      return {
        ...baseAccountRecord,
        id,
        name,
        type: baseAccountRecord.type ?? "cash",
        balances: {
          ...((baseAccountRecord.balances as Record<string, number>) ?? {}),
          [mainCurrency]: amount,
        },
        defaultCurrency: baseAccountRecord.defaultCurrency ?? mainCurrency,
        currencyCode: baseAccountRecord.currencyCode ?? mainCurrency,
        mainCurrency: baseAccountRecord.mainCurrency ?? mainCurrency,
        color,
        icon: baseAccountRecord.icon ?? icon,
        createdAt: baseAccountRecord.createdAt ?? now,
        updatedAt: now,
      };
    },
    [accounts, activeAccounts, mainCurrency, now],
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
          amount: 680,
          color: themeColors.accent,
          icon: "piggy-bank",
        }),
        createTourAccount({
          id: "tour-account-card",
          name: "Tarjeta",
          amount: -120,
          color: themeColors.warning,
          icon: "credit-card",
        }),
      ] as unknown as typeof activeAccounts,
    [
      createTourAccount,
      themeColors.accent,
      themeColors.primary,
      themeColors.warning,
    ],
  );

  const tourPreviewMovements = useMemo(
    () =>
      [
        {
          id: "tour-movement-salary",
          kind: "income",
          status: "confirmed",
          tagIds: [],
          amount: 1200,
          currency: mainCurrency,
          accountId: "tour-account-main",
          categoryId: "salary",
          date: now,
          note: "",
          createdAt: now,
          updatedAt: now,
        },
        {
          id: "tour-movement-food",
          kind: "expense",
          status: "confirmed",
          tagIds: [],
          amount: 45,
          currency: mainCurrency,
          accountId: "tour-account-main",
          categoryId: "food",
          date: now,
          note: "",
          createdAt: now,
          updatedAt: now,
        },
        {
          id: "tour-movement-transport",
          kind: "expense",
          status: "confirmed",
          tagIds: [],
          amount: 18,
          currency: mainCurrency,
          accountId: "tour-account-main",
          categoryId: "transport",
          date: now,
          note: "",
          createdAt: now,
          updatedAt: now,
        },
        {
          id: "tour-movement-home",
          kind: "expense",
          status: "confirmed",
          tagIds: [],
          amount: 120,
          currency: mainCurrency,
          accountId: "tour-account-savings",
          categoryId: "home",
          date: now,
          note: "",
          createdAt: now,
          updatedAt: now,
        },
      ] as unknown as typeof movements,
    [mainCurrency, now],
  );

  const displayAccounts = isTourPreviewMode
    ? tourPreviewAccounts
    : activeAccounts;

  const displayMovements = isTourPreviewMode ? tourPreviewMovements : movements;

  const displayTransfers = isTourPreviewMode ? [] : transfers;

  const displayTotalBalance = useMemo(
    () => calculateTotalBalance(displayAccounts, mainCurrency),
    [displayAccounts, mainCurrency],
  );

  const displayMonthlySummary = useMemo(
    () =>
      calculateMonthlySummary({
        movements: displayMovements,
        currency: mainCurrency,
      }),
    [displayMovements, mainCurrency],
  );

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
    if (hasSeenHomeTour) {
      setIsTourPreviewMode(false);
      return;
    }

    hasStartedTourRef.current = false;
  }, [hasSeenHomeTour]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      let startTimeout: ReturnType<typeof setTimeout> | undefined;

      if (hasSeenHomeTour || hasStartedTourRef.current) {
        return () => {
          isActive = false;
          clearRefreshTimeout();
        };
      }

      const interactionTask = InteractionManager.runAfterInteractions(() => {
        startTimeout = setTimeout(() => {
          if (!isActive || hasStartedTourRef.current || hasSeenHomeTour) {
            return;
          }

          hasStartedTourRef.current = true;
          setIsTourPreviewMode(true);
          scrollToTourStep("home-total-balance");

          refreshTimeoutRef.current = setTimeout(() => {
            if (!isActive) {
              return;
            }

            start();
          }, TOUR_INITIAL_MEASURE_DELAY_MS);
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
    }, [clearRefreshTimeout, hasSeenHomeTour, scrollToTourStep, start]),
  );

  useEffect(() => {
    const stepName = currentStep?.name;

    if (!stepName || !hasStartedTourRef.current) {
      return undefined;
    }

    const stepIndex = homeTourStepIndexes[stepName];

    if (!stepIndex) {
      return undefined;
    }

    clearRefreshTimeout();

    scrollToTourStep(stepName);

    refreshTimeoutRef.current = setTimeout(() => {
      goToNth(stepIndex);
    }, TOUR_STEP_REMEASURE_DELAY_MS);

    return () => {
      clearRefreshTimeout();
    };
  }, [clearRefreshTimeout, currentStep?.name, goToNth, scrollToTourStep]);

  return (
    <Screen scrollRef={scrollRef} style={styles.screen}>
      <View {...registerTourSection("home-total-balance")}>
        <CopilotStep
          text={t("guides.homeTour.totalBalance")}
          order={1}
          name="home-total-balance"
        >
          <CopilotView>
            <HomeHero
              totalBalance={displayTotalBalance}
              currency={mainCurrency}
            />
          </CopilotView>
        </CopilotStep>
      </View>

      <View {...registerTourSection("home-accounts-carousel")}>
        <CopilotStep
          text={t("guides.homeTour.accounts")}
          order={2}
          name="home-accounts-carousel"
        >
          <CopilotView>
            <HomeAccountsCarousel accounts={displayAccounts} />
          </CopilotView>
        </CopilotStep>
      </View>

      <View {...registerTourSection("home-monthly-summary")}>
        <CopilotStep
          text={t("guides.homeTour.monthlySummary")}
          order={3}
          name="home-monthly-summary"
        >
          <CopilotView>
            <HomeMonthlySummaryCard
              currency={mainCurrency}
              income={displayMonthlySummary.income}
              expense={displayMonthlySummary.expense}
              balance={displayMonthlySummary.balance}
            />
          </CopilotView>
        </CopilotStep>
      </View>

      <View {...registerTourSection("home-recent-activity")}>
        <CopilotStep
          text={t("guides.homeTour.recentActivity")}
          order={4}
          name="home-recent-activity"
        >
          <CopilotView>
            <View style={styles.section}>
              <HomeRecentActivity
                movements={displayMovements}
                transfers={displayTransfers}
                limit={4}
              />
            </View>
          </CopilotView>
        </CopilotStep>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
    gap: 24,
  },

  section: {
    gap: 12,
  },
});
