import { router } from "expo-router";
import { CircleDollarSign, PiggyBank, Repeat } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { routes } from "@/constants/routes";
import { formatMoney } from "@/services/money.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { CurrencyCode } from "@/types/finance.types";

import { HomeQuickAction } from "./HomeQuickAction";

type HomeHeroProps = {
  totalBalance: number;
  currency: CurrencyCode;
};

export function HomeHero({ totalBalance, currency }: HomeHeroProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <View style={styles.hero}>
      <View style={styles.balanceSection}>
        <AppText
          variant="caption"
          style={styles.balanceLabel}
          i18nKey="home.totalEstimatedBalance"
        />

        <AppText style={styles.balanceAmount} numberOfLines={1}>
          {formatMoney({
            amount: totalBalance,
            currencyCode: currency,
          })}
        </AppText>
      </View>

      <View style={styles.quickActions}>
        <HomeQuickAction
          labelI18nKey="tabs.budgets"
          icon={<PiggyBank size={20} color={themeColors.textMuted} />}
          backgroundColor={themeColors.cardSoft}
          borderColor={themeColors.border}
          textColor={themeColors.text}
          onPress={() => router.push(routes.tabs.budgets as never)}
        />

        <HomeQuickAction
          labelI18nKey="tabs.movements"
          icon={<CircleDollarSign size={20} color="#FFFFFF" />}
          backgroundColor={themeColors.primary}
          borderColor={themeColors.primary}
          textColor={themeColors.primary}
          isHighlighted
          onPress={() => router.push(routes.tabs.movements as never)}
        />

        <HomeQuickAction
          labelI18nKey="common.transfers"
          icon={<Repeat size={20} color={themeColors.textMuted} />}
          backgroundColor={themeColors.cardSoft}
          borderColor={themeColors.border}
          textColor={themeColors.text}
          onPress={() => router.push(routes.tabs.movements as never)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 260,
    paddingTop: 16,
    paddingHorizontal: 4,
    paddingBottom: 0,
    justifyContent: "space-between",
  },

  balanceSection: {
    minHeight: 164,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    paddingTop: 18,
    paddingBottom: 50,
  },

  balanceLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    textTransform: "capitalize",
  },

  balanceAmount: {
    fontSize: 50,
    lineHeight: 56,
    fontWeight: "900",
    letterSpacing: -1.4,
    maxWidth: "100%",
    textAlign: "center",
  },

  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingTop: 14,
  },
});
