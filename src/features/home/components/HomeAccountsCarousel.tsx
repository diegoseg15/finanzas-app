import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { routes } from "@/constants/routes";
import { DebitAccountCard } from "@/features/accounts/components/DebitAccountCard";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { Account } from "@/types/finance.types";

import { HomeSectionHeader } from "./HomeSectionHeader";

type HomeAccountsCarouselProps = {
  accounts: Account[];
  hideBalances?: boolean;
};

export function HomeAccountsCarousel({
  accounts,
  hideBalances,
}: HomeAccountsCarouselProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <>
      <View style={styles.accountsSectionIntro}>
        <View
          style={[
            styles.sectionDivider,
            {
              backgroundColor: themeColors.border,
            },
          ]}
        />

        <HomeSectionHeader
          titleI18nKey="home.accounts"
          actionI18nKey="home.viewAll"
          onActionPress={() => router.push(routes.tabs.accounts as never)}
        />
      </View>

      {accounts.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.accountsList}
        >
          {accounts.slice(0, 5).map((account) => (
            <DebitAccountCard
              key={account.id}
              account={account}
              hideBalance={hideBalances}
              onPress={() => router.push(`/accounts/${account.id}` as never)}
            />
          ))}
        </ScrollView>
      ) : (
        <AppCard style={styles.emptyCard}>
          <AppText variant="muted" i18nKey="accounts.emptyDescription" />
        </AppCard>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  accountsSectionIntro: {
    gap: 14,
  },

  sectionDivider: {
    height: 1,
    opacity: 0.55,
    marginVertical: 5,
  },

  accountsList: {
    gap: 14,
    paddingRight: 20,
    paddingBottom: 4,
  },

  emptyCard: {
    gap: 8,
  },
});
