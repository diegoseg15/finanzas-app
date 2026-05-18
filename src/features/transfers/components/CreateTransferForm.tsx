import { X } from "lucide-react-native";
import { useMemo, useState } from "react";
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
import { Account, CreateTransferInput } from "@/types/finance.types";
import { router } from "expo-router";

type CreateTransferFormProps = {
  accounts: Account[];
  onSubmit: (input: CreateTransferInput) => void;
  onCancel: () => void;
};

export function CreateTransferForm({
  accounts,
  onSubmit,
  onCancel,
}: CreateTransferFormProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];
  const subscription = useSubscriptionStore((state) => state.subscription);
  const canUseAdvancedTransfers = canUseMultiCurrencyTransfers(subscription);

  const [fromAccountId, setFromAccountId] = useState(accounts[0]?.id ?? "");
  const [toAccountId, setToAccountId] = useState(accounts[1]?.id ?? "");

  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [feeAmount, setFeeAmount] = useState("0");
  const [note, setNote] = useState("");

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
    "El monto enviado",
  );

  const toAmountValidation = validatePositiveAmount(
    parsedToAmount,
    "El monto recibido",
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
    ? "Selecciona una cuenta origen."
    : !toAccount
      ? "Selecciona una cuenta destino."
      : fromAccountId === toAccountId
        ? "La cuenta origen y destino deben ser diferentes."
        : isBlockedByPlan
          ? "El plan gratuito solo permite transferencias entre cuentas con la misma moneda."
          : !fromAmountValidation.isValid
            ? fromAmountValidation.message
            : !toAmountValidation.isValid
              ? toAmountValidation.message
              : !feeIsValid
                ? "La comisión no puede ser negativa."
                : undefined;

  const warningMessage = willLeaveNegativeBalance
    ? "Esta transferencia dejará la cuenta origen con saldo negativo."
    : undefined;

  const canSubmit = !errorMessage;

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
        <View>
          <AppText variant="subtitle">Nueva transferencia</AppText>
          <AppText variant="muted">
            Mueve dinero entre cuentas y registra comisión o cambio de moneda.
          </AppText>
        </View>

        <Pressable onPress={onCancel} style={styles.closeButton}>
          <X size={20} color={themeColors.textMuted} />
        </Pressable>
      </View>

      <OptionPicker
        label="Cuenta origen"
        value={fromAccountId}
        options={accounts.map((account) => ({
          value: account.id,
          label: account.name,
          description: `Moneda: ${account.mainCurrency}`,
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
        label="Cuenta destino"
        value={toAccountId}
        options={availableDestinationAccounts.map((account) => ({
          value: account.id,
          label: account.name,
          description: `Moneda: ${account.mainCurrency}`,
        }))}
        onChange={setToAccountId}
      />

      <View style={styles.field}>
        <AppText variant="caption">
          Monto enviado {fromAccount ? `(${fromAccount.mainCurrency})` : ""}
        </AppText>

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
        <AppText variant="caption">
          Monto recibido {toAccount ? `(${toAccount.mainCurrency})` : ""}
        </AppText>

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
        <AppText variant="caption">
          Comisión {fromAccount ? `(${fromAccount.mainCurrency})` : ""}
        </AppText>

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
        <AppText variant="caption">Tipo de cambio calculado</AppText>

        <AppText>
          1 {fromAccount?.mainCurrency ?? "-"} ={" "}
          {exchangeRate > 0 ? exchangeRate.toFixed(6) : "0"}{" "}
          {toAccount?.mainCurrency ?? "-"}
        </AppText>
      </AppCard>

      <View style={styles.field}>
        <AppText variant="caption">Nota opcional</AppText>

        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Ej: transferencia a Binance, cambio USD a USDT..."
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
          title="Transferencia entre monedas disponible en Plus"
          description="En el plan gratuito puedes transferir entre cuentas con la misma moneda. Para transferencias con cambio de moneda, activa Plus."
          onUpgrade={() => router.push(routes.tabs.plans as never)}
        />
      ) : null}

      {warningMessage ? (
        <InlineMessage type="warning" message={warningMessage} />
      ) : null}

      {errorMessage ? (
        <InlineMessage type="error" message={errorMessage} />
      ) : null}

      <View style={styles.actions}>
        <AppButton variant="secondary" onPress={onCancel}>
          Cancelar
        </AppButton>

        <AppButton onPress={handleSubmit} disabled={!canSubmit}>
          Guardar transferencia
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

  rateCard: {
    gap: 6,
    padding: 16,
  },

  actions: {
    gap: 10,
  },
});
