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

  const activeAccounts = accounts.filter(
    (account) => account.status === "active",
  );

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

  const content = (
    <>
      {!compact ? (
        <View style={styles.header}>
          <View style={styles.headerCopy}>
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
        labelI18nKey="reports.filters.account"
        placeholderI18nKey="common.select"
        value={filters.accountId ?? "all"}
        options={[
          {
            value: "all",
            labelI18nKey: "reports.accounts.all.label",
            descriptionI18nKey: "reports.accounts.all.description",
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
        options={movementKindFilterOptions}
        onChange={(value) =>
          setFilters({
            movementKind: value as MovementKind | "all",
          })
        }
      />

      <OptionPicker
        labelI18nKey="reports.filters.category"
        placeholderI18nKey="common.select"
        value={filters.categoryId ?? "all"}
        options={[
          {
            value: "all",
            labelI18nKey: "reports.categories.all.label",
            descriptionI18nKey: "reports.categories.all.description",
          },
          ...categories.map((category) => ({
            value: category.id,
            labelI18nKey: category.labelI18nKey,
          })),
        ]}
        onChange={(value) =>
          setFilters({
            categoryId: value === "all" ? undefined : value,
          })
        }
      />

      <OptionPicker
        labelI18nKey="reports.filters.currency"
        placeholderI18nKey="common.select"
        value={filters.currency ?? "all"}
        options={[
          {
            value: "all",
            labelI18nKey: "reports.currencies.main.label",
            descriptionI18nKey: "reports.currencies.main.description",
          },
          ...currencies.map((currency) => ({
            value: currency.code,
            label: `${currency.code} · ${currency.name}`,
            description:
              currency.type === "crypto"
                ? t("accounts.form.currencyCrypto")
                : currency.type === "fiat"
                  ? t("accounts.form.currencyFiat")
                  : t("accounts.form.currencyCustom"),
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

  headerCopy: {
    flex: 1,
    gap: 6,
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
