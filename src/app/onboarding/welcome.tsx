import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";
import { OptionPicker } from "@/components/ui/OptionPicker";
import { colors } from "@/constants/colors";
import { currencies, defaultCurrencyCode } from "@/constants/currencies";
import { onboardingSlides } from "@/constants/onboardingSlides";
import { routes } from "@/constants/routes";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { CurrencyCode } from "@/types/finance.types";

export default function OnboardingWelcomeScreen() {
  const { t } = useTranslation();

  const [currentStep, setCurrentStep] = useState(0);

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const mainCurrency = useAppSettingsStore((state) => state.mainCurrency);
  const setMainCurrency = useAppSettingsStore((state) => state.setMainCurrency);
  const completeOnboarding = useAppSettingsStore(
    (state) => state.completeOnboarding,
  );

  const currencyValue = mainCurrency ?? defaultCurrencyCode;

  const isCurrencyStep = currentStep === onboardingSlides.length;
  const currentSlide = onboardingSlides[currentStep];

  const currencyOptions = useMemo(
    () =>
      currencies.map((currency) => ({
        value: currency.code,
        label: `${currency.code} · ${currency.name}`,
        description:
          currency.type === "crypto"
            ? t("accounts.form.currencyCrypto")
            : currency.type === "fiat"
              ? t("accounts.form.currencyFiat")
              : t("accounts.form.currencyCustom"),
      })),
    [t],
  );

  const goNext = () => {
    if (!isCurrencyStep) {
      setCurrentStep((step) => step + 1);
      return;
    }

    completeOnboarding();
    router.replace(routes.tabs.home as never);
  };

  const skipIntro = () => {
    setCurrentStep(onboardingSlides.length);
  };

  const Icon = currentSlide?.icon;

  return (
    <Screen style={styles.screen}>
      <View style={styles.topBar}>
        <View style={styles.dots}>
          {[...onboardingSlides, { id: "currency" }].map((step, index) => {
            const active = index === currentStep;

            return (
              <View
                key={step.id}
                style={[
                  styles.dot,
                  {
                    width: active ? 22 : 7,
                    backgroundColor: active
                      ? themeColors.primary
                      : themeColors.border,
                  },
                ]}
              />
            );
          })}
        </View>

        {!isCurrencyStep ? (
          <Pressable onPress={skipIntro}>
            <AppText variant="caption" i18nKey="common.skip" />
          </Pressable>
        ) : null}
      </View>

      <View style={styles.content}>
        {!isCurrencyStep && Icon ? (
          <>
            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor: themeColors.accentSoft,
                  borderColor: themeColors.border,
                },
              ]}
            >
              <Icon size={42} color={themeColors.primary} />
            </View>

            <View style={styles.copy}>
              <AppText
                variant="title"
                i18nKey={currentSlide.titleI18nKey}
                style={styles.centerText}
              />

              <AppText
                variant="muted"
                i18nKey={currentSlide.descriptionI18nKey}
                style={styles.centerText}
              />
            </View>
          </>
        ) : (
          <>
            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor: themeColors.accentSoft,
                  borderColor: themeColors.border,
                },
              ]}
            >
              <WalletCurrencyIcon color={themeColors.primary} />
            </View>

            <View style={styles.copy}>
              <AppText
                variant="title"
                i18nKey="onboarding.v2.currency.title"
                style={styles.centerText}
              />

              <AppText
                variant="muted"
                i18nKey="onboarding.v2.currency.description"
                style={styles.centerText}
              />
            </View>

            <OptionPicker
              labelI18nKey="settings.mainCurrency"
              placeholderI18nKey="common.select"
              value={currencyValue}
              options={currencyOptions}
              onChange={(value) => setMainCurrency(value as CurrencyCode)}
            />
          </>
        )}
      </View>

      <View style={styles.footer}>
        <AppButton onPress={goNext}>
          {isCurrencyStep ? t("onboarding.v2.start") : t("common.continue")}
        </AppButton>
      </View>
    </Screen>
  );
}

function WalletCurrencyIcon({ color }: { color: string }) {
  return <ChevronRight size={42} color={color} />;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: 28,
    justifyContent: "space-between",
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dots: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  dot: {
    height: 7,
    borderRadius: 999,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    gap: 28,
  },

  iconBox: {
    width: 104,
    height: 104,
    borderRadius: 34,
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  copy: {
    gap: 10,
  },

  centerText: {
    textAlign: "center",
  },

  footer: {
    gap: 12,
  },
});
