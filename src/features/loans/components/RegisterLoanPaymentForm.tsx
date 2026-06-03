import { X } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { InlineMessage } from "@/components/ui/InlineMessage";
import { colors } from "@/constants/colors";
import { formatMoney, sanitizeMoneyValue } from "@/services/money.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { Loan, RegisterLoanPaymentInput } from "@/types/loan.types";

type RegisterLoanPaymentFormProps = {
  loan: Loan;
  onSubmit: (input: RegisterLoanPaymentInput) => void;
  onCancel: () => void;
};

export function RegisterLoanPaymentForm({
  loan,
  onSubmit,
  onCancel,
}: RegisterLoanPaymentFormProps) {
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const [amount, setAmount] = useState(String(loan.remainingAmount));
  const [note, setNote] = useState("");

  const parsedAmount = sanitizeMoneyValue(amount);

  type AmountValidation =
    | {
        isValid: true;
        message?: never;
      }
    | {
        isValid: false;
        message: string;
      };

  const amountValidation: AmountValidation =
    amount.trim().length === 0
      ? {
          isValid: false,
          message: t("loans.payment.amountRequired"),
        }
      : Number.isFinite(parsedAmount) &&
          parsedAmount > 0 &&
          parsedAmount <= loan.remainingAmount
        ? {
            isValid: true,
          }
        : {
            isValid: false,
            message: t("loans.payment.amountError", {
              amount: formatMoney({
                amount: loan.remainingAmount,
                currencyCode: loan.currency,
              }),
            }),
          };

  const canSubmit = amountValidation.isValid;

  const actionI18nKey =
    loan.kind === "payable" ? "loans.payment.pay" : "loans.payment.collect";

  const handleSubmit = () => {
    if (!canSubmit) {
      return;
    }

    onSubmit({
      amount: parsedAmount,
      note,
    });
  };

  return (
    <AppCard style={styles.form}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <AppText
            variant="subtitle"
            i18nKey={
              loan.kind === "payable"
                ? "loans.payment.payTitle"
                : "loans.payment.collectTitle"
            }
          />

          <AppText
            variant="caption"
            i18nKey="loans.payment.remainingAmount"
            i18nValues={{
              amount: formatMoney({
                amount: loan.remainingAmount,
                currencyCode: loan.currency,
              }),
            }}
          />
        </View>

        <Pressable onPress={onCancel} style={styles.closeButton}>
          <X size={20} color={themeColors.textMuted} />
        </Pressable>
      </View>

      <View style={styles.field}>
        <AppText variant="caption" i18nKey="loans.payment.amount" />

        <TextInput
          value={amount}
          onChangeText={(value) => setAmount(value.replace("-", ""))}
          keyboardType="decimal-pad"
          placeholder={t("loans.payment.amountPlaceholder")}
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
        <AppText variant="caption" i18nKey="loans.payment.note" />

        <TextInput
          value={note}
          onChangeText={setNote}
          multiline
          placeholder={t("loans.payment.notePlaceholder")}
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

      {!amountValidation.isValid ? (
        <InlineMessage type="error" message={amountValidation.message} />
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
          i18nKey={actionI18nKey}
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
