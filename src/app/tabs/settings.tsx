import Constants from "expo-constants";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Linking, StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { routes } from "@/constants/routes";
import { getSubscriptionPlanById } from "@/constants/subscriptionPlans";
import { MovementCsvImportCard } from "@/features/imports/components/MovementCsvImportCard";
import { exportFinancialCsv } from "@/services/financial-csv-export.service";
import { exportFinancialExcel } from "@/services/financial-excel-export.service";
import { resetLocalData } from "@/services/storage/reset-local-data.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useMovementStore } from "@/store/useMovementStore";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { useTransferStore } from "@/store/useTransferStore";

const DEVELOPER_WEBSITE_URL = "https://portfolio-77060.web.app/";

const PRIVACY_POLICY_URL =
  "https://portfolio-77060.web.app/orvian/privacy-policy/";

function getAppVersion() {
  return (
    Constants.expoConfig?.version ??
    Constants.manifest2?.extra?.expoClient?.version ??
    "1.5.1"
  );
}

export default function SettingsScreen() {
  const { t } = useTranslation();

  const [isExportingCsv, setIsExportingCsv] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);

  const accounts = useAccountStore((state) => state.accounts);
  const movements = useMovementStore((state) => state.movements);
  const transfers = useTransferStore((state) => state.transfers);

  const themeMode = useAppSettingsStore((state) => state.themeMode);
  const setThemeMode = useAppSettingsStore((state) => state.setThemeMode);
  const subscription = useSubscriptionStore((state) => state.subscription);
  const currentPlan = getSubscriptionPlanById(subscription.planId);
  const resetOnboarding = useAppSettingsStore((state) => state.resetOnboarding);

  const handleOpenDeveloperWebsite = async () => {
    const canOpen = await Linking.canOpenURL(DEVELOPER_WEBSITE_URL);

    if (!canOpen) {
      Alert.alert(
        t("settings.linkErrorTitle"),
        t("settings.linkErrorDescription"),
      );
      return;
    }

    await Linking.openURL(DEVELOPER_WEBSITE_URL);
  };

  const handleOpenPrivacyPolicy = async () => {
    const canOpen = await Linking.canOpenURL(PRIVACY_POLICY_URL);

    if (!canOpen) {
      Alert.alert(
        t("settings.linkErrorTitle"),
        t("settings.privacyLinkErrorDescription"),
      );
      return;
    }

    await Linking.openURL(PRIVACY_POLICY_URL);
  };

  const handleResetLocalData = () => {
    Alert.alert(
      t("settings.resetDataTitle"),
      t("settings.resetDataDescription"),
      [
        {
          text: t("common.cancel"),
          style: "cancel",
        },
        {
          text: t("settings.resetDataConfirm"),
          style: "destructive",
          onPress: async () => {
            await resetLocalData();
          },
        },
      ],
    );
  };

  const handleExportCsv = async () => {
    if (isExportingCsv) {
      return;
    }

    try {
      setIsExportingCsv(true);

      await exportFinancialCsv({
        accounts,
        movements,
        transfers,
        filePrefix: "orvian_backup",
      });
    } catch (error) {
      Alert.alert(
        t("settings.exportErrorTitle"),
        error instanceof Error
          ? error.message
          : t("settings.exportCsvErrorDescription"),
      );
    } finally {
      setIsExportingCsv(false);
    }
  };

  const handleExportExcel = async () => {
    if (isExportingExcel) {
      return;
    }

    try {
      setIsExportingExcel(true);

      await exportFinancialExcel({
        accounts,
        movements,
        transfers,
        filePrefix: "orvian_backup",
      });
    } catch (error) {
      Alert.alert(
        t("settings.exportErrorTitle"),
        error instanceof Error
          ? error.message
          : t("settings.exportExcelErrorDescription"),
      );
    } finally {
      setIsExportingExcel(false);
    }
  };

  return (
    <Screen style={styles.container}>
      <AppText variant="title" i18nKey="settings.title" />

      <AppCard style={styles.card}>
        <AppText variant="subtitle" i18nKey="settings.appearance" />

        <AppText
          variant="muted"
          i18nKey="settings.currentTheme"
          i18nValues={{ theme: t(`settings.themeModes.${themeMode}`) }}
        />

        <View style={styles.actions}>
          <AppButton
            variant="secondary"
            onPress={() => setThemeMode("system")}
            i18nKey="settings.themeModes.system"
          />

          <AppButton
            variant="secondary"
            onPress={() => setThemeMode("dark")}
            i18nKey="settings.themeModes.dark"
          />

          <AppButton
            variant="secondary"
            onPress={() => setThemeMode("light")}
            i18nKey="settings.themeModes.light"
          />
        </View>
      </AppCard>

      <AppCard style={styles.card}>
        <AppText variant="subtitle" i18nKey="settings.currentPlan" />

        <AppText
          variant="muted"
          i18nKey="settings.currentPlanDescription"
          i18nValues={{
            plan:
              currentPlan?.id === "plus"
                ? t("plans.plusPlan.name")
                : t("plans.freePlan.name"),
          }}
        />

        <AppButton
          variant="secondary"
          onPress={() => router.push(routes.tabs.plans as never)}
          i18nKey="settings.viewPlans"
        />
      </AppCard>

      <AppCard style={styles.card}>
        <AppText variant="subtitle" i18nKey="settings.shortcuts" />

        <AppButton
          variant="secondary"
          onPress={() => router.push(routes.tabs.budgets as never)}
          i18nKey="settings.viewBudgets"
        />

        <AppButton
          variant="secondary"
          onPress={() => router.push(routes.tabs.reminders as never)}
          i18nKey="settings.viewReminders"
        />

        <AppButton
          variant="secondary"
          onPress={() => router.push(routes.tabs.plans as never)}
          i18nKey="settings.viewPlans"
        />
      </AppCard>

      <AppCard style={styles.card}>
        <AppText variant="subtitle" i18nKey="settings.privacy" />

        <AppText variant="muted" i18nKey="settings.privacyDescription" />

        <AppButton
          variant="secondary"
          onPress={handleOpenPrivacyPolicy}
          i18nKey="settings.openPrivacyPolicy"
        />
      </AppCard>

      <MovementCsvImportCard />

      <AppCard style={styles.card}>
        <AppText variant="subtitle" i18nKey="settings.exportData" />

        <AppText variant="muted" i18nKey="settings.exportDescription" />

        <AppButton
          variant="secondary"
          onPress={handleExportCsv}
          disabled={isExportingCsv}
          i18nKey={isExportingCsv ? "common.exporting" : "settings.exportCsv"}
        />

        <AppButton
          variant="secondary"
          onPress={handleExportExcel}
          disabled={isExportingExcel}
          i18nKey={
            isExportingExcel ? "common.exporting" : "settings.exportExcel"
          }
        />
      </AppCard>

      <AppCard style={styles.card}>
        <AppText variant="subtitle" i18nKey="settings.localData" />

        <AppText variant="muted" i18nKey="settings.localDataDescription" />

        <AppButton
          variant="secondary"
          onPress={() => {
            resetOnboarding();
            router.replace(routes.onboarding.welcome as never);
          }}
          i18nKey="settings.viewOnboardingAgain"
        />

        <AppButton
          variant="secondary"
          onPress={handleResetLocalData}
          i18nKey="settings.resetData"
        />
      </AppCard>

      <AppCard style={styles.card}>
        <AppText variant="subtitle" i18nKey="settings.about" />

        <View style={styles.infoList}>
          <View style={styles.infoRow}>
            <AppText variant="muted" i18nKey="settings.app" />
            <AppText i18nKey="common.appName" />
          </View>

          <View style={styles.infoRow}>
            <AppText variant="muted" i18nKey="settings.version" />
            <AppText variant="caption">v{getAppVersion()}</AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText variant="muted" i18nKey="settings.developer" />
            <AppText>Diego Segovia</AppText>
          </View>
        </View>

        <AppText variant="muted" i18nKey="settings.aboutDescription" />

        <AppButton
          variant="secondary"
          onPress={handleOpenDeveloperWebsite}
          i18nKey="settings.visitDeveloperWebsite"
        />
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },

  card: {
    gap: 16,
  },

  actions: {
    gap: 10,
  },

  infoList: {
    gap: 12,
  },

  infoRow: {
    gap: 4,
  },
});
