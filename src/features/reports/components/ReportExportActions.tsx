import { Download } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { exportFinancialCsv } from "@/services/financial-csv-export.service";
import { Account, Movement, Transfer } from "@/types/finance.types";

type ReportExportActionsProps = {
  accounts: Account[];
  movements: Movement[];
  transfers: Transfer[];
};

export function ReportExportActions({
  accounts,
  movements,
  transfers,
}: ReportExportActionsProps) {
  const { t } = useTranslation();

  const [isExporting, setIsExporting] = useState(false);

  const hasData =
    accounts.length > 0 || movements.length > 0 || transfers.length > 0;

  const handleExportCsv = async () => {
    if (!hasData || isExporting) {
      return;
    }

    try {
      setIsExporting(true);

      await exportFinancialCsv({
        accounts,
        movements,
        transfers,
      });
    } catch (error) {
      Alert.alert(
        t("settings.exportErrorTitle"),
        error instanceof Error
          ? error.message
          : t("settings.exportCsvErrorDescription"),
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <AppCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <AppText variant="subtitle" i18nKey="reports.export.title" />

          <AppText variant="muted" i18nKey="reports.export.description" />
        </View>

        <Download size={22} />
      </View>

      <AppButton
        onPress={handleExportCsv}
        disabled={!hasData || isExporting}
        i18nKey={isExporting ? "common.exporting" : "settings.exportCsv"}
      />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },

  copy: {
    flex: 1,
    gap: 6,
  },
});
