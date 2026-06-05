import { router } from "expo-router";
import { CircleDollarSign, HandCoins, PiggyBank } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { routes } from "@/constants/routes";
import { formatMoney } from "@/services/money.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { CurrencyCode } from "@/types/finance.types";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";

import { HomeQuickAction } from "./HomeQuickAction";

type HomeHeroProps = {
  totalBalance: number;
  currency: CurrencyCode;
  hideBalances?: boolean;
};

export function HomeHero({
  totalBalance,
  currency,
  hideBalances,
}: HomeHeroProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const [hideTotalBalance, setHideTotalBalance] = useState(false);

  return (
    <View style={styles.hero}>
      <View style={styles.balanceSection}>
        <AppText
          variant="caption"
          style={styles.balanceLabel}
          i18nKey="home.totalEstimatedBalance"
        />

        <View style={styles.balanceRow}>
          <AppText style={styles.balanceAmount} numberOfLines={1}>
            {formatMoney({
              amount: totalBalance,
              currencyCode: currency,
              hideAmount: hideTotalBalance,
            })}
          </AppText>

          <Pressable
            onPress={() => setHideTotalBalance((current) => !current)}
            style={({ pressed }) => [
              styles.visibilityButton,
              {
                backgroundColor: themeColors.cardSoft,
                borderColor: themeColors.border,
                opacity: pressed ? 0.75 : 1,
              },
            ]}
          >
            {hideTotalBalance ? (
              <EyeOff size={20} color={themeColors.text} />
            ) : (
              <Eye size={20} color={themeColors.text} />
            )}
          </Pressable>
        </View>
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
          labelI18nKey="tabs.loans"
          icon={<HandCoins size={20} color={themeColors.textMuted} />}
          backgroundColor={themeColors.cardSoft}
          borderColor={themeColors.border}
          textColor={themeColors.text}
          onPress={() => router.push(routes.tabs.loans as never)}
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

  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    maxWidth: "100%",
  },

  visibilityButton: {
    width: 38,
    height: 38,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
