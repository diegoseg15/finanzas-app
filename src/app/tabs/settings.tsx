import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { currencies, getCurrencyNameI18nKey } from "@/constants/currencies";
import { getSubscriptionPlanById } from "@/constants/subscriptionPlans";
import { SettingsModals } from "@/features/settings/components/SettingsModals";
import { SettingsRow } from "@/features/settings/components/SettingsRow";
import { SettingsSection } from "@/features/settings/components/SettingsSection";
import { buildSettingsSections } from "@/features/settings/constants/build-settings-sections";
import { useSettingsActions } from "@/features/settings/hooks/use-settings-actions";
import { SettingsModalType } from "@/features/settings/types/settings.types";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";

export default function SettingsScreen() {
  const { t } = useTranslation();

  const [activeModal, setActiveModal] = useState<SettingsModalType>(null);
  const [isExportingCsv, setIsExportingCsv] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const themeMode = useAppSettingsStore((state) => state.themeMode);
  const mainCurrency = useAppSettingsStore((state) => state.mainCurrency);
  const setThemeMode = useAppSettingsStore((state) => state.setThemeMode);
  const resetOnboarding = useAppSettingsStore((state) => state.resetOnboarding);

  const subscription = useSubscriptionStore((state) => state.subscription);
  const currentPlan = getSubscriptionPlanById(subscription.planId);

  const closeModal = () => setActiveModal(null);

  const currentMainCurrencyData = currencies.find(
    (currency) => currency.code === mainCurrency,
  );

  const currentMainCurrency = currentMainCurrencyData
    ? t(getCurrencyNameI18nKey(currentMainCurrencyData.code), {
        defaultValue: currentMainCurrencyData.name,
      })
    : mainCurrency;

  const currentPlanLabel =
    currentPlan?.id === "plus"
      ? t("plans.plusPlan.name")
      : t("plans.freePlan.name");

  const settingsSections = buildSettingsSections({
    t,
    themeColors,
    themeMode,
    mainCurrency,
    currentMainCurrency,
    currentPlanLabel,
    setActiveModal,
  });

  const {
    handleOpenDeveloperWebsite,
    handleOpenPrivacyPolicy,
    handleResetLocalData,
    handleExportCsv,
    handleExportExcel,
    handleOpenOnboarding,
  } = useSettingsActions({
    t,
    isExportingCsv,
    isExportingExcel,
    setIsExportingCsv,
    setIsExportingExcel,
    resetOnboarding,
    closeModal,
  });

  return (
    <>
      <Screen style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <AppText variant="title" i18nKey="settings.title" />

            <AppText
              variant="muted"
              i18nKey="settings.currentTheme"
              i18nValues={{ theme: t(`settings.themeModes.${themeMode}`) }}
            />
          </View>
        </View>

        {settingsSections.map((section) => (
          <SettingsSection key={section.id} title={section.title}>
            {section.rows.map((row) => (
              <SettingsRow
                key={row.id}
                icon={row.icon}
                title={row.title}
                description={row.description}
                onPress={row.onPress}
              />
            ))}
          </SettingsSection>
        ))}
      </Screen>

      <SettingsModals
        activeModal={activeModal}
        themeColors={themeColors}
        themeMode={themeMode}
        t={t}
        isExportingCsv={isExportingCsv}
        isExportingExcel={isExportingExcel}
        setThemeMode={setThemeMode}
        closeModal={closeModal}
        handleOpenPrivacyPolicy={handleOpenPrivacyPolicy}
        handleExportCsv={handleExportCsv}
        handleExportExcel={handleExportExcel}
        handleOpenOnboarding={handleOpenOnboarding}
        handleResetLocalData={handleResetLocalData}
        handleOpenDeveloperWebsite={handleOpenDeveloperWebsite}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 22,
  },

  header: {
    gap: 14,
  },

  headerCopy: {
    gap: 6,
  },
});
