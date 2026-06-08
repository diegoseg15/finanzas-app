import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useRef } from "react";
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
  buildLatestActivityItems,
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
  const refreshedStepsRef = useRef<Record<string, boolean>>({});

  const mainCurrency = useAppSettingsStore((state) => state.mainCurrency);

  const hasSeenHomeTour = useAppSettingsStore((state) =>
    state.hasSeenGuide("home_tour"),
  );
  const markGuideAsSeen = useAppSettingsStore((state) => state.markGuideAsSeen);

  const accounts = useAccountStore((state) => state.accounts);
  const movements = useMovementStore((state) => state.movements);
  const transfers = useTransferStore((state) => state.transfers);

  const activeAccounts = useMemo(
    () => sortAccountsByImportance(getVisibleAccounts(accounts)),
    [accounts],
  );

  const totalBalance = useMemo(
    () => calculateTotalBalance(activeAccounts, mainCurrency),
    [activeAccounts, mainCurrency],
  );

  const monthlySummary = useMemo(
    () =>
      calculateMonthlySummary({
        movements,
        currency: mainCurrency,
      }),
    [movements, mainCurrency],
  );

  const latestItems = useMemo(
    () =>
      buildLatestActivityItems({
        movements,
        transfers,
        limit: 4,
      }),
    [movements, transfers],
  );

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
    if (!hasSeenHomeTour) {
      hasStartedTourRef.current = false;
      refreshedStepsRef.current = {};
    }
  }, [hasSeenHomeTour]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      let startTimeout: ReturnType<typeof setTimeout> | undefined;
      let markSeenTimeout: ReturnType<typeof setTimeout> | undefined;

      if (hasSeenHomeTour || hasStartedTourRef.current) {
        return () => {
          isActive = false;
        };
      }

      const interactionTask = InteractionManager.runAfterInteractions(() => {
        startTimeout = setTimeout(() => {
          if (!isActive || hasStartedTourRef.current || hasSeenHomeTour) {
            return;
          }

          hasStartedTourRef.current = true;
          scrollToTourStep("home-total-balance");

          requestAnimationFrame(() => {
            if (!isActive) {
              return;
            }

            start();

            markSeenTimeout = setTimeout(() => {
              if (isActive) {
                markGuideAsSeen("home_tour");
              }
            }, 1000);
          });
        }, 1400);
      });

      return () => {
        isActive = false;

        if (startTimeout) {
          clearTimeout(startTimeout);
        }

        if (markSeenTimeout) {
          clearTimeout(markSeenTimeout);
        }

        interactionTask.cancel();
      };
    }, [hasSeenHomeTour, markGuideAsSeen, scrollToTourStep, start]),
  );

  useEffect(() => {
    const stepName = currentStep?.name;

    if (!stepName || !hasStartedTourRef.current) {
      return undefined;
    }

    scrollToTourStep(stepName);

    const stepIndex = homeTourStepIndexes[stepName];

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
    <Screen scrollRef={scrollRef} style={styles.screen}>
      <View {...registerTourSection("home-total-balance")}>
        <CopilotStep
          text={t("guides.homeTour.totalBalance")}
          order={1}
          name="home-total-balance"
        >
          <CopilotView>
            <HomeHero totalBalance={totalBalance} currency={mainCurrency} />
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
            <HomeAccountsCarousel accounts={activeAccounts} />
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
              income={monthlySummary.income}
              expense={monthlySummary.expense}
              balance={monthlySummary.balance}
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
              <HomeRecentActivity items={latestItems} />
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
