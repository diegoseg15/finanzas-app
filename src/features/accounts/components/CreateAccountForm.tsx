import { Check, X } from "lucide-react-native";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { InlineMessage } from "@/components/ui/InlineMessage";
import { OptionPicker } from "@/components/ui/OptionPicker";
import { SelectableOption } from "@/components/ui/SelectableOption";
import { getSelectableAccountTypes } from "@/constants/accountTypes";
import { colors } from "@/constants/colors";
import { currencies, defaultCurrencyCode } from "@/constants/currencies";
import { AccountCardDesignSlider } from "@/features/accounts/components/AccountCardDesignSlider";
import { sanitizeMoneyValue } from "@/services/money.service";
import { isPlusPlan } from "@/services/subscription.service";
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

type AccountFormStep = 0 | 1 | 2;

export function CreateAccountForm({
  initialAccount,
  submitLabel,
  submitLabelI18nKey,
  onSubmit,
  onCancel,
}: CreateAccountFormProps) {
  const { t } = useTranslation();

  const [step, setStep] = useState<AccountFormStep>(0);

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const appMainCurrency = useAppSettingsStore((state) => state.mainCurrency);
  const subscription = useSubscriptionStore((state) => state.subscription);
  const isPlusUser = isPlusPlan(subscription);

  const selectableAccountTypes = getSelectableAccountTypes();

  const [name, setName] = useState(initialAccount?.name ?? "");
  const [institutionName, setInstitutionName] = useState(
    initialAccount?.institutionName ?? "",
  );
  const [type, setType] = useState<AccountType>(initialAccount?.type ?? "bank");

  const shouldShowInstitutionNameField =
    type !== "cash" && type !== "piggy_bank";

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

  const nameValidation = validateRequiredText(name, t("accounts.form.name"));

  const amountValidation =
    initialBalance.trim().length === 0
      ? {
          isValid: false,
          message: t("accounts.form.initialBalanceRequired"),
        }
      : Number.isFinite(parsedInitialBalance) && parsedInitialBalance >= 0
        ? {
            isValid: true,
            message: "",
          }
        : {
            isValid: false,
            message: t("accounts.form.initialBalanceError"),
          };

  const stepErrorMessage =
    step === 0 && !nameValidation.isValid
      ? t("accounts.form.nameRequired")
      : step === 1 && !amountValidation.isValid
        ? amountValidation.message
        : undefined;

  const canGoNext = !stepErrorMessage;

  const safeInitialBalance = Math.max(parsedInitialBalance, 0);

  const resolvedSubmitLabelI18nKey =
    submitLabelI18nKey ??
    (initialAccount ? "accounts.saveChanges" : "accounts.saveAccount");

  const goNext = () => {
    if (!canGoNext) {
      return;
    }

    setStep((currentStep) => Math.min(currentStep + 1, 2) as AccountFormStep);
  };

  const goBack = () => {
    setStep((currentStep) => Math.max(currentStep - 1, 0) as AccountFormStep);
  };

  const handleSubmit = () => {
    if (!canGoNext) {
      return;
    }

    onSubmit({
      name,
      type,
      mainCurrency,
      initialBalance: safeInitialBalance,
      includeInTotalBalance,
      institutionName: shouldShowInstitutionNameField
        ? institutionName
        : undefined,
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
    setStep(0);
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
            i18nKey={`accounts.form.steps.${step}.description`}
          />
        </View>

        <Pressable onPress={onCancel} style={styles.closeButton}>
          <X size={20} color={themeColors.textMuted} />
        </Pressable>
      </View>

      <StepIndicator currentStep={step} />

      {step === 0 ? (
        <View style={styles.stepContent}>
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

          <OptionPicker
            labelI18nKey="accounts.form.type"
            placeholderI18nKey="common.select"
            value={type}
            options={selectableAccountTypes.map((accountType) => ({
              value: accountType.value,
              labelI18nKey: `accounts.types.${accountType.value}.label`,
              descriptionI18nKey: `accounts.types.${accountType.value}.description`,
            }))}
            onChange={(nextType) => {
              setType(nextType);

              if (nextType === "cash" || nextType === "piggy_bank") {
                setInstitutionName("");
              }
            }}
          />

          {shouldShowInstitutionNameField ? (
            <View style={styles.field}>
              <View style={styles.labelRow}>
                <AppText
                  variant="caption"
                  i18nKey="accounts.form.institutionName"
                />

                <AppText variant="caption" i18nKey="common.optional" />
              </View>

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
          ) : null}
        </View>
      ) : null}

      {step === 1 ? (
        <View style={styles.stepContent}>
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
              <AppText
                variant="caption"
                i18nKey="accounts.form.balanceEditInfo"
              />
            ) : null}
          </View>

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
            titleI18nKey="accounts.form.includeInTotal"
            descriptionI18nKey="accounts.form.includeInTotalDescription"
            selected={includeInTotalBalance}
            onPress={() => setIncludeInTotalBalance(!includeInTotalBalance)}
            leftSlot={
              includeInTotalBalance ? <Check size={18} color="#FFFFFF" /> : null
            }
          />

          <SelectableOption
            titleI18nKey="accounts.form.pinAccount"
            descriptionI18nKey="accounts.form.pinAccountDescription"
            selected={isPinned}
            onPress={() => setIsPinned(!isPinned)}
            leftSlot={isPinned ? <Check size={18} color="#FFFFFF" /> : null}
          />
        </View>
      ) : null}

      {step === 2 ? (
        <View style={styles.stepContent}>
          <AccountCardDesignSlider
            value={cardDesign}
            isPlusUser={isPlusUser}
            onChange={setCardDesign}
          />
        </View>
      ) : null}

      {stepErrorMessage ? (
        <InlineMessage type="error" message={stepErrorMessage} />
      ) : null}

      <View style={styles.actions}>
        {step > 0 ? (
          <AppButton
            variant="secondary"
            onPress={goBack}
            i18nKey="common.back"
          />
        ) : (
          <AppButton
            variant="secondary"
            onPress={onCancel}
            i18nKey="common.cancel"
          />
        )}

        {step < 2 ? (
          <AppButton
            onPress={goNext}
            disabled={!canGoNext}
            i18nKey="common.next"
          />
        ) : (
          <AppButton
            onPress={handleSubmit}
            disabled={!canGoNext}
            i18nKey={submitLabel ? undefined : resolvedSubmitLabelI18nKey}
          >
            {submitLabel}
          </AppButton>
        )}
      </View>
    </AppCard>
  );
}

function StepIndicator({ currentStep }: { currentStep: AccountFormStep }) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <View style={styles.stepIndicator}>
      {[0, 1, 2].map((step) => {
        const active = step <= currentStep;

        return (
          <View
            key={step}
            style={[
              styles.stepDot,
              {
                backgroundColor: active
                  ? themeColors.primary
                  : themeColors.border,
              },
            ]}
          />
        );
      })}
    </View>
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

  stepIndicator: {
    flexDirection: "row",
    gap: 8,
  },

  stepDot: {
    flex: 1,
    height: 5,
    borderRadius: 999,
  },

  stepContent: {
    gap: 18,
  },

  field: {
    gap: 8,
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  input: {
    minHeight: 54,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "600",
  },

  actions: {
    gap: 10,
  },
});
