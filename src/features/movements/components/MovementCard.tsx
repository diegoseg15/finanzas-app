import { ArrowDownLeft, ArrowUpRight } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { getCategoryById } from "@/constants/categories";
import { colors } from "@/constants/colors";
import { formatMoney } from "@/services/money.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { Movement } from "@/types/finance.types";

type MovementCardProps = {
  movement: Movement;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function MovementCard({
  movement,
  onEdit,
  onDelete,
}: MovementCardProps) {
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const account = useAccountStore((state) =>
    state.accounts.find((item) => item.id === movement.accountId),
  );

  const category = getCategoryById(movement.categoryId);
  const isIncome = movement.kind === "income";

  return (
    <AppCard style={styles.card}>
      <View style={styles.row}>
        <View
          style={[
            styles.iconBox,
            {
              backgroundColor: isIncome
                ? themeColors.income
                : themeColors.expense,
            },
          ]}
        >
          {isIncome ? (
            <ArrowDownLeft size={20} color="#FFFFFF" />
          ) : (
            <ArrowUpRight size={20} color="#FFFFFF" />
          )}
        </View>

        <View style={styles.content}>
          <AppText variant="body">
            {category?.name ??
              t("movements.card.defaultTitle", {
                defaultValue: "Movimiento",
              })}
          </AppText>

          <AppText variant="caption">
            {account?.name ??
              t("movements.card.deletedAccount", {
                defaultValue: "Cuenta eliminada",
              })}{" "}
            · {new Date(movement.date).toLocaleDateString()}
          </AppText>
        </View>

        <AppText
          variant="body"
          style={{
            color: isIncome ? themeColors.income : themeColors.expense,
          }}
        >
          {isIncome ? "+" : "-"}
          {formatMoney({
            amount: movement.amount,
            currencyCode: movement.currency,
          })}
        </AppText>
      </View>

      {movement.note ? (
        <AppText variant="muted" style={styles.note}>
          {movement.note}
        </AppText>
      ) : null}

      {onEdit || onDelete ? (
        <View style={styles.actions}>
          {onEdit ? (
            <AppButton
              variant="ghost"
              onPress={onEdit}
              style={styles.actionButton}
              i18nKey="common.edit"
            />
          ) : null}

          {onDelete ? (
            <AppButton
              variant="ghost"
              onPress={onDelete}
              style={styles.actionButton}
              i18nKey="common.delete"
            />
          ) : null}
        </View>
      ) : null}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flex: 1,
  },

  note: {
    marginLeft: 56,
  },

  actions: {
    gap: 8,
  },

  actionButton: {
    minHeight: 42,
  },
});
