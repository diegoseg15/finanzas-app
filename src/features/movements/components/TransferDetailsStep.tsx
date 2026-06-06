import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TextInput, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";
import { InlineMessage } from "@/components/ui/InlineMessage";
import { OptionPicker } from "@/components/ui/OptionPicker";
import { colors } from "@/constants/colors";
import { formatMoney, sanitizeMoneyValue } from "@/services/money.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { Account, CreateTransferInput } from "@/types/finance.types";

type TransferDetailsStepProps = {
  amount: number;
  accounts: Account[];
  onBack: () => void;
  onCancel: () => void;
  onSubmit: (input: CreateTransferInput) => void;
};

export function TransferDetailsStep({
  amount,
  accounts,
  onBack,
  onCancel,
  onSubmit,
}: TransferDetailsStepProps) {
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const [fromAccountId, setFromAccountId] = useState(accounts[0]?.id ?? "");
  const [toAccountId, setToAccountId] = useState(accounts[1]?.id ?? "");
  const [feeAmount, setFeeAmount] = useState("0");
  const [note, setNote] = useState("");

  const fromAccount = useMemo(
    () => accounts.find((account) => account.id === fromAccountId),
    [accounts, fromAccountId],
  );

  const toAccount = useMemo(
    () => accounts.find((account) => account.id === toAccountId),
    [accounts, toAccountId],
  );

  const fee = Math.max(sanitizeMoneyValue(feeAmount), 0);

  const fromCurrency = fromAccount?.mainCurrency;
  const toCurrency = toAccount?.mainCurrency;

  const hasDifferentCurrencies =
    Boolean(fromCurrency && toCurrency) && fromCurrency !== toCurrency;

  const canSubmit = Boolean(
    fromAccount &&
    toAccount &&
    fromAccount.id !== toAccount.id &&
    fromCurrency &&
    toCurrency &&
    amount > 0,
  );

  const errorMessage = !fromAccount
    ? t("transfers.form.fromAccountRequired")
    : !toAccount
      ? t("transfers.form.toAccountRequired")
      : fromAccount.id === toAccount.id
        ? t("transfers.form.sameAccountError")
        : undefined;

  const handleSubmit = () => {
    if (
      !canSubmit ||
      !fromAccount ||
      !toAccount ||
      !fromCurrency ||
      !toCurrency
    ) {
      return;
    }

    onSubmit({
      fromAccountId: fromAccount.id,
      toAccountId: toAccount.id,

      fromAmount: amount,
      fromCurrency,

      toAmount: amount,
      toCurrency,

      feeAmount: fee,
      feeCurrency: fromCurrency,

      exchangeRate: 1,

      note: note.trim() || undefined,
      status: "confirmed",
      date: new Date().toISOString(),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <AppText variant="caption" i18nKey="movements.transferAmount" />

        <AppText variant="title">
          {formatMoney({
            amount,
            currencyCode: fromCurrency ?? accounts[0]?.mainCurrency ?? "USD",
          })}
        </AppText>
      </View>

      <OptionPicker
        labelI18nKey="transfers.form.fromAccount"
        placeholderI18nKey="common.select"
        value={fromAccountId}
        options={accounts.map((account) => ({
          value: account.id,
          label: account.name,
          description: account.institutionName || account.mainCurrency,
        }))}
        onChange={(nextAccountId) => {
          setFromAccountId(nextAccountId);

          if (nextAccountId === toAccountId) {
            const nextToAccount = accounts.find(
              (account) => account.id !== nextAccountId,
            );

            setToAccountId(nextToAccount?.id ?? "");
          }
        }}
      />

      <OptionPicker
        labelI18nKey="transfers.form.toAccount"
        placeholderI18nKey="common.select"
        value={toAccountId}
        options={accounts
          .filter((account) => account.id !== fromAccountId)
          .map((account) => ({
            value: account.id,
            label: account.name,
            description: account.institutionName || account.mainCurrency,
          }))}
        onChange={setToAccountId}
      />

      {hasDifferentCurrencies ? (
        <InlineMessage
          type="info"
          message={t("transfers.form.exchangeRatePending")}
        />
      ) : null}

      <View style={styles.field}>
        <AppText variant="caption" i18nKey="transfers.form.feeAmount" />

        <TextInput
          value={feeAmount}
          onChangeText={(value) => setFeeAmount(value.replace("-", ""))}
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
          i18nKey="movements.saveTransfer"
        />

        <AppButton variant="ghost" onPress={onCancel} i18nKey="common.cancel" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 18,
  },

  summary: {
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
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
    minHeight: 86,
    paddingTop: 14,
    textAlignVertical: "top",
  },

  actions: {
    gap: 10,
  },
});
