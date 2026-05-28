import { useTranslation } from "react-i18next";
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
import { ReportFilters, ReportPeriodPreset } from "@/types/report.types";

type ReportFilterPanelProps = {
  compact?: boolean;
  filters?: ReportFilters;
  onChangeFilters?: (filters: Partial<ReportFilters>) => void;
  onResetFilters?: () => void;
};

export function ReportFilterPanel({
  compact = false,
  filters: controlledFilters,
  onChangeFilters,
  onResetFilters,
}: ReportFilterPanelProps) {
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const accounts = useAccountStore((state) => state.accounts);

  const storeFilters = useReportFilterStore((state) => state.filters);
  const setStoreFilters = useReportFilterStore((state) => state.setFilters);
  const resetStoreFilters = useReportFilterStore((state) => state.resetFilters);

  const filters = controlledFilters ?? storeFilters;

  const setFilters = (nextFilters: Partial<ReportFilters>) => {
    if (onChangeFilters) {
      onChangeFilters(nextFilters);
      return;
    }

    setStoreFilters(nextFilters);
  };

  const resetFilters = () => {
    if (onResetFilters) {
      onResetFilters();
      return;
    }

    resetStoreFilters();
  };

  const activeAccounts = accounts.filter(
    (account) => account.status === "active",
  );

  const content = (
    <>
      {!compact ? (
        <View style={styles.header}>
          <View>
            <AppText variant="subtitle" i18nKey="reports.filters.title" />

            <AppText
              variant="muted"
              i18nKey="reports.filters.panelDescription"
            />
          </View>

          <AppButton
            variant="ghost"
            onPress={resetFilters}
            style={styles.resetButton}
            i18nKey="common.clear"
          />
        </View>
      ) : (
        <View style={styles.compactActions}>
          <AppButton
            variant="ghost"
            onPress={resetFilters}
            style={styles.resetButton}
            i18nKey="statistics.clearFilters"
          />
        </View>
      )}

      <OptionPicker
        labelI18nKey="reports.filters.period"
        placeholderI18nKey="common.select"
        value={filters.periodPreset}
        options={reportPeriodOptions.map((option) => ({
          value: option.value,
          labelI18nKey: `reports.periods.${option.value}.label`,
          descriptionI18nKey: `reports.periods.${option.value}.description`,
        }))}
        onChange={(value) =>
          setFilters({
            periodPreset: value as ReportPeriodPreset,
          })
        }
      />

      {filters.periodPreset === "custom" ? (
        <View style={styles.dateGrid}>
          <View style={styles.dateField}>
            <AppText variant="caption" i18nKey="reports.filters.from" />

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
            <AppText variant="caption" i18nKey="reports.filters.to" />

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
        labelI18nKey="common.account"
        placeholderI18nKey="common.select"
        value={filters.accountId ?? "all"}
        options={[
          {
            value: "all",
            labelI18nKey: "reports.filters.allAccounts",
            descriptionI18nKey: "reports.filters.allAccountsDescription",
          },
          ...activeAccounts.map((account) => ({
            value: account.id,
            label: account.name,
            description: t("movements.form.accountCurrency", {
              currency: account.mainCurrency,
            }),
          })),
        ]}
        onChange={(value) =>
          setFilters({
            accountId: value === "all" ? undefined : value,
          })
        }
      />

      <OptionPicker
        labelI18nKey="reports.filters.movementKind"
        placeholderI18nKey="common.select"
        value={filters.movementKind ?? "all"}
        options={movementKindFilterOptions.map((option) => ({
          value: option.value,
          labelI18nKey: `reports.movementKinds.${option.value}.label`,
          descriptionI18nKey: `reports.movementKinds.${option.value}.description`,
        }))}
        onChange={(value) =>
          setFilters({
            movementKind: value as MovementKind | "all",
          })
        }
      />

      <OptionPicker
        labelI18nKey="common.category"
        placeholderI18nKey="common.select"
        value={filters.categoryId ?? "all"}
        options={[
          {
            value: "all",
            labelI18nKey: "reports.filters.allCategories",
            descriptionI18nKey: "reports.filters.allCategoriesDescription",
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
        labelI18nKey="common.currency"
        placeholderI18nKey="common.select"
        value={filters.currency ?? "all"}
        options={[
          {
            value: "all",
            labelI18nKey: "reports.filters.mainCurrency",
            descriptionI18nKey: "reports.filters.mainCurrencyDescription",
          },
          ...currencies.map((currency) => ({
            value: currency.code,
            label: `${currency.code} · ${currency.name}`,
            descriptionI18nKey:
              currency.type === "crypto"
                ? "accounts.form.currencyCrypto"
                : currency.type === "fiat"
                  ? "accounts.form.currencyFiat"
                  : "accounts.form.currencyCustom",
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
