import { router } from "expo-router";
import { ArrowDownLeft, ArrowUpRight, Repeat } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { routes } from "@/constants/routes";
import { formatMoney } from "@/services/money.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

import { HomeActivityItem } from "../types/home.types";
import { HomeSectionHeader } from "./HomeSectionHeader";

type HomeRecentActivityProps = {
  items: HomeActivityItem[];
};

export function HomeRecentActivity({ items }: HomeRecentActivityProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <>
      <HomeSectionHeader
        titleI18nKey="home.recentActivity"
        actionI18nKey="home.viewAll"
        onActionPress={() => router.push(routes.tabs.movements as never)}
      />

      {items.length > 0 ? (
        <View style={styles.list}>
          {items.map((item) => {
            const isIncome = item.kind === "income";
            const isTransfer = item.kind === "transfer";

            return (
              <AppCard key={item.id} style={styles.activityCard}>
                <View
                  style={[
                    styles.activityIcon,
                    {
                      backgroundColor: isTransfer
                        ? themeColors.primary
                        : isIncome
                          ? themeColors.income
                          : themeColors.expense,
                    },
                  ]}
                >
                  {isTransfer ? (
                    <Repeat size={18} color="#FFFFFF" />
                  ) : isIncome ? (
                    <ArrowDownLeft size={18} color="#FFFFFF" />
                  ) : (
                    <ArrowUpRight size={18} color="#FFFFFF" />
                  )}
                </View>

                <View style={styles.activityCopy}>
                  <AppText variant="body" i18nKey={item.labelI18nKey}>
                    {item.fallbackLabel}
                  </AppText>

                  <AppText variant="caption">
                    {new Date(item.date).toLocaleDateString()}
                  </AppText>
                </View>

                <AppText
                  variant="caption"
                  style={{
                    color: isTransfer
                      ? themeColors.textMuted
                      : isIncome
                        ? themeColors.income
                        : themeColors.expense,
                  }}
                >
                  {isIncome ? "+" : isTransfer ? "" : "-"}
                  {formatMoney({
                    amount: item.amount,
                    currencyCode: item.currency,
                  })}
                </AppText>
              </AppCard>
            );
          })}
        </View>
      ) : (
        <AppCard style={styles.emptyCard}>
          <AppText variant="muted" i18nKey="home.noActivity" />
        </AppCard>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
  },

  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  activityCopy: {
    flex: 1,
    gap: 2,
  },

  emptyCard: {
    gap: 8,
  },
});
