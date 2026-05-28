import { Repeat } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { formatMoney } from "@/services/money.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { Transfer } from "@/types/finance.types";

type TransferCardProps = {
  transfer: Transfer;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function TransferCard({
  transfer,
  onEdit,
  onDelete,
}: TransferCardProps) {
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const accounts = useAccountStore((state) => state.accounts);

  const fromAccount = accounts.find(
    (account) => account.id === transfer.fromAccountId,
  );

  const toAccount = accounts.find(
    (account) => account.id === transfer.toAccountId,
  );

  return (
    <AppCard style={styles.card}>
      <View style={styles.row}>
        <View
          style={[
            styles.iconBox,
            {
              backgroundColor: themeColors.primary,
            },
          ]}
        >
          <Repeat size={20} color="#FFFFFF" />
        </View>

        <View style={styles.content}>
          <AppText variant="body" i18nKey="movements.transfer" />

          <AppText variant="caption">
            {fromAccount?.name ??
              t("movements.transferCard.fromAccountFallback")}{" "}
            → {toAccount?.name ?? t("movements.transferCard.toAccountFallback")}
          </AppText>
        </View>
      </View>

      <View style={styles.amounts}>
        <View style={styles.amountRow}>
          <AppText variant="caption" i18nKey="movements.transferCard.sent" />

          <AppText style={{ color: themeColors.expense }}>
            -
            {formatMoney({
              amount: transfer.fromAmount,
              currencyCode: transfer.fromCurrency,
            })}
          </AppText>
        </View>

        <View style={styles.amountRow}>
          <AppText
            variant="caption"
            i18nKey="movements.transferCard.received"
          />

          <AppText style={{ color: themeColors.income }}>
            +
            {formatMoney({
              amount: transfer.toAmount,
              currencyCode: transfer.toCurrency,
            })}
          </AppText>
        </View>

        {transfer.feeAmount > 0 ? (
          <View style={styles.amountRow}>
            <AppText variant="caption" i18nKey="movements.transferCard.fee" />

            <AppText style={{ color: themeColors.warning }}>
              {formatMoney({
                amount: transfer.feeAmount,
                currencyCode: transfer.feeCurrency,
              })}
            </AppText>
          </View>
        ) : null}
      </View>

      <AppText
        variant="caption"
        i18nKey="movements.transferCard.exchangeRate"
        i18nValues={{
          fromCurrency: transfer.fromCurrency,
          exchangeRate: transfer.exchangeRate.toFixed(6),
          toCurrency: transfer.toCurrency,
        }}
      />

      {transfer.note ? (
        <AppText variant="muted">{transfer.note}</AppText>
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
    gap: 14,
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

  amounts: {
    gap: 8,
  },

  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  actions: {
    gap: 8,
  },

  actionButton: {
    minHeight: 42,
  },
});
