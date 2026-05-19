import { X } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { InlineMessage } from "@/components/ui/InlineMessage";
import { OptionPicker } from "@/components/ui/OptionPicker";
import { categories } from "@/constants/categories";
import { colors } from "@/constants/colors";
import { currencies } from "@/constants/currencies";
import {
    getBudgetPeriodLabel,
    getCurrentBudgetPeriod,
} from "@/services/budget.service";
import { sanitizeMoneyValue } from "@/services/money.service";
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

  const parsedGeneralLimit = sanitizeMoneyValue(generalLimit);

  const errorMessage =
    generalLimit.trim().length === 0
      ? "El presupuesto general es obligatorio."
      : !Number.isFinite(parsedGeneralLimit) || parsedGeneralLimit <= 0
        ? "El presupuesto general debe ser mayor a 0."
        : undefined;

  const canSubmit = !errorMessage;

  const updateCategoryLimit = (categoryId: string, value: string) => {
    const parsedLimit = sanitizeMoneyValue(value);

    setCategoryLimits((currentLimits) => {
      const existing = currentLimits.find(
        (item) => item.categoryId === categoryId,
      );

      if (!value.trim() || parsedLimit <= 0) {
        return currentLimits.filter((item) => item.categoryId !== categoryId);
      }

      if (existing) {
        return currentLimits.map((item) =>
          item.categoryId === categoryId
            ? {
                ...item,
                limit: parsedLimit,
              }
            : item,
        );
      }

      return [
        ...currentLimits,
        {
          categoryId,
          limit: parsedLimit,
        },
      ];
    });
  };

  const categoryLimitMap = useMemo(() => {
    return categoryLimits.reduce<Record<string, number>>((result, item) => {
      result[item.categoryId] = item.limit;

      return result;
    }, {});
  }, [categoryLimits]);

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
        <AppText variant="subtitle">Presupuesto por categoría</AppText>
        <AppText variant="muted">
          Opcional. Deja vacío lo que no quieras limitar.
        </AppText>

        <View style={styles.categoryList}>
          {categories.map((category) => (
            <View key={category.id} style={styles.categoryRow}>
              <View style={styles.categoryCopy}>
                <AppText>{category.name}</AppText>
                <AppText variant="caption">Límite mensual</AppText>
              </View>

              <TextInput
                value={
                  categoryLimitMap[category.id] !== undefined
                    ? String(categoryLimitMap[category.id])
                    : ""
                }
                onChangeText={(value) =>
                  updateCategoryLimit(category.id, value)
                }
                keyboardType="decimal-pad"
                placeholder="0"
                placeholderTextColor={themeColors.textMuted}
                style={[
                  styles.categoryInput,
                  {
                    backgroundColor: themeColors.cardSoft,
                    borderColor: themeColors.border,
                    color: themeColors.text,
                  },
                ]}
              />
            </View>
          ))}
        </View>
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
    gap: 10,
  },

  categoryList: {
    gap: 10,
  },

  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  categoryCopy: {
    flex: 1,
    gap: 2,
  },

  categoryInput: {
    width: 110,
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    fontSize: 15,
    fontWeight: "700",
    textAlign: "right",
  },

  actions: {
    gap: 10,
  },
});
