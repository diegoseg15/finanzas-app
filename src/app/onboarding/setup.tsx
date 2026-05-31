import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";
import { OptionPicker } from "@/components/ui/OptionPicker";
import { SelectableOption } from "@/components/ui/SelectableOption";
import { colors } from "@/constants/colors";
import { currencies } from "@/constants/currencies";
import {
  cryptoUsageOptions,
  financialGoalOptions,
  multiCurrencyOptions,
  userProfileOptions,
} from "@/constants/onboardingOptions";
import { routes } from "@/constants/routes";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { CurrencyCode } from "@/types/finance.types";
import {
  CryptoUsage,
  FinancialGoal,
  MultiCurrencyUsage,
  UserProfileType,
} from "@/types/onboarding.types";

type SetupStep = 0 | 1 | 2;

export default function SetupScreen() {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const mainCurrency = useAppSettingsStore((state) => state.mainCurrency);
  const shouldCalculateTotalNetWorth = useAppSettingsStore(
    (state) => state.shouldCalculateTotalNetWorth,
  );
  const userProfileType = useAppSettingsStore((state) => state.userProfileType);
  const cryptoUsage = useAppSettingsStore((state) => state.cryptoUsage);
  const multiCurrencyUsage = useAppSettingsStore(
    (state) => state.multiCurrencyUsage,
  );
  const financialGoal = useAppSettingsStore((state) => state.financialGoal);
  const wantsReminders = useAppSettingsStore((state) => state.wantsReminders);

  const setMainCurrency = useAppSettingsStore((state) => state.setMainCurrency);
  const setShouldCalculateTotalNetWorth = useAppSettingsStore(
    (state) => state.setShouldCalculateTotalNetWorth,
  );
  const setUserProfileType = useAppSettingsStore(
    (state) => state.setUserProfileType,
  );
  const setCryptoUsage = useAppSettingsStore((state) => state.setCryptoUsage);
  const setMultiCurrencyUsage = useAppSettingsStore(
    (state) => state.setMultiCurrencyUsage,
  );
  const setFinancialGoal = useAppSettingsStore(
    (state) => state.setFinancialGoal,
  );
  const setWantsReminders = useAppSettingsStore(
    (state) => state.setWantsReminders,
  );

  const [step, setStep] = useState<SetupStep>(0);

  const goNext = () => {
    if (step === 2) {
      router.push(routes.onboarding.plans as never);
      return;
    }

    setStep((currentStep) => (currentStep + 1) as SetupStep);
  };

  const goBack = () => {
    if (step === 0) {
      router.back();
      return;
    }

    setStep((currentStep) => (currentStep - 1) as SetupStep);
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <AppText
          variant="caption"
          i18nKey="onboarding.setup.stepLabel"
          i18nValues={{
            step: step + 1,
            total: 3,
          }}
        />

        <AppText variant="title" i18nKey="onboarding.setup.title" />

        <AppText variant="muted" i18nKey="onboarding.setup.description" />
      </View>

      {step === 0 ? (
        <View style={styles.section}>
          <OptionPicker
            labelI18nKey="onboarding.stepOne.mainCurrency"
            placeholderI18nKey="common.select"
            value={mainCurrency}
            options={currencies
              .filter((currency) => currency.type === "fiat")
              .map((currency) => ({
                value: currency.code,
                label: currency.name,
                description: `${currency.code} · ${currency.symbol}`,
              }))}
            onChange={(value) => setMainCurrency(value as CurrencyCode)}
          />

          <SelectableOption
            titleI18nKey="onboarding.stepOne.calculateTotalNetWorth"
            descriptionI18nKey="onboarding.stepOne.calculateTotalNetWorthDescription"
            selected={shouldCalculateTotalNetWorth}
            onPress={() =>
              setShouldCalculateTotalNetWorth(!shouldCalculateTotalNetWorth)
            }
          />

          <OptionPicker
            labelI18nKey="onboarding.stepOne.userType"
            placeholderI18nKey="common.select"
            value={userProfileType}
            options={userProfileOptions.map((option) => ({
              value: option.value,
              labelI18nKey: `onboarding.options.userProfile.${option.value}.label`,
              descriptionI18nKey: `onboarding.options.userProfile.${option.value}.description`,
            }))}
            onChange={(value) => setUserProfileType(value as UserProfileType)}
          />
        </View>
      ) : null}

      {step === 1 ? (
        <View style={styles.section}>
          <OptionPicker
            labelI18nKey="onboarding.stepTwo.cryptoUsage"
            placeholderI18nKey="common.select"
            value={cryptoUsage}
            options={cryptoUsageOptions.map((option) => ({
              value: option.value,
              labelI18nKey: `onboarding.options.cryptoUsage.${option.value}.label`,
              descriptionI18nKey: `onboarding.options.cryptoUsage.${option.value}.description`,
            }))}
            onChange={(value) => setCryptoUsage(value as CryptoUsage)}
          />

          <OptionPicker
            labelI18nKey="onboarding.stepTwo.multiCurrencyUsage"
            placeholderI18nKey="common.select"
            value={multiCurrencyUsage}
            options={multiCurrencyOptions.map((option) => ({
              value: option.value,
              labelI18nKey: `onboarding.options.multiCurrencyUsage.${option.value}.label`,
              descriptionI18nKey: `onboarding.options.multiCurrencyUsage.${option.value}.description`,
            }))}
            onChange={(value) =>
              setMultiCurrencyUsage(value as MultiCurrencyUsage)
            }
          />
        </View>
      ) : null}

      {step === 2 ? (
        <View style={styles.section}>
          <OptionPicker
            labelI18nKey="onboarding.stepThree.mainGoal"
            placeholderI18nKey="common.select"
            value={financialGoal}
            options={financialGoalOptions.map((option) => ({
              value: option.value,
              labelI18nKey: `onboarding.options.financialGoal.${option.value}.label`,
              descriptionI18nKey: `onboarding.options.financialGoal.${option.value}.description`,
            }))}
            onChange={(value) => setFinancialGoal(value as FinancialGoal)}
          />

          <SelectableOption
            titleI18nKey="onboarding.stepThree.activateFinancialReminders"
            descriptionI18nKey="onboarding.stepThree.activateFinancialRemindersDescription"
            selected={wantsReminders}
            onPress={() => setWantsReminders(!wantsReminders)}
          />
        </View>
      ) : null}

      <View style={styles.actions}>
        <AppButton variant="secondary" onPress={goBack} i18nKey="common.back" />

        <AppButton
          onPress={goNext}
          i18nKey={
            step === 2 ? "onboarding.stepThree.viewPlans" : "common.next"
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },

  header: {
    gap: 10,
  },

  section: {
    flex: 1,
    gap: 18,
  },

  options: {
    gap: 10,
  },

  actions: {
    gap: 10,
  },
});
