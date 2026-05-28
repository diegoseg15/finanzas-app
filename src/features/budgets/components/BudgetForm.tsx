import { Plus, Trash2 } from "lucide-react-native";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";
import { InlineMessage } from "@/components/ui/InlineMessage";
import { OptionPicker } from "@/components/ui/OptionPicker";
import { categories, getCategoryById } from "@/constants/categories";
import { colors } from "@/constants/colors";
import { currencies } from "@/constants/currencies";
import {
  getBudgetPeriodLabel,
  getCurrentBudgetPeriod,
} from "@/services/budget.service";
import { formatMoney, sanitizeMoneyValue } from "@/services/money.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { CategoryBudgetLimit, MonthlyBudget } from "@/types/budget.types";
import { CurrencyCode } from "@/types/finance.types";

type BudgetFormProps = {
  initialBudget?: MonthlyBudget;
  onSubmit: (input: {
    year: number;
    month: number;
    currency: CurrencyCode;
    generalLimit: number;
    categoryLimits: CategoryBudgetLimit[];
  }) => void;
  onCancel: () => void;
};

type CategoryWithPossibleKind = {
  id: string;
  name: string;
  kind?: string;
  type?: string;
};

function isExpenseCategory(category: CategoryWithPossibleKind) {
  return category.kind === "expense" || category.type === "expense";
}

export function BudgetForm({
  initialBudget,
  onSubmit,
  onCancel,
}: BudgetFormProps) {
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const mainCurrency = useAppSettingsStore((state) => state.mainCurrency);

  const currentPeriod = getCurrentBudgetPeriod();

  const [year] = useState(initialBudget?.year ?? currentPeriod.year);
  const [month] = useState(initialBudget?.month ?? currentPeriod.month);

  const [currency, setCurrency] = useState<CurrencyCode>(
    initialBudget?.currency ?? mainCurrency,
  );

  const [generalLimit, setGeneralLimit] = useState(
    initialBudget?.generalLimit !== undefined
      ? String(initialBudget.generalLimit)
      : "",
  );

  const [categoryLimits, setCategoryLimits] = useState<CategoryBudgetLimit[]>(
    initialBudget?.categoryLimits ?? [],
  );

  const expenseCategories = useMemo(() => {
    const filteredCategories = categories.filter((category) =>
      isExpenseCategory(category as CategoryWithPossibleKind),
    );

    return filteredCategories.length > 0 ? filteredCategories : categories;
  }, []);

  const availableCategories = useMemo(() => {
    return expenseCategories.filter(
      (category) =>
        !categoryLimits.some((limit) => limit.categoryId === category.id),
    );
  }, [categoryLimits, expenseCategories]);

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    availableCategories[0]?.id ?? "",
  );

  const [selectedCategoryLimit, setSelectedCategoryLimit] = useState("");

  const parsedGeneralLimit = sanitizeMoneyValue(generalLimit);
  const parsedSelectedCategoryLimit = sanitizeMoneyValue(selectedCategoryLimit);

  const errorMessage =
    generalLimit.trim().length === 0
      ? t("budgets.errors.generalRequired")
      : !Number.isFinite(parsedGeneralLimit) || parsedGeneralLimit <= 0
        ? t("budgets.errors.generalGreaterThanZero")
        : undefined;

  const categoryErrorMessage =
    selectedCategoryLimit.trim().length > 0 &&
    (!Number.isFinite(parsedSelectedCategoryLimit) ||
      parsedSelectedCategoryLimit <= 0)
      ? t("budgets.errors.categoryLimitGreaterThanZero")
      : undefined;

  const canSubmit = !errorMessage;
  const canAddCategoryLimit =
    Boolean(selectedCategoryId) &&
    selectedCategoryLimit.trim().length > 0 &&
    !categoryErrorMessage;

  const handleAddCategoryLimit = () => {
    if (!canAddCategoryLimit) {
      return;
    }

    setCategoryLimits((currentLimits) => [
      ...currentLimits,
      {
        categoryId: selectedCategoryId,
        limit: parsedSelectedCategoryLimit,
      },
    ]);

    const nextAvailableCategory = availableCategories.find(
      (category) => category.id !== selectedCategoryId,
    );

    setSelectedCategoryId(nextAvailableCategory?.id ?? "");
    setSelectedCategoryLimit("");
  };

  const handleRemoveCategoryLimit = (categoryId: string) => {
    setCategoryLimits((currentLimits) =>
      currentLimits.filter((item) => item.categoryId !== categoryId),
    );
  };

  const handleSubmit = () => {
    if (!canSubmit) {
      return;
    }

    onSubmit({
      year,
      month,
      currency,
      generalLimit: parsedGeneralLimit,
      categoryLimits,
    });
  };

  return (
    <View style={styles.form}>
      <OptionPicker
        labelI18nKey="common.currency"
        placeholderI18nKey="common.select"
        value={currency}
        options={currencies.map((item) => ({
          value: item.code,
          label: `${item.code} · ${item.name}`,
          descriptionI18nKey:
            item.type === "crypto"
              ? "accounts.form.currencyCrypto"
              : item.type === "fiat"
                ? "accounts.form.currencyFiat"
                : "accounts.form.currencyCustom",
        }))}
        onChange={(value) => setCurrency(value as CurrencyCode)}
      />

      <AppText variant="caption">{getBudgetPeriodLabel(year, month)}</AppText>

      <View style={styles.field}>
        <AppText variant="caption" i18nKey="budgets.generalMonthlyBudget" />

        <TextInput
          value={generalLimit}
          onChangeText={setGeneralLimit}
          keyboardType="decimal-pad"
          placeholder={t("budgets.generalBudgetPlaceholder")}
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

      <View style={styles.categorySection}>
        <View style={styles.categoryHeader}>
          <AppText variant="subtitle" i18nKey="budgets.categoryBudgetTitle" />

          <AppText
            variant="muted"
            i18nKey="budgets.categoryBudgetDescription"
          />
        </View>

        {availableCategories.length > 0 ? (
          <View style={styles.categoryPickerBox}>
            <OptionPicker
              labelI18nKey="budgets.expenseCategory"
              placeholderI18nKey="common.select"
              value={selectedCategoryId}
              options={availableCategories.map((category) => ({
                value: category.id,
                labelI18nKey: category.labelI18nKey,
              }))}
              onChange={setSelectedCategoryId}
            />

            <View style={styles.field}>
              <AppText variant="caption" i18nKey="budgets.monthlyLimit" />

              <TextInput
                value={selectedCategoryLimit}
                onChangeText={setSelectedCategoryLimit}
                keyboardType="decimal-pad"
                placeholder={t("budgets.monthlyLimitPlaceholder")}
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

            {categoryErrorMessage ? (
              <InlineMessage type="error" message={categoryErrorMessage} />
            ) : null}

            <AppButton
              variant="secondary"
              onPress={handleAddCategoryLimit}
              disabled={!canAddCategoryLimit}
            >
              <Plus size={16} color={themeColors.text} />
              <AppText i18nKey="budgets.addCategory" />
            </AppButton>
          </View>
        ) : (
          <InlineMessage
            type="info"
            message={t("budgets.allCategoriesAlreadyBudgeted", {
              defaultValue:
                "Ya agregaste límites para todas las categorías disponibles.",
            })}
          />
        )}

        {categoryLimits.length > 0 ? (
          <View style={styles.selectedCategoryList}>
            <AppText variant="caption" i18nKey="budgets.budgetedCategories" />

            {categoryLimits.map((item) => {
              const category = getCategoryById(item.categoryId);

              return (
                <View
                  key={item.categoryId}
                  style={[
                    styles.selectedCategoryItem,
                    {
                      backgroundColor: themeColors.cardSoft,
                      borderColor: themeColors.border,
                    },
                  ]}
                >
                  <View style={styles.selectedCategoryCopy}>
                    <AppText>{category?.name ?? t("common.category")}</AppText>

                    <AppText variant="caption">
                      {formatMoney({
                        amount: item.limit,
                        currencyCode: currency,
                      })}
                    </AppText>
                  </View>

                  <Pressable
                    onPress={() => handleRemoveCategoryLimit(item.categoryId)}
                    style={styles.removeButton}
                  >
                    <Trash2 size={18} color={themeColors.expense} />
                  </Pressable>
                </View>
              );
            })}
          </View>
        ) : null}
      </View>

      {errorMessage ? (
        <InlineMessage type="error" message={errorMessage} />
      ) : null}

      <View style={styles.actions}>
        <AppButton
          variant="secondary"
          onPress={onCancel}
          i18nKey="common.cancel"
        />

        <AppButton
          onPress={handleSubmit}
          disabled={!canSubmit}
          i18nKey="budgets.saveBudget"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 20,
  },

  field: {
    gap: 8,
  },

  input: {
    minHeight: 54,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "700",
  },

  categorySection: {
    gap: 14,
  },

  categoryHeader: {
    gap: 6,
  },

  categoryPickerBox: {
    gap: 14,
  },

  selectedCategoryList: {
    gap: 10,
  },

  selectedCategoryItem: {
    minHeight: 62,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  selectedCategoryCopy: {
    flex: 1,
    gap: 4,
  },

  removeButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  actions: {
    gap: 10,
  },
});
