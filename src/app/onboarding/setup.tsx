import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
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
        <AppText variant="caption">Paso {step + 1} de 3</AppText>

        <AppText variant="title">Configura tu experiencia</AppText>

        <AppText variant="muted">
          Estas respuestas personalizan la app sin obligarte a crear una cuenta.
        </AppText>
      </View>

      {step === 0 ? (
        <View style={styles.section}>
          <AppCard style={styles.card}>
            <AppText variant="subtitle">Moneda principal</AppText>

            <View style={styles.currencyGrid}>
              {currencies
                .filter((currency) => currency.type === "fiat")
                .map((currency) => {
                  const selected = mainCurrency === currency.code;

                  return (
                    <Pressable
                      key={currency.code}
                      onPress={() =>
                        setMainCurrency(currency.code as CurrencyCode)
                      }
                      style={[
                        styles.currencyButton,
                        {
                          backgroundColor: selected
                            ? themeColors.primary
                            : themeColors.cardSoft,
                          borderColor: selected
                            ? themeColors.primary
                            : themeColors.border,
                        },
                      ]}
                    >
                      <AppText
                        variant="caption"
                        style={{
                          color: selected ? "#FFFFFF" : themeColors.text,
                        }}
                      >
                        {currency.code}
                      </AppText>
                    </Pressable>
                  );
                })}
            </View>
          </AppCard>

          <SelectableOption
            title="Calcular patrimonio total"
            description="Suma bancos, efectivo, cripto y otras cuentas en un balance general."
            selected={shouldCalculateTotalNetWorth}
            onPress={() =>
              setShouldCalculateTotalNetWorth(!shouldCalculateTotalNetWorth)
            }
          />

          <OptionPicker
            label="Tipo de usuario"
            value={userProfileType}
            options={userProfileOptions}
            onChange={(value) => setUserProfileType(value as UserProfileType)}
          />
        </View>
      ) : null}

      {step === 1 ? (
        <View style={styles.section}>
          <OptionPicker
            label="Uso de criptomonedas"
            value={cryptoUsage}
            options={cryptoUsageOptions}
            onChange={(value) => setCryptoUsage(value as CryptoUsage)}
          />

          <OptionPicker
            label="Uso de múltiples monedas"
            value={multiCurrencyUsage}
            options={multiCurrencyOptions}
            onChange={(value) =>
              setMultiCurrencyUsage(value as MultiCurrencyUsage)
            }
          />
        </View>
      ) : null}

      {step === 2 ? (
        <View style={styles.section}>
          <OptionPicker
            label="Objetivo principal"
            value={financialGoal}
            options={financialGoalOptions}
            onChange={(value) => setFinancialGoal(value as FinancialGoal)}
          />

          <SelectableOption
            title="Activar recordatorios financieros"
            description="Te ayudará a recordar pagos, cobros, compras o ahorros."
            selected={wantsReminders}
            onPress={() => setWantsReminders(!wantsReminders)}
          />
        </View>
      ) : null}

      <View style={styles.actions}>
        <AppButton variant="secondary" onPress={goBack}>
          Atrás
        </AppButton>

        <AppButton onPress={goNext}>
          {step === 2 ? "Ver planes" : "Siguiente"}
        </AppButton>
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

  card: {
    gap: 14,
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

  options: {
    gap: 10,
  },

  actions: {
    gap: 10,
  },
});
