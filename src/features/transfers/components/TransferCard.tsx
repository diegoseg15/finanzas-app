import { Repeat, X } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";

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
  variant?: "full" | "compact";
  onEdit?: () => void;
  onDelete?: () => void;
};

export function TransferCard({
  transfer,
  variant = "full",
  onEdit,
  onDelete,
}: TransferCardProps) {
  const { t } = useTranslation();

  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const accounts = useAccountStore((state) => state.accounts);

  const fromAccount = accounts.find(
    (account) => account.id === transfer.fromAccountId,
  );

  const toAccount = accounts.find(
    (account) => account.id === transfer.toAccountId,
  );

  const isCompact = variant === "compact";
  const noteNumberOfLines = isCompact ? 1 : 2;

  const fromAccountName =
    fromAccount?.name ?? t("movements.transferCard.fromAccountFallback");

  const toAccountName =
    toAccount?.name ?? t("movements.transferCard.toAccountFallback");

  const sentAmount = formatMoney({
    amount: transfer.fromAmount,
    currencyCode: transfer.fromCurrency,
  });

  const receivedAmount = formatMoney({
    amount: transfer.toAmount,
    currencyCode: transfer.toCurrency,
  });

  const feeAmount = formatMoney({
    amount: transfer.feeAmount,
    currencyCode: transfer.feeCurrency,
  });

  const formattedDate = new Date(transfer.date).toLocaleString();

  const handleEdit = () => {
    setIsDetailsVisible(false);
    onEdit?.();
  };

  const handleDelete = () => {
    setIsDetailsVisible(false);
    onDelete?.();
  };

  return (
    <>
      <Pressable
        onPress={() => setIsDetailsVisible(true)}
        style={({ pressed }) => [{ opacity: pressed ? 0.84 : 1 }]}
      >
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

              <AppText variant="caption" numberOfLines={1}>
                {fromAccountName} → {toAccountName}
              </AppText>
            </View>

            <View style={styles.amountPreview}>
              <AppText
                variant="caption"
                style={[
                  styles.previewAmountText,
                  {
                    color: themeColors.expense,
                  },
                ]}
                numberOfLines={1}
              >
                -{sentAmount}
              </AppText>

              {!isCompact ? (
                <AppText
                  variant="caption"
                  style={[
                    styles.previewAmountText,
                    {
                      color: themeColors.income,
                    },
                  ]}
                  numberOfLines={1}
                >
                  +{receivedAmount}
                </AppText>
              ) : null}
            </View>
          </View>

          {transfer.note ? (
            <AppText
              variant="muted"
              style={styles.note}
              numberOfLines={noteNumberOfLines}
            >
              {transfer.note}
            </AppText>
          ) : null}
        </AppCard>
      </Pressable>

      <Modal
        visible={isDetailsVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDetailsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setIsDetailsVisible(false)}
          />

          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: themeColors.background,
              },
            ]}
          >
            <View style={styles.modalHandle} />

            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderCopy}>
                <AppText variant="title" i18nKey="movements.transfer" />

                <AppText variant="caption">
                  {fromAccountName} → {toAccountName}
                </AppText>
              </View>

              <Pressable
                onPress={() => setIsDetailsVisible(false)}
                style={[
                  styles.closeButton,
                  {
                    backgroundColor: themeColors.cardSoft,
                  },
                ]}
              >
                <X size={20} color={themeColors.text} />
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalContent}
            >
              <View
                style={[
                  styles.amountPanel,
                  {
                    backgroundColor: themeColors.card,
                    borderColor: themeColors.border,
                  },
                ]}
              >
                <AppText
                  variant="caption"
                  i18nKey="movements.transferCard.sent"
                />

                <AppText
                  variant="title"
                  style={{
                    color: themeColors.expense,
                  }}
                >
                  -{sentAmount}
                </AppText>

                <View style={styles.receivedPreview}>
                  <AppText
                    variant="caption"
                    i18nKey="movements.transferCard.received"
                  />

                  <AppText
                    variant="body"
                    style={{
                      color: themeColors.income,
                      fontWeight: "900",
                    }}
                  >
                    +{receivedAmount}
                  </AppText>
                </View>
              </View>

              <View
                style={[
                  styles.detailsPanel,
                  {
                    backgroundColor: themeColors.card,
                    borderColor: themeColors.border,
                  },
                ]}
              >
                <TransferDetailRow
                  labelI18nKey="movements.transferCard.fromAccount"
                  value={fromAccountName}
                />

                <TransferDetailRow
                  labelI18nKey="movements.transferCard.toAccount"
                  value={toAccountName}
                />

                <TransferDetailRow
                  labelI18nKey="movements.card.date"
                  value={formattedDate}
                />

                <TransferDetailRow
                  labelI18nKey="movements.card.status"
                  value={t(`movements.status.${transfer.status}`)}
                />

                <TransferDetailRow
                  labelI18nKey="movements.transferCard.exchangeRate"
                  value={`1 ${transfer.fromCurrency} = ${transfer.exchangeRate.toFixed(
                    6,
                  )} ${transfer.toCurrency}`}
                />

                {transfer.feeAmount > 0 ? (
                  <TransferDetailRow
                    labelI18nKey="movements.transferCard.fee"
                    value={feeAmount}
                  />
                ) : null}

                {transfer.note ? (
                  <View style={styles.detailBlock}>
                    <AppText variant="caption" i18nKey="movements.card.note" />

                    <AppText variant="body">{transfer.note}</AppText>
                  </View>
                ) : null}
              </View>

              {onEdit || onDelete ? (
                <View style={styles.modalActions}>
                  {onEdit ? (
                    <AppButton
                      variant="secondary"
                      onPress={handleEdit}
                      i18nKey="common.edit"
                    />
                  ) : null}

                  {onDelete ? (
                    <AppButton
                      variant="ghost"
                      onPress={handleDelete}
                      i18nKey="common.delete"
                    />
                  ) : null}
                </View>
              ) : null}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

function TransferDetailRow({
  labelI18nKey,
  value,
}: {
  labelI18nKey: string;
  value: string;
}) {
  return (
    <View style={styles.detailRow}>
      <AppText variant="caption" i18nKey={labelI18nKey} />

      <AppText variant="body" style={styles.detailValue}>
        {value}
      </AppText>
    </View>
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
    gap: 2,
  },

  amountPreview: {
    maxWidth: 120,
    alignItems: "flex-end",
    gap: 2,
  },

  previewAmountText: {
    fontWeight: "900",
  },

  note: {
    marginLeft: 56,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },

  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.52)",
  },

  modalCard: {
    maxHeight: "88%",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 20,
  },

  modalHandle: {
    alignSelf: "center",
    width: 42,
    height: 4,
    borderRadius: 999,
    backgroundColor: "rgba(150, 150, 150, 0.45)",
    marginBottom: 14,
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },

  modalHeaderCopy: {
    flex: 1,
    gap: 4,
  },

  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  modalContent: {
    gap: 14,
    paddingTop: 16,
    paddingBottom: 18,
  },

  amountPanel: {
    borderWidth: 1,
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 6,
  },

  receivedPreview: {
    marginTop: 8,
    alignItems: "center",
    gap: 3,
  },

  detailsPanel: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    gap: 14,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
  },

  detailValue: {
    flex: 1,
    textAlign: "right",
    fontWeight: "800",
  },

  detailBlock: {
    gap: 6,
  },

  modalActions: {
    gap: 10,
  },
});
