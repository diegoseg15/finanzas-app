import { router } from "expo-router";
import { X } from "lucide-react-native";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { InlineMessage } from "@/components/ui/InlineMessage";
import { OptionPicker } from "@/components/ui/OptionPicker";
import { PlanLimitNotice } from "@/components/ui/PlanLimitNotice";
import { colors } from "@/constants/colors";
import { routes } from "@/constants/routes";
import { sanitizeMoneyValue } from "@/services/money.service";
import { canUseMultiCurrencyTransfers } from "@/services/subscription.service";
import { calculateExchangeRate } from "@/services/transfer.service";
import {
  getAccountBalanceByCurrency,
  validatePositiveAmount,
} from "@/services/validation.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { Account, CreateTransferInput, Transfer } from "@/types/finance.types";

type CreateTransferFormProps = {
  accounts: Account[];
  initialTransfer?: Transfer;
  submitLabel?: string;
  submitLabelI18nKey?: string;
  onSubmit: (input: CreateTransferInput) => void;
  onCancel: () => void;
};

export function CreateTransferForm({
  accounts,
  initialTransfer,
  submitLabel,
  submitLabelI18nKey,
  onSubmit,
  onCancel,
}: CreateTransferFormProps) {
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const subscription = useSubscriptionStore((state) => state.subscription);
  const canUseAdvancedTransfers = canUseMultiCurrencyTransfers(subscription);

  const [fromAccountId, setFromAccountId] = useState(
    initialTransfer?.fromAccountId ?? accounts[0]?.id ?? "",
  );

  const [toAccountId, setToAccountId] = useState(
    initialTransfer?.toAccountId ?? accounts[1]?.id ?? "",
  );

  const [fromAmount, setFromAmount] = useState(
    initialTransfer?.fromAmount ? String(initialTransfer.fromAmount) : "",
  );

  const [toAmount, setToAmount] = useState(
    initialTransfer?.toAmount ? String(initialTransfer.toAmount) : "",
  );

  const [feeAmount, setFeeAmount] = useState(
    initialTransfer?.feeAmount !== undefined
      ? String(initialTransfer.feeAmount)
      : "0",
  );

  const [note, setNote] = useState(initialTransfer?.note ?? "");

  const fromAccount = accounts.find((account) => account.id === fromAccountId);
  const toAccount = accounts.find((account) => account.id === toAccountId);

  const isMultiCurrencyTransfer =
    Boolean(fromAccount && toAccount) &&
    fromAccount?.mainCurrency !== toAccount?.mainCurrency;

  const isBlockedByPlan = isMultiCurrencyTransfer && !canUseAdvancedTransfers;

  const availableDestinationAccounts = useMemo(
    () => accounts.filter((account) => account.id !== fromAccountId),
    [accounts, fromAccountId],
  );

  const parsedFromAmount = sanitizeMoneyValue(fromAmount);
  const parsedToAmount = sanitizeMoneyValue(toAmount);
  const parsedFeeAmount = sanitizeMoneyValue(feeAmount);

  const exchangeRate = calculateExchangeRate(parsedFromAmount, parsedToAmount);

  const fromAmountValidation = validatePositiveAmount(
    parsedFromAmount,
    t("movements.transferForm.fromAmount"),
  );

  const toAmountValidation = validatePositiveAmount(
    parsedToAmount,
    t("movements.transferForm.toAmount"),
  );

  const feeIsValid = Number.isFinite(parsedFeeAmount) && parsedFeeAmount >= 0;

  const totalDebitFromOrigin = parsedFromAmount + parsedFeeAmount;

  const originBalance =
    fromAccount && fromAccount.mainCurrency
      ? getAccountBalanceByCurrency(fromAccount, fromAccount.mainCurrency)
      : 0;

  const willLeaveNegativeBalance =
    Boolean(fromAccount) && originBalance - totalDebitFromOrigin < 0;

  const errorMessage = !fromAccount
    ? t("movements.transferForm.fromAccountRequired")
    : !toAccount
      ? t("movements.transferForm.toAccountRequired")
      : fromAccountId === toAccountId
        ? t("movements.transferForm.differentAccountsRequired")
        : isBlockedByPlan
          ? t("movements.transferForm.multiCurrencyBlockedByPlan")
          : !fromAmountValidation.isValid
            ? t("movements.transferForm.fromAmountRequired")
            : !toAmountValidation.isValid
              ? t("movements.transferForm.toAmountRequired")
              : !feeIsValid
                ? t("movements.transferForm.feeInvalid")
                : willLeaveNegativeBalance
                  ? t("movements.transferForm.insufficientBalance", {
                      defaultValue:
                        "No tienes dinero suficiente en la cuenta origen para esta transferencia.",
                    })
                  : undefined;

  const canSubmit = !errorMessage;

  const resolvedSubmitLabelI18nKey =
    submitLabelI18nKey ??
    (initialTransfer ? "accounts.saveChanges" : "movements.saveTransfer");

  const handleSubmit = () => {
    if (!canSubmit || !fromAccount || !toAccount) {
      return;
    }

    onSubmit({
      fromAccountId,
      toAccountId,

      fromAmount: parsedFromAmount,
      fromCurrency: fromAccount.mainCurrency,

      toAmount: parsedToAmount,
      toCurrency: toAccount.mainCurrency,

      feeAmount: parsedFeeAmount,
      feeCurrency: fromAccount.mainCurrency,

      exchangeRate,

      note,
      status: "confirmed",
      date: new Date().toISOString(),
    });

    setFromAccountId(accounts[0]?.id ?? "");
    setToAccountId(accounts[1]?.id ?? "");
    setFromAmount("");
    setToAmount("");
    setFeeAmount("0");
    setNote("");
  };

  return (
    <AppCard style={styles.form}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <AppText
            variant="subtitle"
            i18nKey={
              initialTransfer
                ? "movements.editTransfer"
                : "movements.newTransfer"
            }
          />

          <AppText
            variant="muted"
            i18nKey="movements.transferForm.description"
          />
        </View>

        <Pressable onPress={onCancel} style={styles.closeButton}>
          <X size={20} color={themeColors.textMuted} />
        </Pressable>
      </View>

      <OptionPicker
        labelI18nKey="movements.transferForm.fromAccount"
        placeholderI18nKey="common.select"
        value={fromAccountId}
        options={accounts.map((account) => ({
          value: account.id,
          label: account.name,
          description: t("movements.form.accountCurrency", {
            currency: account.mainCurrency,
            defaultValue: `Moneda: ${account.mainCurrency}`,
          }),
        }))}
        onChange={(nextAccountId) => {
          setFromAccountId(nextAccountId);

          if (toAccountId === nextAccountId) {
            const nextDestination = accounts.find(
              (account) => account.id !== nextAccountId,
            );

            setToAccountId(nextDestination?.id ?? "");
          }
        }}
      />

      <OptionPicker
        labelI18nKey="movements.transferForm.toAccount"
        placeholderI18nKey="common.select"
        value={toAccountId}
        options={availableDestinationAccounts.map((account) => ({
          value: account.id,
          label: account.name,
          description: t("movements.form.accountCurrency", {
            currency: account.mainCurrency,
            defaultValue: `Moneda: ${account.mainCurrency}`,
          }),
        }))}
        onChange={setToAccountId}
      />

      <View style={styles.field}>
        <AppText
          variant="caption"
          i18nKey="movements.transferForm.fromAmountWithCurrency"
          i18nValues={{ currency: fromAccount?.mainCurrency ?? "" }}
        />

        <TextInput
          value={fromAmount}
          onChangeText={setFromAmount}
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
        <AppText
          variant="caption"
          i18nKey="movements.transferForm.toAmountWithCurrency"
          i18nValues={{ currency: toAccount?.mainCurrency ?? "" }}
        />

        <TextInput
          value={toAmount}
          onChangeText={setToAmount}
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
        <AppText
          variant="caption"
          i18nKey="movements.transferForm.feeAmountWithCurrency"
          i18nValues={{ currency: fromAccount?.mainCurrency ?? "" }}
        />

        <TextInput
          value={feeAmount}
          onChangeText={setFeeAmount}
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

      <AppCard style={styles.rateCard}>
        <AppText
          variant="caption"
          i18nKey="movements.transferForm.calculatedExchangeRate"
        />

        <AppText>
          1 {fromAccount?.mainCurrency ?? "-"} ={" "}
          {exchangeRate > 0 ? exchangeRate.toFixed(6) : "0"}{" "}
          {toAccount?.mainCurrency ?? "-"}
        </AppText>
      </AppCard>

      <View style={styles.field}>
        <AppText variant="caption" i18nKey="movements.transferForm.note" />

        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder={t("movements.transferForm.notePlaceholder")}
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

      {isBlockedByPlan ? (
        <PlanLimitNotice
          titleI18nKey="movements.transferForm.multiCurrencyPlusTitle"
          descriptionI18nKey="movements.transferForm.multiCurrencyPlusDescription"
          ctaI18nKey="plans.plusPlan.cta"
          onUpgrade={() => router.push(routes.tabs.plans as never)}
        />
      ) : null}

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
          i18nKey={submitLabel ? undefined : resolvedSubmitLabelI18nKey}
        >
          {submitLabel}
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

  headerCopy: {
    flex: 1,
    gap: 4,
  },

  closeButton: {
    width: 38,
    height: 38,
    flexShrink: 0,
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

  rateCard: {
    gap: 6,
    padding: 16,
  },

  actions: {
    gap: 10,
  },
});
