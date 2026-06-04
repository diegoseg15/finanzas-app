import { StyleSheet, View } from "react-native";

import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { formatMoney } from "@/services/money.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { CurrencyCode } from "@/types/finance.types";

type HomeMonthlySummaryCardProps = {
  currency: CurrencyCode;
  income: number;
  expense: number;
  balance: number;
  hideBalances?: boolean;
};

export function HomeMonthlySummaryCard({
  currency,
  income,
  expense,
  balance,
  hideBalances = false,
}: HomeMonthlySummaryCardProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <AppCard style={styles.monthlySummaryCard}>
      <View style={styles.monthlySummaryHeader}>
        <AppText variant="subtitle" i18nKey="home.monthlySummary" />

        <AppText variant="caption">{currency}</AppText>
      </View>

      <View style={styles.monthlySummaryList}>
        <MonthlySummaryRow
          labelI18nKey="home.monthlyIncome"
          value={formatMoney({
            amount: income,
            currencyCode: currency,
            hideAmount: hideBalances,
          })}
          color={themeColors.income}
        />

        <MonthlySummaryRow
          labelI18nKey="home.monthlyExpenses"
          value={formatMoney({
            amount: expense,
            currencyCode: currency,
            hideAmount: hideBalances,
          })}
          color={themeColors.expense}
        />

        <View
          style={[
            styles.monthlyDivider,
            {
              backgroundColor: themeColors.border,
            },
          ]}
        />

        <MonthlySummaryRow
          labelI18nKey="home.monthlyBalance"
          value={formatMoney({
            amount: balance,
            currencyCode: currency,
            hideAmount: hideBalances,
          })}
          color={balance >= 0 ? themeColors.income : themeColors.expense}
          strong
        />
      </View>
    </AppCard>
  );
}

type MonthlySummaryRowProps = {
  labelI18nKey: string;
  value: string;
  color: string;
  strong?: boolean;
};

function MonthlySummaryRow({
  labelI18nKey,
  value,
  color,
  strong = false,
}: MonthlySummaryRowProps) {
  return (
    <View style={styles.monthlySummaryRow}>
      <AppText
        variant={strong ? "body" : "caption"}
        i18nKey={labelI18nKey}
        style={strong ? styles.monthlySummaryStrongLabel : undefined}
      />

      <AppText
        variant={strong ? "body" : "caption"}
        style={[
          styles.monthlySummaryValue,
          {
            color,
          },
          strong ? styles.monthlySummaryStrongValue : null,
        ]}
        numberOfLines={1}
      >
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  monthlySummaryCard: {
    gap: 16,
  },

  monthlySummaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  monthlySummaryList: {
    gap: 12,
  },

  monthlySummaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
  },

  monthlySummaryValue: {
    maxWidth: "58%",
    textAlign: "right",
    fontWeight: "800",
  },

  monthlySummaryStrongLabel: {
    fontWeight: "800",
  },

  monthlySummaryStrongValue: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "900",
  },

  monthlyDivider: {
    height: 1,
    opacity: 0.8,
  },
});
