import { StyleSheet, View } from "react-native";

import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { formatMoney } from "@/services/money.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { CurrencyCode } from "@/types/finance.types";

type MovementsSummaryCardProps = {
  currency: CurrencyCode;
  income: number;
  expense: number;
  balance: number;
};

export function MovementsSummaryCard({
  currency,
  income,
  expense,
  balance,
}: MovementsSummaryCardProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <AppCard style={styles.card}>
      <View style={styles.header}>
        <View>
          <AppText variant="caption" i18nKey="movements.summary.month" />

          <AppText variant="title">
            {formatMoney({
              amount: balance,
              currencyCode: currency,
            })}
          </AppText>
        </View>

        <AppText
          variant="caption"
          style={{
            color: balance >= 0 ? themeColors.income : themeColors.expense,
          }}
        >
          {balance >= 0 ? "+" : "-"}
        </AppText>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <AppText variant="caption" i18nKey="home.monthlyIncome" />

          <AppText
            variant="body"
            style={{
              color: themeColors.income,
            }}
          >
            {formatMoney({
              amount: income,
              currencyCode: currency,
            })}
          </AppText>
        </View>

        <View style={styles.statItem}>
          <AppText variant="caption" i18nKey="home.monthlyExpenses" />

          <AppText
            variant="body"
            style={{
              color: themeColors.expense,
            }}
          >
            {formatMoney({
              amount: expense,
              currencyCode: currency,
            })}
          </AppText>
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
  },

  stats: {
    flexDirection: "row",
    gap: 12,
  },

  statItem: {
    flex: 1,
    gap: 4,
  },
});
