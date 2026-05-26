import { Upload } from "lucide-react-native";
import { useState } from "react";
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
import { MovementImportResult } from "@/types/import.types";

export function MovementCsvImportCard() {
  const [isPicking, setIsPicking] = useState(false);
  const [preview, setPreview] = useState<MovementImportResult | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const accounts = useAccountStore((state) => state.accounts);
  const movements = useMovementStore((state) => state.movements);
  const addMovement = useMovementStore((state) => state.addMovement);

  const validItems =
    preview?.items.filter((item) => item.status === "valid") ?? [];

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
        "No se pudo leer el CSV",
        error instanceof Error
          ? error.message
          : "Ocurrió un error al seleccionar el archivo.",
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
      "Importar movimientos",
      `Se importarán ${validItems.length} movimientos válidos. Los duplicados y errores serán omitidos.`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Importar",
          onPress: () => {
            validItems.forEach((item) => {
              if (item.input) {
                addMovement(item.input);
              }
            });

            Alert.alert(
              "Importación completada",
              `Se importaron ${validItems.length} movimientos.`,
            );

            setPreview(null);
            setFileName(null);
          },
        },
      ],
    );
  };

  return (
    <AppCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <AppText variant="subtitle">Importar movimientos</AppText>
          <AppText variant="muted">
            Carga un CSV con columnas Fecha, Tipo, Cuenta, Monto, Moneda,
            Categoría y Nota.
          </AppText>
        </View>

        <Upload size={22} color={themeColors.textMuted} />
      </View>

      <AppButton
        variant="secondary"
        onPress={handlePickCsv}
        disabled={isPicking || accounts.length === 0}
      >
        {isPicking ? "Leyendo archivo..." : "Seleccionar CSV"}
      </AppButton>

      {accounts.length === 0 ? (
        <AppText variant="caption">
          Primero crea una cuenta para poder importar movimientos.
        </AppText>
      ) : null}

      {preview ? (
        <View style={styles.preview}>
          <AppText variant="body">
            Archivo: {fileName ?? "CSV seleccionado"}
          </AppText>

          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <AppText variant="caption">Válidos</AppText>
              <AppText style={{ color: themeColors.income }}>
                {preview.validRows}
              </AppText>
            </View>

            <View style={styles.summaryItem}>
              <AppText variant="caption">Errores</AppText>
              <AppText style={{ color: themeColors.expense }}>
                {preview.invalidRows}
              </AppText>
            </View>

            <View style={styles.summaryItem}>
              <AppText variant="caption">Duplicados</AppText>
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
                <AppText variant="caption">Fila {item.rowIndex}</AppText>

                {item.input ? (
                  <AppText variant="caption">
                    {item.input.kind === "income" ? "Ingreso" : "Egreso"} ·{" "}
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
            <AppText variant="caption">
              Mostrando 6 de {preview.items.length} filas.
            </AppText>
          ) : null}

          <View style={styles.actions}>
            <AppButton
              variant="secondary"
              onPress={() => {
                setPreview(null);
                setFileName(null);
              }}
            >
              Cancelar
            </AppButton>

            <AppButton
              onPress={handleConfirmImport}
              disabled={validItems.length === 0}
            >
              Importar válidos
            </AppButton>
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
