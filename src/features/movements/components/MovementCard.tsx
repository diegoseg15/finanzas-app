import {
  ArrowDownLeft,
  ArrowUpRight,
  FileText,
  Image,
  Paperclip,
  X,
} from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { getCategoryById } from "@/constants/categories";
import { colors } from "@/constants/colors";
import { formatMoney } from "@/services/money.service";
import { openMovementAttachment } from "@/services/movement-attachment.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { Movement } from "@/types/finance.types";

type MovementCardProps = {
  movement: Movement;
  variant?: "full" | "compact";
  onEdit?: () => void;
  onDelete?: () => void;
};

export function MovementCard({
  movement,
  variant = "full",
  onEdit,
  onDelete,
}: MovementCardProps) {
  const { t } = useTranslation();

  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const account = useAccountStore((state) =>
    state.accounts.find((item) => item.id === movement.accountId),
  );

  const category = getCategoryById(movement.categoryId);
  const isIncome = movement.kind === "income";

  const isCompact = variant === "compact";
  const noteNumberOfLines = isCompact ? 1 : 2;

  const movementTitle =
    category?.name ??
    t("movements.card.defaultTitle", {
      defaultValue: "Movimiento",
    });

  const accountName =
    account?.name ??
    t("movements.card.deletedAccount", {
      defaultValue: "Cuenta eliminada",
    });

  const formattedAmount = formatMoney({
    amount: movement.amount,
    currencyCode: movement.currency,
  });

  const formattedDate = new Date(movement.date).toLocaleString();

  const handleOpenAttachment = async () => {
    if (!movement.attachment) {
      return;
    }

    try {
      await openMovementAttachment(movement.attachment);
    } catch {
      Alert.alert(
        t("movements.attachment.openErrorTitle"),
        t("movements.attachment.openErrorDescription"),
      );
    }
  };

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
              <View style={styles.titleRow}>
                <AppText variant="body" numberOfLines={1}>
                  {movementTitle}
                </AppText>

                {movement.attachment ? (
                  <Paperclip size={15} color={themeColors.primary} />
                ) : null}
              </View>

              <AppText variant="caption" numberOfLines={1}>
                {accountName} · {new Date(movement.date).toLocaleDateString()}
              </AppText>
            </View>

            <AppText
              variant="body"
              style={{
                color: isIncome ? themeColors.income : themeColors.expense,
              }}
            >
              {isIncome ? "+" : "-"}
              {formattedAmount}
            </AppText>
          </View>

          {movement.note ? (
            <AppText
              variant="muted"
              style={styles.note}
              numberOfLines={noteNumberOfLines}
            >
              {movement.note}
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
                <AppText variant="title">{movementTitle}</AppText>

                <AppText variant="caption">
                  {isIncome
                    ? t("movements.income", {
                        defaultValue: "Ingreso",
                      })
                    : t("movements.expense", {
                        defaultValue: "Egreso",
                      })}
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
                <AppText variant="caption" i18nKey="movements.form.amount" />

                <AppText
                  variant="title"
                  style={{
                    color: isIncome ? themeColors.income : themeColors.expense,
                  }}
                >
                  {isIncome ? "+" : "-"}
                  {formattedAmount}
                </AppText>
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
                <MovementDetailRow
                  labelI18nKey="movements.card.account"
                  value={accountName}
                />

                <MovementDetailRow
                  labelI18nKey="movements.card.category"
                  value={movementTitle}
                />

                <MovementDetailRow
                  labelI18nKey="movements.card.date"
                  value={formattedDate}
                />

                <MovementDetailRow
                  labelI18nKey="movements.card.status"
                  value={t(`movements.status.${movement.status}`)}
                />

                {typeof movement.balanceAfterMovement === "number" ? (
                  <MovementDetailRow
                    labelI18nKey="movements.card.balanceAfter"
                    value={formatMoney({
                      amount: movement.balanceAfterMovement,
                      currencyCode: movement.currency,
                    })}
                  />
                ) : null}

                {movement.note ? (
                  <View style={styles.detailBlock}>
                    <AppText variant="caption" i18nKey="movements.card.note" />

                    <AppText variant="body">{movement.note}</AppText>
                  </View>
                ) : null}
              </View>

              {movement.attachment ? (
                <Pressable
                  onPress={handleOpenAttachment}
                  style={({ pressed }) => [
                    styles.attachmentPanel,
                    {
                      backgroundColor: themeColors.card,
                      borderColor: themeColors.border,
                      opacity: pressed ? 0.76 : 1,
                    },
                  ]}
                >
                  {movement.attachment.mimeType === "application/pdf" ? (
                    <FileText size={22} color={themeColors.primary} />
                  ) : movement.attachment.mimeType.startsWith("image/") ? (
                    <Image size={22} color={themeColors.primary} />
                  ) : (
                    <Paperclip size={22} color={themeColors.primary} />
                  )}

                  <View style={styles.attachmentCopy}>
                    <AppText
                      variant="body"
                      i18nKey="movements.card.attachment"
                    />

                    <AppText variant="caption" numberOfLines={2}>
                      {movement.attachment.name}
                    </AppText>
                  </View>
                </Pressable>
              ) : null}

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

function MovementDetailRow({
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

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
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

  attachmentPanel: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  attachmentCopy: {
    flex: 1,
    gap: 3,
  },

  modalActions: {
    gap: 10,
  },
});
