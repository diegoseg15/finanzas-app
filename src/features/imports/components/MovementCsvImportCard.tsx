import { Upload } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { pickCsvDocument } from "@/services/document-import.service";
import { formatMoney } from "@/services/money.service";
import { parseMovementCsv } from "@/services/movement-csv-import.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useMovementStore } from "@/store/useMovementStore";
import {
  MovementImportPreviewItem,
  MovementImportResult,
} from "@/types/import.types";

function isValidImportItem(
  item: MovementImportPreviewItem,
): item is MovementImportPreviewItem & {
  input: NonNullable<MovementImportPreviewItem["input"]>;
} {
  return item.status === "valid" && Boolean(item.input);
}

export function MovementCsvImportCard() {
  const { t } = useTranslation();

  const [isPicking, setIsPicking] = useState(false);
  const [preview, setPreview] = useState<MovementImportResult | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const accounts = useAccountStore((state) => state.accounts);
  const movements = useMovementStore((state) => state.movements);
  const addMovement = useMovementStore((state) => state.addMovement);

  const validItems = preview?.items.filter(isValidImportItem) ?? [];

  const handlePickCsv = async () => {
    if (isPicking) {
      return;
    }

    try {
      setIsPicking(true);

      const document = await pickCsvDocument();

      if (!document) {
        return;
      }

      const result = parseMovementCsv({
        csvContent: document.content,
        accounts,
        existingMovements: movements,
      });

      setFileName(document.name);
      setPreview(result);
    } catch (error) {
      Alert.alert(
        t("imports.csv.readErrorTitle"),
        error instanceof Error
          ? error.message
          : t("imports.csv.pickErrorDescription"),
      );
    } finally {
      setIsPicking(false);
    }
  };

  const handleConfirmImport = () => {
    if (validItems.length === 0) {
      return;
    }

    Alert.alert(
      t("imports.csv.confirmTitle"),
      t("imports.csv.confirmDescription", {
        count: validItems.length,
      }),
      [
        {
          text: t("common.cancel"),
          style: "cancel",
        },
        {
          text: t("imports.csv.importAction"),
          onPress: () => {
            validItems.forEach((item) => {
              addMovement(item.input);
            });

            Alert.alert(
              t("imports.csv.completedTitle"),
              t("imports.csv.completedDescription", {
                count: validItems.length,
              }),
            );
          },
        },
      ],
    );
  };

  const handleClearPreview = () => {
    setPreview(null);
    setFileName(null);
  };

  return (
    <AppCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <AppText variant="subtitle" i18nKey="imports.csv.cardTitle" />

          <AppText variant="muted" i18nKey="imports.csv.cardDescription" />
        </View>

        <Upload size={22} color={themeColors.textMuted} />
      </View>

      <AppButton
        variant="secondary"
        onPress={handlePickCsv}
        disabled={isPicking || accounts.length === 0}
        i18nKey={
          isPicking ? "imports.csv.readingFile" : "imports.csv.selectCsv"
        }
      />

      {accounts.length === 0 ? (
        <AppText variant="caption" i18nKey="imports.csv.accountRequired" />
      ) : null}

      {preview ? (
        <View style={styles.preview}>
          <AppText
            variant="body"
            i18nKey="imports.csv.selectedFile"
            i18nValues={{
              fileName: fileName ?? t("imports.csv.selectedCsvFallback"),
            }}
          />

          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <AppText variant="caption" i18nKey="imports.csv.validRows" />

              <AppText style={{ color: themeColors.income }}>
                {preview.validRows}
              </AppText>
            </View>

            <View style={styles.summaryItem}>
              <AppText variant="caption" i18nKey="imports.csv.errorRows" />

              <AppText style={{ color: themeColors.expense }}>
                {preview.invalidRows}
              </AppText>
            </View>

            <View style={styles.summaryItem}>
              <AppText variant="caption" i18nKey="imports.csv.duplicateRows" />

              <AppText style={{ color: themeColors.warning }}>
                {preview.duplicateRows}
              </AppText>
            </View>
          </View>

          <View style={styles.previewList}>
            {preview.items.slice(0, 6).map((item) => (
              <View
                key={`${item.rowIndex}-${item.status}`}
                style={[
                  styles.previewItem,
                  {
                    borderColor:
                      item.status === "valid"
                        ? themeColors.income
                        : item.status === "duplicate"
                          ? themeColors.warning
                          : themeColors.expense,
                    backgroundColor: themeColors.cardSoft,
                  },
                ]}
              >
                <AppText
                  variant="caption"
                  i18nKey="imports.csv.row"
                  i18nValues={{ row: item.rowIndex }}
                />

                {item.input ? (
                  <AppText variant="caption">
                    {item.input.kind === "income"
                      ? t("movements.income")
                      : t("movements.expense")}{" "}
                    ·{" "}
                    {formatMoney({
                      amount: item.input.amount,
                      currencyCode: item.input.currency,
                    })}
                  </AppText>
                ) : null}

                {item.errors.length > 0 ? (
                  <AppText variant="caption">{item.errors.join(" ")}</AppText>
                ) : null}
              </View>
            ))}
          </View>

          {preview.items.length > 6 ? (
            <AppText
              variant="caption"
              i18nKey="imports.csv.previewLimit"
              i18nValues={{
                shown: 6,
                total: preview.items.length,
              }}
            />
          ) : null}

          <View style={styles.actions}>
            <AppButton
              variant="secondary"
              onPress={handleClearPreview}
              i18nKey="common.cancel"
            />

            <AppButton
              onPress={handleConfirmImport}
              disabled={validItems.length === 0}
              i18nKey="imports.csv.importValid"
            />
          </View>
        </View>
      ) : null}
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

  preview: {
    gap: 14,
  },

  summaryGrid: {
    flexDirection: "row",
    gap: 10,
  },

  summaryItem: {
    flex: 1,
    gap: 4,
  },

  previewList: {
    gap: 8,
  },

  previewItem: {
    borderLeftWidth: 4,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 4,
  },

  actions: {
    gap: 10,
  },
});
