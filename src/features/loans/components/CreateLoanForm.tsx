import { Check, X } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { InlineMessage } from "@/components/ui/InlineMessage";
import { OptionPicker } from "@/components/ui/OptionPicker";
import { SelectableOption } from "@/components/ui/SelectableOption";
import { colors } from "@/constants/colors";
import { currencies } from "@/constants/currencies";
import { sanitizeMoneyValue } from "@/services/money.service";
import { validateRequiredText } from "@/services/validation.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { CurrencyCode } from "@/types/finance.types";
import { CreateLoanInput, Loan, LoanKind } from "@/types/loan.types";

type CreateLoanFormProps = {
  initialLoan?: Loan;
  onSubmit: (input: CreateLoanInput) => void;
  onCancel: () => void;
};

export function CreateLoanForm({
  initialLoan,
  onSubmit,
  onCancel,
}: CreateLoanFormProps) {
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const mainCurrency = useAppSettingsStore((state) => state.mainCurrency);

  const [title, setTitle] = useState(initialLoan?.title ?? "");
  const [personOrEntity, setPersonOrEntity] = useState(
    initialLoan?.personOrEntity ?? "",
  );
  const [kind, setKind] = useState<LoanKind>(initialLoan?.kind ?? "payable");
  const [currency, setCurrency] = useState<CurrencyCode>(
    initialLoan?.currency ?? mainCurrency,
  );
  const [amount, setAmount] = useState(
    initialLoan?.originalAmount !== undefined
      ? String(initialLoan.originalAmount)
      : "0",
  );
  const [notes, setNotes] = useState(initialLoan?.notes ?? "");

  const parsedAmount = sanitizeMoneyValue(amount);

  const titleValidation = validateRequiredText(title, t("loans.form.title"));

  const amountValidation =
    amount.trim().length === 0
      ? {
          isValid: false,
          message: t("loans.form.amountRequired"),
        }
      : Number.isFinite(parsedAmount) && parsedAmount > 0
        ? { isValid: true }
        : {
            isValid: false,
            message: t("loans.form.amountError"),
          };

  const errorMessage = !titleValidation.isValid
    ? t("loans.form.titleRequired")
    : !amountValidation.isValid
      ? amountValidation.message
      : undefined;

  const canSubmit = !errorMessage;

  const handleSubmit = () => {
    if (!canSubmit) {
      return;
    }

    onSubmit({
      title,
      personOrEntity,
      kind,
      currency,
      originalAmount: Math.max(parsedAmount, 0),
      remainingAmount: initialLoan?.remainingAmount,
      notes,
    });
  };

  return (
    <AppCard style={styles.form}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <AppText
            variant="subtitle"
            i18nKey={
              initialLoan ? "loans.form.editTitle" : "loans.form.createTitle"
            }
          />

          <AppText variant="muted" i18nKey="loans.form.description" />
        </View>

        <Pressable onPress={onCancel} style={styles.closeButton}>
          <X size={20} color={themeColors.textMuted} />
        </Pressable>
      </View>

      <View style={styles.field}>
        <AppText variant="caption" i18nKey="loans.form.title" />

        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder={t("loans.form.titlePlaceholder")}
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
        <AppText variant="caption" i18nKey="loans.form.personOrEntity" />

        <TextInput
          value={personOrEntity}
          onChangeText={setPersonOrEntity}
          placeholder={t("loans.form.personOrEntityPlaceholder")}
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

      <SelectableOption
        titleI18nKey="loans.form.payable"
        descriptionI18nKey="loans.form.payableDescription"
        selected={kind === "payable"}
        onPress={() => setKind("payable")}
        leftSlot={
          kind === "payable" ? <Check size={18} color="#FFFFFF" /> : null
        }
      />

      <SelectableOption
        titleI18nKey="loans.form.receivable"
        descriptionI18nKey="loans.form.receivableDescription"
        selected={kind === "receivable"}
        onPress={() => setKind("receivable")}
        leftSlot={
          kind === "receivable" ? <Check size={18} color="#FFFFFF" /> : null
        }
      />

      <View style={styles.field}>
        <AppText variant="caption" i18nKey="loans.form.amount" />

        <TextInput
          value={amount}
          onChangeText={(value) => setAmount(value.replace("-", ""))}
          keyboardType="decimal-pad"
          placeholder={t("loans.form.amountPlaceholder")}
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

      <OptionPicker
        labelI18nKey="loans.form.currency"
        placeholderI18nKey="common.select"
        value={currency}
        options={currencies.map((item) => ({
          value: item.code,
          label: `${item.code} · ${item.name}`,
          description:
            item.type === "crypto"
              ? "Crypto"
              : item.type === "fiat"
                ? "Fiat"
                : "Custom",
        }))}
        onChange={(value) => setCurrency(value as CurrencyCode)}
      />

      <View style={styles.field}>
        <AppText variant="caption" i18nKey="loans.form.notes" />

        <TextInput
          value={notes}
          onChangeText={setNotes}
          multiline
          placeholder={t("loans.form.notesPlaceholder")}
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
        <AppButton
          variant="secondary"
          onPress={onCancel}
          i18nKey="common.cancel"
        />

        <AppButton
          onPress={handleSubmit}
          disabled={!canSubmit}
          i18nKey={initialLoan ? "common.update" : "common.create"}
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

  headerCopy: {
    flex: 1,
    gap: 4,
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

  actions: {
    gap: 10,
  },
});
