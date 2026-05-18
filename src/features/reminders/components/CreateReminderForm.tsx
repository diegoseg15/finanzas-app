import { X } from "lucide-react-native";
import { useMemo, useState } from "react";
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

  const titleValidation = validateRequiredText(title, "El título");
  const dateValidation = validateFutureDate(scheduledDate);
  const amountValidation =
    amount.trim().length > 0
      ? validatePositiveAmount(parsedAmount, "El monto")
      : { isValid: true };

  const errorMessage = !titleValidation.isValid
    ? titleValidation.message
    : !dateValidation.isValid
      ? dateValidation.message
      : !amountValidation.isValid
        ? amountValidation.message
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
          <AppText variant="subtitle">Nuevo recordatorio</AppText>
          <AppText variant="muted">
            Programa pagos, cobros, compras o inversiones.
          </AppText>
        </View>

        <Pressable onPress={onCancel} style={styles.closeButton}>
          <X size={20} color={themeColors.textMuted} />
        </Pressable>
      </View>

      <View style={styles.field}>
        <AppText variant="caption">Título</AppText>

        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Ej: Pagar internet"
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
        <AppText variant="caption">Monto opcional</AppText>

        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          placeholder="0.00"
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
        <AppText variant="caption">Tipo</AppText>

        <View style={styles.options}>
          {reminderTypes.map((item) => (
            <SelectableOption
              key={item.value}
              title={item.label}
              description={item.description}
              selected={type === item.value}
              onPress={() => setType(item.value)}
            />
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <AppText variant="caption">Frecuencia</AppText>

        <View style={styles.options}>
          {reminderFrequencies.map((item) => (
            <SelectableOption
              key={item.value}
              title={item.label}
              description={item.description}
              selected={frequency === item.value}
              onPress={() => setFrequency(item.value)}
            />
          ))}
        </View>
      </View>

      <View style={styles.dateGrid}>
        <View style={styles.dateField}>
          <AppText variant="caption">Fecha</AppText>

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
          <AppText variant="caption">Hora</AppText>

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
          <AppText variant="caption">Cuenta relacionada</AppText>

          <View style={styles.options}>
            {accounts.map((account) => (
              <SelectableOption
                key={account.id}
                title={account.name}
                description={`Moneda: ${account.mainCurrency}`}
                selected={accountId === account.id}
                onPress={() => setAccountId(account.id)}
              />
            ))}
          </View>
        </View>
      ) : null}

      <View style={styles.field}>
        <AppText variant="caption">Descripción opcional</AppText>

        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Ej: vence cada 5 del mes..."
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
        <AppButton variant="secondary" onPress={onCancel}>
          Cancelar
        </AppButton>

        <AppButton onPress={handleSubmit} disabled={!canSubmit}>
          Guardar recordatorio
        </AppButton>
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
