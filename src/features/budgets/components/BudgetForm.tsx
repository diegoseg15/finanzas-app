import { Plus, Trash2, X } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
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
      ? "El presupuesto general es obligatorio."
      : !Number.isFinite(parsedGeneralLimit) || parsedGeneralLimit <= 0
        ? "El presupuesto general debe ser mayor a 0."
        : undefined;

  const categoryErrorMessage =
    selectedCategoryLimit.trim().length > 0 &&
    (!Number.isFinite(parsedSelectedCategoryLimit) ||
      parsedSelectedCategoryLimit <= 0)
      ? "El límite por categoría debe ser mayor a 0."
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
    <AppCard style={styles.form}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <AppText variant="subtitle">
            {initialBudget ? "Editar presupuesto" : "Nuevo presupuesto"}
          </AppText>

          <AppText variant="muted">{getBudgetPeriodLabel(year, month)}</AppText>
        </View>

        <Pressable onPress={onCancel} style={styles.closeButton}>
          <X size={20} color={themeColors.textMuted} />
        </Pressable>
      </View>

      <OptionPicker
        label="Moneda"
        value={currency}
        options={currencies.map((item) => ({
          value: item.code,
          label: `${item.code} · ${item.name}`,
          description:
            item.type === "crypto"
              ? "Criptomoneda"
              : item.type === "fiat"
                ? "Moneda fiduciaria"
                : "Personalizada",
        }))}
        onChange={(value) => setCurrency(value as CurrencyCode)}
      />

      <View style={styles.field}>
        <AppText variant="caption">Presupuesto general mensual</AppText>

        <TextInput
          value={generalLimit}
          onChangeText={setGeneralLimit}
          keyboardType="decimal-pad"
          placeholder="Ej: 500"
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
          <AppText variant="subtitle">Presupuesto por categoría</AppText>

          <AppText variant="muted">
            Agrega límites solo a las categorías de gasto que quieras controlar.
          </AppText>
        </View>

        {availableCategories.length > 0 ? (
          <View style={styles.categoryPickerBox}>
            <OptionPicker
              label="Categoría de gasto"
              value={selectedCategoryId}
              options={availableCategories.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
              onChange={setSelectedCategoryId}
            />

            <View style={styles.field}>
              <AppText variant="caption">Límite mensual</AppText>

              <TextInput
                value={selectedCategoryLimit}
                onChangeText={setSelectedCategoryLimit}
                keyboardType="decimal-pad"
                placeholder="Ej: 120"
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
              <AppText>Agregar categoría</AppText>
            </AppButton>
          </View>
        ) : (
          <InlineMessage
            type="info"
            message="Ya agregaste límites para todas las categorías disponibles."
          />
        )}

        {categoryLimits.length > 0 ? (
          <View style={styles.selectedCategoryList}>
            <AppText variant="caption">Categorías presupuestadas</AppText>

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
                    <AppText>{category?.name ?? "Categoría"}</AppText>

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
        <AppButton variant="secondary" onPress={onCancel}>
          Cancelar
        </AppButton>

        <AppButton onPress={handleSubmit} disabled={!canSubmit}>
          Guardar presupuesto
        </AppButton>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 20,
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

  closeButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
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
