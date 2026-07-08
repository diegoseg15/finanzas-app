import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { FileText, Image, Paperclip, Trash2, X } from "lucide-react-native";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform, Pressable, StyleSheet, TextInput, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";
import { InlineMessage } from "@/components/ui/InlineMessage";
import { SearchableModalPicker } from "@/components/ui/SearchableModalPicker";
import { getCategoriesByType } from "@/constants/categories";
import { colors } from "@/constants/colors";
import { formatMoney } from "@/services/money.service";
import { pickMovementAttachment } from "@/services/movement-attachment.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import {
  Account,
  CreateMovementInput,
  MovementAttachment,
  MovementKind,
} from "@/types/finance.types";

type MovementDetailsStepProps = {
  kind: MovementKind;
  amount: number;
  accounts: Account[];
  onBack: () => void;
  onCancel: () => void;
  onSubmit: (input: CreateMovementInput) => void;
};

export function MovementDetailsStep({
  kind,
  amount,
  accounts,
  onBack,
  onCancel,
  onSubmit,
}: MovementDetailsStepProps) {
  const { t } = useTranslation();

  const [attachment, setAttachment] = useState<MovementAttachment | null>(null);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const mainCurrency = useAppSettingsStore((state) => state.mainCurrency);

  const [accountId, setAccountId] = useState(accounts[0]?.id ?? "");
  const [categoryId, setCategoryId] = useState("");
  const [note, setNote] = useState("");
  const [movementDate, setMovementDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const selectedAccount = useMemo(
    () => accounts.find((account) => account.id === accountId),
    [accounts, accountId],
  );

  const categories = useMemo(() => getCategoriesByType(kind), [kind]);

  const selectedCurrency = selectedAccount?.mainCurrency ?? mainCurrency;

  const canSubmit = Boolean(accountId && categoryId && amount > 0);

  const errorMessage = !accountId
    ? t("movements.form.accountRequired")
    : !categoryId
      ? t("movements.form.categoryRequired")
      : undefined;

  const formattedMovementDate = useMemo(() => {
    return movementDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [movementDate]);

  const handlePickAttachment = async () => {
    try {
      setAttachmentError(null);

      const selectedAttachment = await pickMovementAttachment();

      if (!selectedAttachment) {
        return;
      }

      setAttachment(selectedAttachment);
    } catch {
      setAttachmentError(t("movements.form.attachmentError"));
    }
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (event.type === "dismissed" || !selectedDate) {
      return;
    }

    setMovementDate(selectedDate);
  };

  const handleSubmit = () => {
    if (!canSubmit || !selectedAccount) {
      return;
    }

    onSubmit({
      kind,
      amount,
      currency: selectedCurrency,
      accountId,
      categoryId,
      tagIds: [],
      note: note.trim() || undefined,
      status: "confirmed",
      date: movementDate.toISOString(),
      attachment,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.closeButton} />

        <AppText
          variant="subtitle"
          i18nKey={
            kind === "income" ? "movements.newIncome" : "movements.newExpense"
          }
        />

        <Pressable onPress={onCancel} style={styles.closeButton}>
          <X size={22} color={themeColors.text} />
        </Pressable>
      </View>

      <View
        style={[
          styles.fixedSummary,
          {
            backgroundColor: themeColors.card,
            borderColor: themeColors.border,
          },
        ]}
      >
        <AppText variant="caption" i18nKey="movements.form.amount" />

        <AppText variant="title">
          {formatMoney({
            amount,
            currencyCode: selectedCurrency,
          })}
        </AppText>
      </View>

      <SearchableModalPicker
        labelI18nKey="movements.form.account"
        modalTitleI18nKey="movements.form.account"
        value={accountId}
        options={accounts.map((account) => ({
          value: account.id,
          label: account.name,
          description: account.institutionName || account.mainCurrency,
          searchText: `${account.name} ${account.institutionName ?? ""} ${
            account.mainCurrency
          }`,
        }))}
        onChange={setAccountId}
      />

      <SearchableModalPicker
        labelI18nKey="movements.form.category"
        modalTitleI18nKey="movements.form.category"
        value={categoryId}
        options={categories.map((category) => ({
          value: category.id,
          label: t(category.labelI18nKey),
          description: category.name,
          searchText: `${category.name} ${t(category.labelI18nKey)}`,
        }))}
        onChange={setCategoryId}
      />

      <View style={styles.field}>
        <AppText variant="caption" i18nKey="movements.form.date" />

        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={[
            styles.dateButton,
            {
              backgroundColor: themeColors.cardSoft,
              borderColor: themeColors.border,
            },
          ]}
        >
          <AppText style={styles.dateText}>{formattedMovementDate}</AppText>
        </Pressable>

        {showDatePicker ? (
          <DateTimePicker
            value={movementDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            maximumDate={new Date()}
            onChange={handleDateChange}
          />
        ) : null}
      </View>

      <View style={styles.field}>
        <AppText variant="caption" i18nKey="movements.form.attachment" />

        {attachment ? (
          <View
            style={[
              styles.attachmentCard,
              {
                backgroundColor: themeColors.cardSoft,
                borderColor: themeColors.border,
              },
            ]}
          >
            <View style={styles.attachmentIcon}>
              {attachment.mimeType === "application/pdf" ? (
                <FileText size={22} color={themeColors.primary} />
              ) : (
                <Image size={22} color={themeColors.primary} />
              )}
            </View>

            <View style={styles.attachmentCopy}>
              <AppText style={styles.attachmentName} numberOfLines={1}>
                {attachment.name}
              </AppText>

              <AppText variant="caption">
                {attachment.mimeType === "application/pdf" ? "PDF" : "Imagen"}
              </AppText>
            </View>

            <Pressable
              onPress={() => setAttachment(null)}
              style={styles.attachmentRemoveButton}
            >
              <Trash2 size={19} color={themeColors.expense} />
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={handlePickAttachment}
            style={({ pressed }) => [
              styles.attachmentButton,
              {
                backgroundColor: themeColors.cardSoft,
                borderColor: themeColors.border,
                opacity: pressed ? 0.75 : 1,
              },
            ]}
          >
            <Paperclip size={19} color={themeColors.primary} />

            <AppText
              style={styles.attachmentButtonText}
              i18nKey="movements.form.addAttachment"
            />
          </Pressable>
        )}

        {attachmentError ? (
          <InlineMessage type="error" message={attachmentError} />
        ) : null}
      </View>

      <View style={styles.field}>
        <AppText variant="caption" i18nKey="common.note" />

        <TextInput
          value={note}
          onChangeText={setNote}
          multiline
          placeholder={t("movements.form.notePlaceholder")}
          placeholderTextColor={themeColors.textMuted}
          style={[
            styles.input,
            styles.textArea,
            {
              backgroundColor: themeColors.cardSoft,
              borderColor: themeColors.border,
              color: themeColors.text,
            },
          ]}
        />
      </View>

      {errorMessage ? (
        <InlineMessage type="error" message={errorMessage} />
      ) : null}

      <View style={styles.actions}>
        <AppButton variant="secondary" onPress={onBack} i18nKey="common.back" />

        <AppButton
          disabled={!canSubmit}
          onPress={handleSubmit}
          i18nKey="movements.saveMovement"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  closeButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  fixedSummary: {
    borderWidth: 1,
    borderRadius: 22,
    alignItems: "center",
    gap: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  field: {
    gap: 8,
  },

  dateButton: {
    minHeight: 54,
    borderWidth: 1,
    borderRadius: 18,
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  dateText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
  },

  input: {
    minHeight: 54,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "600",
  },

  textArea: {
    minHeight: 78,
    paddingTop: 14,
    textAlignVertical: "top",
  },

  actions: {
    gap: 10,
  },

  attachmentButton: {
    minHeight: 54,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  attachmentButtonText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },

  attachmentCard: {
    minHeight: 64,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  attachmentIcon: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  attachmentCopy: {
    flex: 1,
    gap: 2,
  },

  attachmentName: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "800",
  },

  attachmentRemoveButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
});
