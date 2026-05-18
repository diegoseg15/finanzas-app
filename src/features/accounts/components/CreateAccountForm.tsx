import { Check, X } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { InlineMessage } from "@/components/ui/InlineMessage";
import { OptionPicker } from "@/components/ui/OptionPicker";
import { SelectableOption } from "@/components/ui/SelectableOption";
import { accountTypes } from "@/constants/accountTypes";
import { colors } from "@/constants/colors";
import { currencies, defaultCurrencyCode } from "@/constants/currencies";
import { sanitizeMoneyValue } from "@/services/money.service";
import {
  validatePositiveAmount,
  validateRequiredText,
} from "@/services/validation.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import {
  Account,
  AccountType,
  CreateAccountInput,
  CurrencyCode,
} from "@/types/finance.types";

type CreateAccountFormProps = {
  initialAccount?: Account;
  submitLabel?: string;
  onSubmit: (input: CreateAccountInput) => void;
  onCancel: () => void;
};

export function CreateAccountForm({
  initialAccount,
  submitLabel = "Guardar cuenta",
  onSubmit,
  onCancel,
}: CreateAccountFormProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const [name, setName] = useState(initialAccount?.name ?? "");
  const [type, setType] = useState<AccountType>(initialAccount?.type ?? "bank");
  const [mainCurrency, setMainCurrency] = useState<CurrencyCode>(
    initialAccount?.mainCurrency ?? defaultCurrencyCode,
  );
  const [initialBalance, setInitialBalance] = useState(
    initialAccount?.balances[0]?.amount !== undefined
      ? String(initialAccount.balances[0].amount)
      : "0",
  );
  const [includeInTotalBalance, setIncludeInTotalBalance] = useState(
    initialAccount?.includeInTotalBalance ?? true,
  );

  const nameValidation = validateRequiredText(name, "El nombre de la cuenta");
  const amountValidation = initialBalance.trim()
    ? validatePositiveAmount(
        sanitizeMoneyValue(initialBalance),
        "El saldo inicial",
      )
    : { isValid: true };

  const errorMessage = !nameValidation.isValid
    ? nameValidation.message
    : !amountValidation.isValid
      ? amountValidation.message
      : undefined;

  const canSubmit = !errorMessage;

  const handleSubmit = () => {
    if (!canSubmit) {
      return;
    }

    onSubmit({
      name,
      type,
      mainCurrency,
      initialBalance: sanitizeMoneyValue(initialBalance),
      includeInTotalBalance,
    });

    setName("");
    setType("bank");
    setMainCurrency(defaultCurrencyCode);
    setInitialBalance("0");
    setIncludeInTotalBalance(true);
  };

  return (
    <AppCard style={styles.form}>
      <View style={styles.header}>
        <View>
          <AppText variant="subtitle">Nueva cuenta</AppText>
          <AppText variant="muted">
            Registra dónde tienes o debes dinero.
          </AppText>
        </View>

        <Pressable onPress={onCancel} style={styles.closeButton}>
          <X size={20} color={themeColors.textMuted} />
        </Pressable>
      </View>

      <View style={styles.field}>
        <AppText variant="caption">Nombre de la cuenta</AppText>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Ej: Banco Pichincha"
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
        <AppText variant="caption">Saldo inicial</AppText>
        <TextInput
          value={initialBalance}
          onChangeText={setInitialBalance}
          editable={!initialAccount}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={themeColors.textMuted}
          style={[
            styles.input,
            {
              backgroundColor: themeColors.cardSoft,
              borderColor: themeColors.border,
              color: themeColors.text,
              opacity: initialAccount ? 0.55 : 1,
            },
          ]}
        />
      </View>

      <OptionPicker
        label="Tipo de cuenta"
        value={type}
        options={accountTypes.map((accountType) => ({
          value: accountType.value,
          label: accountType.label,
          description: accountType.description,
        }))}
        onChange={setType}
      />

      <View style={styles.field}>
        <AppText variant="caption">Moneda principal</AppText>

        <View style={styles.currencyGrid}>
          {currencies.map((currency) => (
            <Pressable
              key={currency.code}
              onPress={() => {
                if (initialAccount) {
                  return;
                }

                setMainCurrency(currency.code);
              }}
              style={[
                styles.currencyButton,
                {
                  opacity: initialAccount ? 0.55 : 1,
                  backgroundColor:
                    mainCurrency === currency.code
                      ? themeColors.primary
                      : themeColors.cardSoft,
                  borderColor:
                    mainCurrency === currency.code
                      ? themeColors.primary
                      : themeColors.border,
                },
              ]}
            >
              <AppText
                variant="caption"
                style={{
                  color:
                    mainCurrency === currency.code
                      ? "#FFFFFF"
                      : themeColors.text,
                }}
              >
                {currency.code}
              </AppText>
            </Pressable>
          ))}
        </View>
      </View>

      <SelectableOption
        title="Sumar al patrimonio total"
        description="Activa esto si quieres que esta cuenta afecte tu balance general."
        selected={includeInTotalBalance}
        onPress={() => setIncludeInTotalBalance(!includeInTotalBalance)}
        leftSlot={
          includeInTotalBalance ? <Check size={18} color="#FFFFFF" /> : null
        }
      />

      {errorMessage ? (
        <InlineMessage type="error" message={errorMessage} />
      ) : null}

      <View style={styles.actions}>
        <AppButton variant="secondary" onPress={onCancel}>
          Cancelar
        </AppButton>

        <AppButton onPress={handleSubmit} disabled={!canSubmit}>
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

  options: {
    gap: 10,
  },

  currencyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  currencyButton: {
    minWidth: 68,
    minHeight: 42,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },

  actions: {
    gap: 10,
  },
});
