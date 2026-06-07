import { router } from "expo-router";
import {
  ArrowLeft,
  BellRing,
  Check,
  Crown,
  WalletCards,
} from "lucide-react-native";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";
import { OptionPicker } from "@/components/ui/OptionPicker";
import { colors } from "@/constants/colors";
import { currencies, defaultCurrencyCode } from "@/constants/currencies";
import { onboardingSlides } from "@/constants/onboardingSlides";
import { routes } from "@/constants/routes";
import { hasPlusAccess, isLegacyTester } from "@/services/subscription.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { CurrencyCode } from "@/types/finance.types";

type OnboardingFinalStep = "currency" | "plans";

const totalSteps = onboardingSlides.length + 2;

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

  const subscription = useSubscriptionStore((state) => state.subscription);

  const hasPlus = hasPlusAccess(subscription);
  const legacyTester = isLegacyTester(subscription);

  const currencyValue = mainCurrency ?? defaultCurrencyCode;

  const finalStepIndex = currentStep - onboardingSlides.length;
  const finalStep: OnboardingFinalStep | null =
    finalStepIndex === 0 ? "currency" : finalStepIndex === 1 ? "plans" : null;

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

  const canGoBack = currentStep > 0;
  const isLastStep = currentStep === totalSteps - 1;

  const goBack = () => {
    if (!canGoBack) {
      return;
    }

    setCurrentStep((step) => step - 1);
  };

  const goNext = () => {
    if (!isLastStep) {
      setCurrentStep((step) => step + 1);
      return;
    }

    completeOnboarding();
    router.replace(routes.tabs.home as never);
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: themeColors.background,
        },
      ]}
    >
      <View style={styles.screen}>
        <View style={styles.topBar}>
          <Pressable
            disabled={!canGoBack}
            onPress={goBack}
            style={[
              styles.backButton,
              {
                opacity: canGoBack ? 1 : 0,
              },
            ]}
          >
            <ArrowLeft size={22} color={themeColors.text} />
          </Pressable>

          <View style={styles.dots}>
            {Array.from({ length: totalSteps }).map((_, index) => {
              const active = index === currentStep;

              return (
                <View
                  key={index}
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

          <View style={styles.backButton} />
        </View>

        <View style={styles.content}>
          {currentSlide ? (
            <>
              <OnboardingVisual kind={currentSlide.kind} />

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
          ) : null}

          {finalStep === "currency" ? (
            <>
              <CurrencyVisual />

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
          ) : null}

          {finalStep === "plans" ? (
            <>
              <PlansVisual hasPlus={hasPlus} legacyTester={legacyTester} />

              <View style={styles.copy}>
                <AppText
                  variant="title"
                  i18nKey="onboarding.v2.plans.title"
                  style={styles.centerText}
                />

                <AppText
                  variant="muted"
                  i18nKey="onboarding.v2.plans.description"
                  style={styles.centerText}
                />
              </View>
            </>
          ) : null}
        </View>

        <View style={styles.footer}>
          <AppButton onPress={goNext}>
            {isLastStep ? t("onboarding.v2.start") : t("common.continue")}
          </AppButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

function OnboardingVisual({
  kind,
}: {
  kind: (typeof onboardingSlides)[number]["kind"];
}) {
  if (kind === "welcome") {
    return <WelcomeVisual />;
  }

  if (kind === "accounts") {
    return <AccountsVisual />;
  }

  if (kind === "movements") {
    return <MovementsVisual />;
  }

  if (kind === "analytics") {
    return <AnalyticsVisual />;
  }

  return <RemindersVisual />;
}

function WelcomeVisual() {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <View style={styles.visualCenter}>
      <View
        style={[
          styles.logoImageBox,
          {
            // backgroundColor: themeColors.card,
            // borderColor: themeColors.border,
          },
        ]}
      >
        <Image
          source={require("@/../assets/images/splash-icon.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* <AppText style={[styles.brandName, { color: themeColors.text }]}>
        Orvian
      </AppText> */}
    </View>
  );
}

function AccountsVisual() {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <View style={styles.cardsVisual}>
      <View
        style={[
          styles.mockCard,
          styles.mockCardBack,
          {
            backgroundColor: themeColors.surface,
            borderColor: themeColors.border,
          },
        ]}
      />

      <View
        style={[
          styles.mockCard,
          {
            backgroundColor: themeColors.primary,
          },
        ]}
      >
        <View style={styles.mockCardTop}>
          <WalletCards size={22} color="#FFFFFF" />
          <AppText style={styles.mockCardCurrency}>USD</AppText>
        </View>

        <View>
          <AppText style={styles.mockCardLabel}>Cuenta principal</AppText>
          <AppText style={styles.mockCardAmount}>$••.••</AppText>
        </View>
      </View>
    </View>
  );
}

function MovementsVisual() {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const keys = ["1", "2", "3", "+", "4", "5", "6", "=", "7", "8", "9", "0"];

  return (
    <View
      style={[
        styles.calculatorMock,
        {
          backgroundColor: themeColors.card,
          borderColor: themeColors.border,
        },
      ]}
    >
      <AppText style={[styles.calculatorAmount, { color: themeColors.text }]}>
        $125.00
      </AppText>

      <View style={styles.calculatorGrid}>
        {keys.map((key) => (
          <View
            key={key}
            style={[
              styles.calculatorKey,
              {
                backgroundColor:
                  key === "+" || key === "="
                    ? themeColors.primary
                    : themeColors.cardSoft,
              },
            ]}
          >
            <AppText
              style={[
                styles.calculatorKeyText,
                {
                  color:
                    key === "+" || key === "=" ? "#FFFFFF" : themeColors.text,
                },
              ]}
            >
              {key}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

function AnalyticsVisual() {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <View
      style={[
        styles.analyticsMock,
        {
          backgroundColor: themeColors.card,
          borderColor: themeColors.border,
        },
      ]}
    >
      <View style={styles.analyticsHeader}>
        <View>
          <AppText variant="caption">Balance</AppText>
          <AppText variant="subtitle">$1,240</AppText>
        </View>

        <View
          style={[
            styles.analyticsBadge,
            {
              backgroundColor: themeColors.accentSoft,
            },
          ]}
        >
          <AppText
            style={[styles.analyticsBadgeText, { color: themeColors.primary }]}
          >
            +12%
          </AppText>
        </View>
      </View>

      <View style={styles.bars}>
        {[42, 68, 38, 80, 55, 92, 64].map((height, index) => (
          <View
            key={index}
            style={[
              styles.bar,
              {
                height,
                backgroundColor:
                  index === 5 ? themeColors.primary : themeColors.cardSoft,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

function RemindersVisual() {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <View style={styles.reminderList}>
      {[
        ["Internet", "Vence mañana", "$25.00"],
        ["Cobro pendiente", "En 3 días", "$80.00"],
        ["Suscripción", "Mensual", "$9.99"],
      ].map(([title, date, amount], index) => (
        <View
          key={title}
          style={[
            styles.reminderMock,
            {
              backgroundColor: themeColors.card,
              borderColor:
                index === 0 ? themeColors.warning : themeColors.border,
            },
          ]}
        >
          <View
            style={[
              styles.reminderIcon,
              {
                backgroundColor: themeColors.accentSoft,
              },
            ]}
          >
            <BellRing size={18} color={themeColors.primary} />
          </View>

          <View style={styles.reminderCopy}>
            <AppText variant="body">{title}</AppText>
            <AppText variant="caption">{date}</AppText>
          </View>

          <AppText variant="body">{amount}</AppText>
        </View>
      ))}
    </View>
  );
}

function CurrencyVisual() {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <View
      style={[
        styles.currencyVisual,
        {
          backgroundColor: themeColors.accentSoft,
          borderColor: themeColors.border,
        },
      ]}
    >
      <AppText style={[styles.currencySymbol, { color: themeColors.primary }]}>
        $
      </AppText>
    </View>
  );
}

function PlansVisual({
  hasPlus,
  legacyTester,
}: {
  hasPlus: boolean;
  legacyTester: boolean;
}) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <View style={styles.plansVisual}>
      <View
        style={[
          styles.planMiniCard,
          {
            backgroundColor: themeColors.card,
            borderColor: themeColors.border,
          },
        ]}
      >
        <AppText variant="body">Free</AppText>
        <AppText variant="caption">3 cuentas</AppText>
      </View>

      <View
        style={[
          styles.planMiniCard,
          styles.planMiniCardPlus,
          {
            backgroundColor: themeColors.card,
            borderColor: themeColors.primary,
          },
        ]}
      >
        <View style={styles.planMiniHeader}>
          <Crown size={18} color={themeColors.primary} />
          <AppText variant="body">Plus</AppText>
        </View>

        <View style={styles.planFeatureMini}>
          <Check size={14} color={themeColors.income} />
          <AppText variant="caption">Cuentas ilimitadas</AppText>
        </View>

        <View style={styles.planFeatureMini}>
          <Check size={14} color={themeColors.income} />
          <AppText variant="caption">Recordatorios ilimitados</AppText>
        </View>

        {legacyTester && !hasPlus ? (
          <AppText variant="caption">Descuento early user</AppText>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  logoImageBox: {
    width: 112,
    height: 112,
    borderRadius: 36,
    // borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  logoImage: {
    width: 180,
    height: 180,
  },

  screen: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 18,
    justifyContent: "space-between",
    gap: 18,
  },

  topBar: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
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

  copy: {
    gap: 10,
  },

  centerText: {
    textAlign: "center",
  },

  footer: {
    gap: 12,
  },

  visualCenter: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },

  logoMark: {
    width: 104,
    height: 104,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 54,
    lineHeight: 62,
    fontWeight: "900",
  },

  brandName: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900",
    letterSpacing: -0.8,
  },

  cardsVisual: {
    height: 210,
    alignItems: "center",
    justifyContent: "center",
  },

  mockCard: {
    position: "absolute",
    width: 282,
    height: 166,
    borderRadius: 28,
    padding: 18,
    justifyContent: "space-between",
  },

  mockCardBack: {
    transform: [{ rotate: "-7deg" }, { translateY: -10 }],
    borderWidth: 1,
    opacity: 0.85,
  },

  mockCardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  mockCardCurrency: {
    color: "#FFFFFF",
    fontWeight: "900",
    letterSpacing: 1,
  },

  mockCardLabel: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
  },

  mockCardAmount: {
    color: "#FFFFFF",
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
  },

  calculatorMock: {
    alignSelf: "center",
    width: 270,
    borderRadius: 30,
    borderWidth: 1,
    padding: 18,
    gap: 14,
  },

  calculatorAmount: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900",
    textAlign: "right",
  },

  calculatorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  calculatorKey: {
    width: 52,
    height: 42,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  calculatorKeyText: {
    fontSize: 18,
    fontWeight: "900",
  },

  analyticsMock: {
    alignSelf: "center",
    width: 290,
    borderRadius: 30,
    borderWidth: 1,
    padding: 18,
    gap: 18,
  },

  analyticsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  analyticsBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  analyticsBadgeText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "900",
  },

  bars: {
    height: 110,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
  },

  bar: {
    flex: 1,
    borderRadius: 999,
  },

  reminderList: {
    gap: 12,
  },

  reminderMock: {
    minHeight: 72,
    borderRadius: 22,
    borderWidth: 1,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  reminderIcon: {
    width: 40,
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  reminderCopy: {
    flex: 1,
    gap: 2,
  },

  currencyVisual: {
    width: 120,
    height: 120,
    borderRadius: 40,
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  currencySymbol: {
    fontSize: 64,
    lineHeight: 72,
    fontWeight: "900",
  },

  plansVisual: {
    gap: 12,
  },

  planMiniCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },

  planMiniCardPlus: {
    borderWidth: 1.5,
  },

  planMiniHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  planFeatureMini: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
