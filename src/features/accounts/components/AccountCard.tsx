import { MoreHorizontal, Pencil, Trash2 } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { Account } from "@/types/finance.types";

import { DebitAccountCard } from "./DebitAccountCard";

type AccountCardProps = {
  account: Account;
  onEdit?: () => void;
  onDelete?: () => void;
  onPress?: () => void;
  hideBalance?: boolean;
};

export function AccountCard({
  account,
  onEdit,
  onDelete,
  onPress,
  hideBalance,
}: AccountCardProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <View style={styles.container}>
      <DebitAccountCard
        account={account}
        compact
        hideBalance={hideBalance}
        onPress={onPress}
      />

      {onEdit || onDelete ? (
        <AppCard style={styles.actionsCard}>
          <View style={styles.actionsHeader}>
            <View style={styles.actionsTitle}>
              <MoreHorizontal size={18} color={themeColors.textMuted} />

              <AppText variant="caption" i18nKey="accounts.card.options" />
            </View>

            <AppText
              variant="caption"
              i18nKey={
                account.includeInTotalBalance
                  ? "accounts.card.includedInTotal"
                  : "accounts.card.excludedFromTotal"
              }
            />
          </View>

          <View style={styles.actions}>
            {onEdit ? (
              <Pressable
                onPress={onEdit}
                style={({ pressed }) => [
                  styles.actionButton,
                  {
                    backgroundColor: themeColors.cardSoft,
                    borderColor: themeColors.border,
                    opacity: pressed ? 0.75 : 1,
                  },
                ]}
              >
                <Pencil size={16} color={themeColors.text} />

                <AppText variant="caption" i18nKey="common.edit" />
              </Pressable>
            ) : null}

            {onDelete ? (
              <Pressable
                onPress={onDelete}
                style={({ pressed }) => [
                  styles.actionButton,
                  {
                    backgroundColor: themeColors.cardSoft,
                    borderColor: themeColors.border,
                    opacity: pressed ? 0.75 : 1,
                  },
                ]}
              >
                <Trash2 size={16} color={themeColors.expense} />

                <AppText
                  variant="caption"
                  style={{ color: themeColors.expense }}
                  i18nKey="common.delete"
                />
              </Pressable>
            ) : null}
          </View>
        </AppCard>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },

  actionsCard: {
    gap: 12,
    paddingVertical: 14,
    borderRadius: 22,
  },

  actionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  actionsTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
  },

  actionButton: {
    flex: 1,
    minHeight: 42,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
});
