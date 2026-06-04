import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

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

export default function HomeScreen() {
  const mainCurrency = useAppSettingsStore((state) => state.mainCurrency);

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

  return (
    <Screen style={styles.screen}>
      <HomeHero totalBalance={totalBalance} currency={mainCurrency} />

      <HomeAccountsCarousel accounts={activeAccounts} />

      <HomeMonthlySummaryCard
        currency={mainCurrency}
        income={monthlySummary.income}
        expense={monthlySummary.expense}
        balance={monthlySummary.balance}
      />

      <View style={styles.section}>
        <HomeRecentActivity items={latestItems} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: 24,
  },

  section: {
    gap: 12,
  },
});
