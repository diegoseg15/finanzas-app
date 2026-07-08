import { TFunction } from "i18next";
import {
    CloudDownload,
    Coins,
    Info,
    Palette,
    RefreshCcw,
    ShieldCheck,
    Upload,
    WalletCards,
} from "lucide-react-native";
import { StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { MovementCsvImportCard } from "@/features/imports/components/MovementCsvImportCard";
import { SettingsBottomModal } from "@/features/settings/components/SettingsBottomModal";
import { SettingsCurrencyPicker } from "@/features/settings/components/SettingsCurrencyPicker";
import { SettingsInfoRow } from "@/features/settings/components/SettingsInfoRow";
import { SettingsModalType } from "@/features/settings/types/settings.types";
import { getAppVersion } from "@/features/settings/utils/app-version";

type SettingsModalsProps = {
  activeModal: SettingsModalType;
  themeColors: any;
  themeMode: string;
  t: TFunction;
  isExportingCsv: boolean;
  isExportingExcel: boolean;
  setThemeMode: (themeMode: "system" | "dark" | "light") => void;
  closeModal: () => void;
  handleOpenPrivacyPolicy: () => void;
  handleExportCsv: () => void;
  handleExportExcel: () => void;
  handleOpenOnboarding: () => void;
  handleResetLocalData: () => void;
  handleOpenDeveloperWebsite: () => void;
};

export function SettingsModals({
  activeModal,
  themeColors,
  themeMode,
  t,
  isExportingCsv,
  isExportingExcel,
  setThemeMode,
  closeModal,
  handleOpenPrivacyPolicy,
  handleExportCsv,
  handleExportExcel,
  handleOpenOnboarding,
  handleResetLocalData,
  handleOpenDeveloperWebsite,
}: SettingsModalsProps) {
  return (
    <>
      <SettingsBottomModal
        visible={activeModal === "appearance"}
        title={t("settings.appearance")}
        description={t("settings.currentTheme", {
          theme: t(`settings.themeModes.${themeMode}`),
        })}
        icon={<Palette size={32} color={themeColors.primary} />}
        onClose={closeModal}
      >
        <View style={styles.modalActions}>
          <AppButton
            variant={themeMode === "system" ? "primary" : "secondary"}
            onPress={() => setThemeMode("system")}
            i18nKey="settings.themeModes.system"
          />

          <AppButton
            variant={themeMode === "dark" ? "primary" : "secondary"}
            onPress={() => setThemeMode("dark")}
            i18nKey="settings.themeModes.dark"
          />

          <AppButton
            variant={themeMode === "light" ? "primary" : "secondary"}
            onPress={() => setThemeMode("light")}
            i18nKey="settings.themeModes.light"
          />
        </View>
      </SettingsBottomModal>

      <SettingsBottomModal
        visible={activeModal === "currency"}
        title={t("settings.mainCurrency.title", {
          defaultValue: "Moneda principal",
        })}
        description={t("settings.mainCurrency.description", {
          defaultValue:
            "La moneda principal se usa para totales, reportes y resumen mensual. No convierte automáticamente los saldos existentes.",
        })}
        icon={<Coins size={32} color={themeColors.primary} />}
        onClose={closeModal}
      >
        <SettingsCurrencyPicker onSelect={closeModal} />
      </SettingsBottomModal>

      <SettingsBottomModal
        visible={activeModal === "privacy"}
        title={t("settings.privacy")}
        description={t("settings.privacyDescription")}
        icon={<ShieldCheck size={32} color={themeColors.primary} />}
        onClose={closeModal}
      >
        <AppButton
          variant="secondary"
          onPress={handleOpenPrivacyPolicy}
          i18nKey="settings.openPrivacyPolicy"
        />
      </SettingsBottomModal>

      <SettingsBottomModal
        visible={activeModal === "security"}
        title={t("settings.secureStorage.title")}
        description={t("settings.secureStorage.modalDescription")}
        icon={<WalletCards size={32} color={themeColors.primary} />}
        onClose={closeModal}
      >
        <AppCard style={styles.infoCard}>
          <SettingsInfoRow
            label={t("settings.secureStorage.encryptedDataTitle")}
            value={t("settings.secureStorage.encryptedDataDescription")}
          />

          <SettingsInfoRow
            label={t("settings.secureStorage.localOnlyTitle")}
            value={t("settings.secureStorage.localOnlyDescription")}
          />

          <SettingsInfoRow
            label={t("settings.secureStorage.noCloudTitle")}
            value={t("settings.secureStorage.noCloudDescription")}
          />

          <SettingsInfoRow
            label={t("settings.secureStorage.exportsTitle")}
            value={t("settings.secureStorage.exportsDescription")}
          />

          <SettingsInfoRow
            label={t("settings.secureStorage.backupTitle")}
            value={t("settings.secureStorage.backupDescription")}
          />
        </AppCard>
      </SettingsBottomModal>

      <SettingsBottomModal
        visible={activeModal === "import"}
        title={t("settings.importData.title", {
          defaultValue: "Importar movimientos",
        })}
        description={t("settings.importData.description", {
          defaultValue: "Carga movimientos desde un archivo CSV compatible.",
        })}
        icon={<Upload size={32} color={themeColors.primary} />}
        onClose={closeModal}
      >
        <MovementCsvImportCard />
      </SettingsBottomModal>

      <SettingsBottomModal
        visible={activeModal === "export"}
        title={t("settings.exportData")}
        description={t("settings.exportDescription")}
        icon={<CloudDownload size={32} color={themeColors.primary} />}
        onClose={closeModal}
      >
        <View style={styles.modalActions}>
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
        </View>
      </SettingsBottomModal>

      <SettingsBottomModal
        visible={activeModal === "localData"}
        title={t("settings.localData")}
        description={t("settings.localDataDescription")}
        icon={<RefreshCcw size={32} color={themeColors.primary} />}
        onClose={closeModal}
      >
        <View style={styles.modalActions}>
          <AppButton
            variant="secondary"
            onPress={handleOpenOnboarding}
            i18nKey="settings.viewOnboardingAgain"
          />

          <AppButton
            variant="ghost"
            onPress={handleResetLocalData}
            i18nKey="settings.resetData"
          />
        </View>
      </SettingsBottomModal>

      <SettingsBottomModal
        visible={activeModal === "about"}
        title={t("settings.about")}
        description={t("settings.aboutDescription")}
        icon={<Info size={32} color={themeColors.primary} />}
        onClose={closeModal}
      >
        <AppCard style={styles.infoCard}>
          <SettingsInfoRow
            label={t("settings.app")}
            value={t("common.appName")}
          />

          <SettingsInfoRow
            label={t("settings.version")}
            value={getAppVersion()}
          />

          <SettingsInfoRow
            label={t("settings.developer")}
            value="Diego Segovia"
          />
        </AppCard>

        <AppButton
          variant="secondary"
          onPress={handleOpenDeveloperWebsite}
          i18nKey="settings.visitDeveloperWebsite"
        />
      </SettingsBottomModal>
    </>
  );
}

const styles = StyleSheet.create({
  modalActions: {
    gap: 10,
  },

  infoCard: {
    gap: 12,
  },
});
