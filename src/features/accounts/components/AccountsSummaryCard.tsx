import { Eye, EyeOff } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { formatMoney } from "@/services/money.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { CurrencyCode } from "@/types/finance.types";

import { AccountViewMode } from "../types/account-view-mode.types";

type AccountsSummaryCardProps = {
  viewMode: AccountViewMode;
  groupTotal: number;
  currency: CurrencyCode;
  hideGroupTotal: boolean;
  remainingFreeAccounts: number | null;
  onToggleVisibility: () => void;
};

export function AccountsSummaryCard({
  viewMode,
  groupTotal,
  currency,
  hideGroupTotal,
  remainingFreeAccounts,
  onToggleVisibility,
}: AccountsSummaryCardProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <AppCard style={styles.summaryCard}>
      <View style={styles.summaryRow}>
        <View style={styles.summaryCopy}>
          <AppText
            variant="caption"
            i18nKey={
              viewMode === "crypto"
                ? "accounts.summary.cryptoTotal"
                : "accounts.summary.regularTotal"
            }
          />

          <AppText variant="title">
            {formatMoney({
              amount: groupTotal,
              currencyCode: currency,
              hideAmount: hideGroupTotal,
            })}
          </AppText>
        </View>

        <Pressable
          onPress={onToggleVisibility}
          style={({ pressed }) => [
            styles.visibilityButton,
            {
              backgroundColor: themeColors.cardSoft,
              borderColor: themeColors.border,
              opacity: pressed ? 0.75 : 1,
            },
          ]}
        >
          {hideGroupTotal ? (
            <EyeOff size={20} color={themeColors.text} />
          ) : (
            <Eye size={20} color={themeColors.text} />
          )}
        </Pressable>
      </View>

      {remainingFreeAccounts !== null ? (
        <AppText
          variant="caption"
          i18nKey="accounts.freePlanRemaining"
          i18nValues={{ count: remainingFreeAccounts }}
        />
      ) : (
        <AppText variant="caption" i18nKey="accounts.plusPlanUnlimited" />
      )}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    gap: 10,
  },

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
  },

  summaryCopy: {
    flex: 1,
    gap: 4,
  },

  visibilityButton: {
    width: 42,
    height: 42,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
