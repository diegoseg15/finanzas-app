import { X } from "lucide-react-native";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { InlineMessage } from "@/components/ui/InlineMessage";
import { SelectableOption } from "@/components/ui/SelectableOption";
import { colors } from "@/constants/colors";
import { defaultCurrencyCode } from "@/constants/currencies";
import { reminderFrequencies, reminderTypes } from "@/constants/reminderTypes";
import { sanitizeMoneyValue } from "@/services/money.service";
import {
  validateFutureDate,
  validatePositiveAmount,
  validateRequiredText,
} from "@/services/validation.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import {
  Account,
  CreateReminderInput,
  ReminderFrequency,
  ReminderType,
} from "@/types/finance.types";

type CreateReminderFormProps = {
  accounts: Account[];
  onSubmit: (input: CreateReminderInput) => Promise<void>;
  onCancel: () => void;
};

function getDefaultScheduledDate() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(9, 0, 0, 0);

  return date;
}

function getDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getTimeInputValue(date: Date) {
  return date.toTimeString().slice(0, 5);
}

function buildDateFromInputs(dateInput: string, timeInput: string) {
  const [year, month, day] = dateInput.split("-").map(Number);
  const [hour, minute] = timeInput.split(":").map(Number);

  const date = new Date();
  date.setFullYear(year, month - 1, day);
  date.setHours(hour, minute, 0, 0);

  return date;
}

export function CreateReminderForm({
  accounts,
  onSubmit,
  onCancel,
}: CreateReminderFormProps) {
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const defaultDate = useMemo(() => getDefaultScheduledDate(), []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<ReminderType>("payment");
  const [frequency, setFrequency] = useState<ReminderFrequency>("once");
  const [accountId, setAccountId] = useState<string | undefined>(
    accounts[0]?.id,
  );
  const [dateInput, setDateInput] = useState(getDateInputValue(defaultDate));
  const [timeInput, setTimeInput] = useState(getTimeInputValue(defaultDate));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedAccount = accounts.find((account) => account.id === accountId);
  const parsedAmount = sanitizeMoneyValue(amount);
  const scheduledDate = buildDateFromInputs(dateInput, timeInput);

  const titleValidation = validateRequiredText(
    title,
    t("reminders.form.title"),
  );

  const dateValidation = validateFutureDate(scheduledDate);

  const amountValidation =
    amount.trim().length > 0
      ? validatePositiveAmount(parsedAmount, t("common.amount"))
      : { isValid: true };

  const errorMessage = !titleValidation.isValid
    ? t("reminders.form.titleRequired")
    : !dateValidation.isValid
      ? t("reminders.form.futureDateRequired", {
          defaultValue: "La fecha debe ser futura.",
        })
      : !amountValidation.isValid
        ? t("reminders.form.amountInvalid")
        : undefined;

  const canSubmit = !errorMessage && !isSubmitting;

  const handleSubmit = async () => {
    if (!canSubmit) {
      return;
    }

    setIsSubmitting(true);

    await onSubmit({
      title,
      description,
      amount: parsedAmount > 0 ? parsedAmount : undefined,
      currency: selectedAccount?.mainCurrency ?? defaultCurrencyCode,
      type,
      frequency,
      accountId,
      scheduledAt: scheduledDate.toISOString(),
    });

    setIsSubmitting(false);
    setTitle("");
    setDescription("");
    setAmount("");
    setType("payment");
    setFrequency("once");
    setAccountId(accounts[0]?.id);
    setDateInput(getDateInputValue(defaultDate));
    setTimeInput(getTimeInputValue(defaultDate));
  };

  return (
    <AppCard style={styles.form}>
      <View style={styles.header}>
        <View>
          <AppText variant="subtitle" i18nKey="reminders.newReminder" />

          <AppText variant="muted" i18nKey="reminders.description" />
        </View>

        <Pressable onPress={onCancel} style={styles.closeButton}>
          <X size={20} color={themeColors.textMuted} />
        </Pressable>
      </View>

      <View style={styles.field}>
        <AppText variant="caption" i18nKey="reminders.form.title" />

        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder={t("reminders.form.titlePlaceholder")}
          placeholderTextColor={themeColors.textMuted}
          style={[
            styles.input,
            {
              backgroundColor: themeColors.cardSoft,
              borderColor: themeColors.border,
              color: themeColors.text,
            },
          ]}
        />
      </View>

      <View style={styles.field}>
        <AppText variant="caption" i18nKey="reminders.form.amountOptional" />

        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          placeholder={t("reminders.form.amountPlaceholder")}
          placeholderTextColor={themeColors.textMuted}
          style={[
            styles.input,
            {
              backgroundColor: themeColors.cardSoft,
              borderColor: themeColors.border,
              color: themeColors.text,
            },
          ]}
        />
      </View>

      <View style={styles.field}>
        <AppText variant="caption" i18nKey="reminders.form.type" />

        <View style={styles.options}>
          {reminderTypes.map((item) => (
            <SelectableOption
              key={item.value}
              titleI18nKey={`reminders.types.${item.value}.label`}
              descriptionI18nKey={`reminders.types.${item.value}.description`}
              selected={type === item.value}
              onPress={() => setType(item.value)}
            />
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <AppText variant="caption" i18nKey="reminders.form.frequency" />

        <View style={styles.options}>
          {reminderFrequencies.map((item) => (
            <SelectableOption
              key={item.value}
              titleI18nKey={`reminders.frequencies.${item.value}.label`}
              descriptionI18nKey={`reminders.frequencies.${item.value}.description`}
              selected={frequency === item.value}
              onPress={() => setFrequency(item.value)}
            />
          ))}
        </View>
      </View>

      <View style={styles.dateGrid}>
        <View style={styles.dateField}>
          <AppText variant="caption" i18nKey="reminders.form.date" />

          <TextInput
            value={dateInput}
            onChangeText={setDateInput}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={themeColors.textMuted}
            style={[
              styles.input,
              {
                backgroundColor: themeColors.cardSoft,
                borderColor: themeColors.border,
                color: themeColors.text,
              },
            ]}
          />
        </View>

        <View style={styles.dateField}>
          <AppText variant="caption" i18nKey="reminders.form.time" />

          <TextInput
            value={timeInput}
            onChangeText={setTimeInput}
            placeholder="09:00"
            placeholderTextColor={themeColors.textMuted}
            style={[
              styles.input,
              {
                backgroundColor: themeColors.cardSoft,
                borderColor: themeColors.border,
                color: themeColors.text,
              },
            ]}
          />
        </View>
      </View>

      {accounts.length > 0 ? (
        <View style={styles.field}>
          <AppText variant="caption" i18nKey="reminders.form.relatedAccount" />

          <View style={styles.options}>
            {accounts.map((account) => (
              <SelectableOption
                key={account.id}
                title={account.name}
                description={t("movements.form.accountCurrency", {
                  currency: account.mainCurrency,
                  defaultValue: `Moneda: ${account.mainCurrency}`,
                })}
                selected={accountId === account.id}
                onPress={() => setAccountId(account.id)}
              />
            ))}
          </View>
        </View>
      ) : null}

      <View style={styles.field}>
        <AppText
          variant="caption"
          i18nKey="reminders.form.descriptionOptional"
        />

        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder={t("reminders.form.descriptionPlaceholder")}
          placeholderTextColor={themeColors.textMuted}
          multiline
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
        <AppButton
          variant="secondary"
          onPress={onCancel}
          i18nKey="common.cancel"
        />

        <AppButton
          onPress={handleSubmit}
          disabled={!canSubmit}
          i18nKey="reminders.saveReminder"
        />
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },

  closeButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  field: {
    gap: 8,
  },

  options: {
    gap: 10,
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
    minHeight: 92,
    paddingTop: 14,
    textAlignVertical: "top",
  },

  dateGrid: {
    flexDirection: "row",
    gap: 10,
  },

  dateField: {
    flex: 1,
    gap: 8,
  },

  actions: {
    gap: 10,
  },
});
