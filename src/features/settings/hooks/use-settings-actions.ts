import { router } from "expo-router";
import { TFunction } from "i18next";
import { Alert, Linking } from "react-native";

import { routes } from "@/constants/routes";
import {
    DEVELOPER_WEBSITE_URL,
    PRIVACY_POLICY_URL,
} from "@/features/settings/constants/settings-links";
import { exportFinancialCsv } from "@/services/financial-csv-export.service";
import { exportFinancialExcel } from "@/services/financial-excel-export.service";
import { resetLocalData } from "@/services/storage/reset-local-data.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useMovementStore } from "@/store/useMovementStore";
import { useTransferStore } from "@/store/useTransferStore";

type UseSettingsActionsParams = {
  t: TFunction;
  isExportingCsv: boolean;
  isExportingExcel: boolean;
  setIsExportingCsv: (value: boolean) => void;
  setIsExportingExcel: (value: boolean) => void;
  resetOnboarding: () => void;
  closeModal: () => void;
};

export function useSettingsActions({
  t,
  isExportingCsv,
  isExportingExcel,
  setIsExportingCsv,
  setIsExportingExcel,
  resetOnboarding,
  closeModal,
}: UseSettingsActionsParams) {
  const accounts = useAccountStore((state) => state.accounts);
  const movements = useMovementStore((state) => state.movements);
  const transfers = useTransferStore((state) => state.transfers);

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

  const handleOpenOnboarding = () => {
    closeModal();
    resetOnboarding();
    router.replace(routes.onboarding.welcome as never);
  };

  return {
    handleOpenDeveloperWebsite,
    handleOpenPrivacyPolicy,
    handleResetLocalData,
    handleExportCsv,
    handleExportExcel,
    handleOpenOnboarding,
  };
}
