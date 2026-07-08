import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { routes } from "@/constants/routes";
import { DebitAccountCard } from "@/features/accounts/components/DebitAccountCard";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { Account } from "@/types/finance.types";

import { AppButton } from "@/components/ui/AppButton";
import { HomeSectionHeader } from "./HomeSectionHeader";

type HomeAccountsCarouselProps = {
  accounts: Account[];
};

export function HomeAccountsCarousel({ accounts }: HomeAccountsCarouselProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <View style={styles.container}>
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
              onPress={() => router.push(`/accounts/${account.id}` as never)}
            />
          ))}
        </ScrollView>
      ) : (
        <AppCard style={styles.emptyCard}>
          <AppText variant="muted" i18nKey="accounts.emptyDescription" />

          <AppButton
            onPress={() => router.push(routes.tabs.accounts as never)}
            i18nKey="accounts.firstAccount"
          />
        </AppCard>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },

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
    gap: 12,
  },
});
