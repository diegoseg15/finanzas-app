import { Check, Lock, X } from "lucide-react-native";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { InlineMessage } from "@/components/ui/InlineMessage";
import { OptionPicker } from "@/components/ui/OptionPicker";
import { SelectableOption } from "@/components/ui/SelectableOption";
import { accountCardDesigns } from "@/constants/accountCardDesigns";
import { accountTypes } from "@/constants/accountTypes";
import { colors } from "@/constants/colors";
import { currencies, defaultCurrencyCode } from "@/constants/currencies";
import { sanitizeMoneyValue } from "@/services/money.service";
import { validateRequiredText } from "@/services/validation.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import {
  Account,
  AccountCardDesign,
  AccountType,
  CreateAccountInput,
  CurrencyCode,
} from "@/types/finance.types";

type CreateAccountFormProps = {
  initialAccount?: Account;
  submitLabel?: string;
  submitLabelI18nKey?: string;
  onSubmit: (input: CreateAccountInput) => void;
  onCancel: () => void;
};

export function CreateAccountForm({
  initialAccount,
  submitLabel,
  submitLabelI18nKey,
  onSubmit,
  onCancel,
}: CreateAccountFormProps) {
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const appMainCurrency = useAppSettingsStore((state) => state.mainCurrency);
  const subscription = useSubscriptionStore((state) => state.subscription);

  const isPlusUser = subscription.plan === "plus";

  const [name, setName] = useState(initialAccount?.name ?? "");
  const [institutionName, setInstitutionName] = useState(
    initialAccount?.institutionName ?? "",
  );
  const [type, setType] = useState<AccountType>(initialAccount?.type ?? "bank");
  const [mainCurrency, setMainCurrency] = useState<CurrencyCode>(
    initialAccount?.mainCurrency ?? appMainCurrency ?? defaultCurrencyCode,
  );
  const [initialBalance, setInitialBalance] = useState(
    initialAccount?.balances[0]?.amount !== undefined
      ? String(initialAccount.balances[0].amount)
      : "0",
  );
  const [includeInTotalBalance, setIncludeInTotalBalance] = useState(
    initialAccount?.includeInTotalBalance ?? true,
  );
  const [isPinned, setIsPinned] = useState(initialAccount?.isPinned ?? false);
  const [cardDesign, setCardDesign] = useState<AccountCardDesign>(
    initialAccount?.cardDesign ?? "default",
  );

  const orderedCurrencies = useMemo(() => {
    const preferredCurrency = currencies.find(
      (currency) => currency.code === appMainCurrency,
    );

    const otherCurrencies = currencies.filter(
      (currency) => currency.code !== appMainCurrency,
    );

    return preferredCurrency
      ? [preferredCurrency, ...otherCurrencies]
      : currencies;
  }, [appMainCurrency]);

  const parsedInitialBalance = sanitizeMoneyValue(initialBalance);

  const initialBalanceError =
    !Number.isFinite(parsedInitialBalance) || parsedInitialBalance < 0
      ? t("accounts.form.initialBalanceError")
      : undefined;

  const nameValidation = validateRequiredText(name, t("accounts.form.name"));

  const amountValidation =
    initialBalance.trim().length === 0
      ? {
          isValid: false,
          message: t("accounts.form.initialBalanceRequired"),
        }
      : Number.isFinite(parsedInitialBalance) && parsedInitialBalance >= 0
        ? { isValid: true }
        : {
            isValid: false,
            message: t("accounts.form.initialBalanceError"),
          };

  const errorMessage = !nameValidation.isValid
    ? t("accounts.form.nameRequired")
    : !amountValidation.isValid
      ? amountValidation.message
      : undefined;

  const canSubmit = !initialBalanceError && !errorMessage;

  const safeInitialBalance = Math.max(parsedInitialBalance, 0);

  const resolvedSubmitLabelI18nKey =
    submitLabelI18nKey ??
    (initialAccount ? "accounts.saveChanges" : "accounts.saveAccount");

  const handleSubmit = () => {
    if (!canSubmit) {
      return;
    }

    onSubmit({
      name,
      type,
      mainCurrency,
      initialBalance: safeInitialBalance,
      includeInTotalBalance,
      institutionName,
      isPinned,
      cardDesign: isPlusUser ? cardDesign : "default",
    });

    setName("");
    setInstitutionName("");
    setType("bank");
    setMainCurrency(appMainCurrency ?? defaultCurrencyCode);
    setInitialBalance("0");
    setIncludeInTotalBalance(true);
    setIsPinned(false);
    setCardDesign("default");
  };

  return (
    <AppCard style={styles.form}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <AppText
            variant="subtitle"
            i18nKey={
              initialAccount
                ? "accounts.form.editTitle"
                : "accounts.form.createTitle"
            }
          />

          <AppText
            variant="muted"
            i18nKey={
              initialAccount
                ? "accounts.form.editDescription"
                : "accounts.form.createDescription"
            }
          />
        </View>

        <Pressable onPress={onCancel} style={styles.closeButton}>
          <X size={20} color={themeColors.textMuted} />
        </Pressable>
      </View>

      <View style={styles.field}>
        <AppText variant="caption" i18nKey="accounts.form.name" />

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={t("accounts.form.namePlaceholder")}
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
        <AppText variant="caption" i18nKey="accounts.form.institutionName" />

        <TextInput
          value={institutionName}
          onChangeText={setInstitutionName}
          placeholder={t("accounts.form.institutionNamePlaceholder")}
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
          i18nKey={
            initialAccount
              ? "accounts.form.currentBalance"
              : "accounts.form.initialBalance"
          }
        />

        <TextInput
          value={initialBalance}
          onChangeText={(value) => {
            const normalizedValue = value.replace("-", "");
            setInitialBalance(normalizedValue);
          }}
          editable={!initialAccount}
          keyboardType="decimal-pad"
          placeholder={t("accounts.form.balancePlaceholder")}
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

        {initialAccount ? (
          <AppText variant="caption" i18nKey="accounts.form.balanceEditInfo" />
        ) : null}
      </View>

      <OptionPicker
        labelI18nKey="accounts.form.type"
        placeholderI18nKey="common.select"
        value={type}
        options={accountTypes.map((accountType) => ({
          value: accountType.value,
          labelI18nKey: `accounts.types.${accountType.value}.label`,
          descriptionI18nKey: `accounts.types.${accountType.value}.description`,
        }))}
        onChange={setType}
      />

      <OptionPicker
        labelI18nKey="accounts.form.mainCurrency"
        placeholderI18nKey="common.select"
        value={mainCurrency}
        options={orderedCurrencies.map((currency) => ({
          value: currency.code,
          label: `${currency.code} · ${currency.name}`,
          descriptionI18nKey:
            currency.type === "crypto"
              ? "accounts.form.currencyCrypto"
              : currency.type === "fiat"
                ? "accounts.form.currencyFiat"
                : "accounts.form.currencyCustom",
        }))}
        onChange={(value) => {
          if (initialAccount) {
            return;
          }

          setMainCurrency(value as CurrencyCode);
        }}
      />

      {initialAccount ? (
        <InlineMessage
          type="info"
          message={t("accounts.form.currencyEditInfo")}
        />
      ) : null}

      <SelectableOption
        titleI18nKey="accounts.form.pinAccount"
        descriptionI18nKey="accounts.form.pinAccountDescription"
        selected={isPinned}
        onPress={() => setIsPinned(!isPinned)}
        leftSlot={isPinned ? <Check size={18} color="#FFFFFF" /> : null}
      />

      <SelectableOption
        titleI18nKey="accounts.form.includeInTotal"
        descriptionI18nKey="accounts.form.includeInTotalDescription"
        selected={includeInTotalBalance}
        onPress={() => setIncludeInTotalBalance(!includeInTotalBalance)}
        leftSlot={
          includeInTotalBalance ? <Check size={18} color="#FFFFFF" /> : null
        }
      />

      <View style={styles.premiumBlock}>
        <View style={styles.premiumHeader}>
          <View style={styles.premiumCopy}>
            <AppText variant="caption" i18nKey="accounts.form.cardDesign" />

            {!isPlusUser ? (
              <AppText
                variant="caption"
                i18nKey="accounts.form.cardDesignPlusOnly"
              />
            ) : null}
          </View>

          {!isPlusUser ? (
            <Lock size={18} color={themeColors.textMuted} />
          ) : null}
        </View>

        <OptionPicker
          labelI18nKey="accounts.form.cardDesign"
          placeholderI18nKey="common.select"
          value={cardDesign}
          options={accountCardDesigns.map((design) => ({
            value: design.value,
            labelI18nKey: design.labelI18nKey,
            descriptionI18nKey: design.descriptionI18nKey,
          }))}
          onChange={(value) => {
            if (!isPlusUser) {
              return;
            }

            setCardDesign(value as AccountCardDesign);
          }}
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

  premiumBlock: {
    gap: 10,
  },

  premiumHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  premiumCopy: {
    flex: 1,
    gap: 2,
  },

  actions: {
    gap: 10,
  },
});
