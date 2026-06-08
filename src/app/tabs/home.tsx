import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { InteractionManager, StyleSheet, View } from "react-native";
import {
  CopilotProvider,
  CopilotStep,
  useCopilot,
  walkthroughable,
} from "react-native-copilot";

import { Screen } from "@/components/layout/Screen";
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

export default function HomeScreen() {
  return (
    <CopilotProvider
      overlay="svg"
      animated
      verticalOffset={0}
      labels={{
        previous: "Atrás",
        next: "Siguiente",
        skip: "Omitir",
        finish: "Finalizar",
      }}
    >
      <HomeScreenContent />
    </CopilotProvider>
  );
}

function HomeScreenContent() {
  const { t } = useTranslation();
  const { start } = useCopilot();

  const hasStartedTourRef = useRef(false);

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

  useEffect(() => {
    if (!hasSeenHomeTour) {
      hasStartedTourRef.current = false;
    }
  }, [hasSeenHomeTour]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      let timeout: ReturnType<typeof setTimeout> | undefined;

      if (hasSeenHomeTour || hasStartedTourRef.current) {
        return () => {
          isActive = false;
        };
      }

      const interactionTask = InteractionManager.runAfterInteractions(() => {
        timeout = setTimeout(() => {
          if (!isActive || hasStartedTourRef.current || hasSeenHomeTour) {
            return;
          }

          hasStartedTourRef.current = true;
          markGuideAsSeen("home_tour");
          start();
        }, 900);
      });

      return () => {
        isActive = false;

        if (timeout) {
          clearTimeout(timeout);
        }

        interactionTask.cancel();
      };
    }, [hasSeenHomeTour, markGuideAsSeen, start]),
  );

  return (
    <Screen style={styles.screen}>
      <CopilotStep
        text={t("guides.homeTour.totalBalance")}
        order={1}
        name="home-total-balance"
      >
        <CopilotView>
          <HomeHero totalBalance={totalBalance} currency={mainCurrency} />
        </CopilotView>
      </CopilotStep>

      <CopilotStep
        text={t("guides.homeTour.accounts")}
        order={2}
        name="home-accounts-carousel"
      >
        <CopilotView>
          <HomeAccountsCarousel accounts={activeAccounts} />
        </CopilotView>
      </CopilotStep>

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
