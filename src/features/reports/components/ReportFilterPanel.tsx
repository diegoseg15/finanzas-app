import { StyleSheet, TextInput, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { OptionPicker } from "@/components/ui/OptionPicker";
import { categories } from "@/constants/categories";
import { colors } from "@/constants/colors";
import { currencies } from "@/constants/currencies";
import {
  movementKindFilterOptions,
  reportPeriodOptions,
} from "@/constants/reportFilters";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useReportFilterStore } from "@/store/useReportFilterStore";
import { CurrencyCode, MovementKind } from "@/types/finance.types";
import { ReportPeriodPreset } from "@/types/report.types";

type ReportFilterPanelProps = {
  compact?: boolean;
};

export function ReportFilterPanel({ compact = false }: ReportFilterPanelProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const accounts = useAccountStore((state) => state.accounts);
  const filters = useReportFilterStore((state) => state.filters);
  const setFilters = useReportFilterStore((state) => state.setFilters);
  const resetFilters = useReportFilterStore((state) => state.resetFilters);

  const activeAccounts = accounts.filter(
    (account) => account.status === "active",
  );

  const content = (
    <>
      {!compact ? (
        <View style={styles.header}>
          <View>
            <AppText variant="subtitle">Filtros</AppText>
            <AppText variant="muted">
              Ajusta el período y los datos que quieres analizar.
            </AppText>
          </View>

          <AppButton
            variant="ghost"
            onPress={resetFilters}
            style={styles.resetButton}
          >
            Limpiar
          </AppButton>
        </View>
      ) : (
        <View style={styles.compactActions}>
          <AppButton
            variant="ghost"
            onPress={resetFilters}
            style={styles.resetButton}
          >
            Limpiar filtros
          </AppButton>
        </View>
      )}

      <OptionPicker
        label="Período"
        value={filters.periodPreset}
        options={reportPeriodOptions}
        onChange={(value) =>
          setFilters({
            periodPreset: value as ReportPeriodPreset,
          })
        }
      />

      {filters.periodPreset === "custom" ? (
        <View style={styles.dateGrid}>
          <View style={styles.dateField}>
            <AppText variant="caption">Desde</AppText>

            <TextInput
              value={filters.startDate ?? ""}
              onChangeText={(value) => setFilters({ startDate: value })}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={themeColors.textMuted}
              style={[
                styles.input,
                {
                  backgroundColor: themeColors.cardSoft,
                  borderColor: themeColors.border,
                  color: themeColors.text,
                },
              ]}
            />
          </View>

          <View style={styles.dateField}>
            <AppText variant="caption">Hasta</AppText>

            <TextInput
              value={filters.endDate ?? ""}
              onChangeText={(value) => setFilters({ endDate: value })}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={themeColors.textMuted}
              style={[
                styles.input,
                {
                  backgroundColor: themeColors.cardSoft,
                  borderColor: themeColors.border,
                  color: themeColors.text,
                },
              ]}
            />
          </View>
        </View>
      ) : null}

      <OptionPicker
        label="Cuenta"
        value={filters.accountId ?? "all"}
        options={[
          {
            value: "all",
            label: "Todas las cuentas",
            description: "Incluye todas las cuentas activas.",
          },
          ...activeAccounts.map((account) => ({
            value: account.id,
            label: account.name,
            description: `Moneda: ${account.mainCurrency}`,
          })),
        ]}
        onChange={(value) =>
          setFilters({
            accountId: value === "all" ? undefined : value,
          })
        }
      />

      <OptionPicker
        label="Tipo de movimiento"
        value={filters.movementKind ?? "all"}
        options={[...movementKindFilterOptions]}
        onChange={(value) =>
          setFilters({
            movementKind: value as MovementKind | "all",
          })
        }
      />

      <OptionPicker
        label="Categoría"
        value={filters.categoryId ?? "all"}
        options={[
          {
            value: "all",
            label: "Todas las categorías",
            description: "No filtrar por categoría.",
          },
          ...categories.map((category) => ({
            value: category.id,
            label: category.name,
          })),
        ]}
        onChange={(value) =>
          setFilters({
            categoryId: value === "all" ? undefined : value,
          })
        }
      />

      <OptionPicker
        label="Moneda"
        value={filters.currency ?? "all"}
        options={[
          {
            value: "all",
            label: "Moneda principal",
            description: "Usa la moneda principal para el resumen.",
          },
          ...currencies.map((currency) => ({
            value: currency.code,
            label: `${currency.code} · ${currency.name}`,
            description:
              currency.type === "crypto"
                ? "Criptomoneda"
                : currency.type === "fiat"
                  ? "Moneda fiduciaria"
                  : "Personalizada",
          })),
        ]}
        onChange={(value) =>
          setFilters({
            currency: value as CurrencyCode | "all",
          })
        }
      />
    </>
  );

  if (compact) {
    return <View style={styles.compactContainer}>{content}</View>;
  }

  return <AppCard style={styles.card}>{content}</AppCard>;
}

const styles = StyleSheet.create({
  card: {
    gap: 18,
  },

  compactContainer: {
    gap: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
  },

  compactActions: {
    alignItems: "flex-start",
  },

  resetButton: {
    minHeight: 38,
    paddingHorizontal: 14,
  },

  dateGrid: {
    flexDirection: "row",
    gap: 10,
  },

  dateField: {
    flex: 1,
    gap: 8,
  },

  input: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    fontSize: 15,
    fontWeight: "600",
  },
});
