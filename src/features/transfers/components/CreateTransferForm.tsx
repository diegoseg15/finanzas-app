import { X } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { SelectableOption } from "@/components/ui/SelectableOption";
import { colors } from "@/constants/colors";
import { sanitizeMoneyValue } from "@/services/money.service";
import { calculateExchangeRate } from "@/services/transfer.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { Account, CreateTransferInput } from "@/types/finance.types";

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

  const [fromAccountId, setFromAccountId] = useState(accounts[0]?.id ?? "");
  const [toAccountId, setToAccountId] = useState(accounts[1]?.id ?? "");

  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [feeAmount, setFeeAmount] = useState("0");
  const [note, setNote] = useState("");

  const fromAccount = accounts.find((account) => account.id === fromAccountId);
  const toAccount = accounts.find((account) => account.id === toAccountId);

  const availableDestinationAccounts = useMemo(
    () => accounts.filter((account) => account.id !== fromAccountId),
    [accounts, fromAccountId],
  );

  const parsedFromAmount = sanitizeMoneyValue(fromAmount);
  const parsedToAmount = sanitizeMoneyValue(toAmount);
  const parsedFeeAmount = sanitizeMoneyValue(feeAmount);

  const exchangeRate = calculateExchangeRate(parsedFromAmount, parsedToAmount);

  const canSubmit =
    Boolean(fromAccount) &&
    Boolean(toAccount) &&
    fromAccountId !== toAccountId &&
    parsedFromAmount > 0 &&
    parsedToAmount > 0;

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

      <View style={styles.field}>
        <AppText variant="caption">Cuenta origen</AppText>

        <View style={styles.options}>
          {accounts.map((account) => (
            <SelectableOption
              key={account.id}
              title={account.name}
              description={`Moneda: ${account.mainCurrency}`}
              selected={fromAccountId === account.id}
              onPress={() => {
                setFromAccountId(account.id);

                if (toAccountId === account.id) {
                  const nextDestination = accounts.find(
                    (item) => item.id !== account.id,
                  );

                  setToAccountId(nextDestination?.id ?? "");
                }
              }}
            />
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <AppText variant="caption">Cuenta destino</AppText>

        <View style={styles.options}>
          {availableDestinationAccounts.map((account) => (
            <SelectableOption
              key={account.id}
              title={account.name}
              description={`Moneda: ${account.mainCurrency}`}
              selected={toAccountId === account.id}
              onPress={() => setToAccountId(account.id)}
            />
          ))}
        </View>
      </View>

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
