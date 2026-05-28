import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppFormModal } from "@/components/ui/AppFormModal";
import { AppText } from "@/components/ui/AppText";
import { EmptyState } from "@/components/ui/EmptyState";
import { BudgetForm } from "@/features/budgets/components/BudgetForm";
import { BudgetUsageCard } from "@/features/budgets/components/BudgetUsageCard";
import {
  calculateMonthlyBudgetUsage,
  getBudgetPeriodLabel,
  getCurrentBudgetPeriod,
} from "@/services/budget.service";
import { useBudgetStore } from "@/store/useBudgetStore";
import { useMovementStore } from "@/store/useMovementStore";
import { MonthlyBudget } from "@/types/budget.types";

export default function BudgetsScreen() {
  const { t } = useTranslation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<MonthlyBudget | null>(
    null,
  );

  const movements = useMovementStore((state) => state.movements);

  const budgets = useBudgetStore((state) => state.budgets);
  const addBudget = useBudgetStore((state) => state.addBudget);
  const editBudget = useBudgetStore((state) => state.editBudget);
  const deleteBudget = useBudgetStore((state) => state.deleteBudget);

  const currentPeriod = getCurrentBudgetPeriod();

  const currentBudget = budgets.find(
    (budget) =>
      budget.year === currentPeriod.year &&
      budget.month === currentPeriod.month,
  );

  const sortedBudgets = [...budgets].sort((a, b) => {
    const aValue = a.year * 100 + a.month;
    const bValue = b.year * 100 + b.month;

    return bValue - aValue;
  });

  const pastBudgets = sortedBudgets.filter(
    (budget) => budget.id !== currentBudget?.id,
  );

  const currentPeriodLabel = getBudgetPeriodLabel(
    currentPeriod.year,
    currentPeriod.month,
  );

  const openCreateBudgetForm = () => {
    setEditingBudget(null);
    setIsFormOpen(true);
  };

  const openEditBudgetForm = (budget: MonthlyBudget) => {
    setEditingBudget(budget);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingBudget(null);
    setIsFormOpen(false);
  };

  const handleDeleteBudget = (budgetId: string) => {
    Alert.alert(t("budgets.deleteTitle"), t("budgets.deleteDescription"), [
      {
        text: t("common.cancel"),
        style: "cancel",
      },
      {
        text: t("common.delete"),
        style: "destructive",
        onPress: () => deleteBudget(budgetId),
      },
    ]);
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <AppText variant="title" i18nKey="budgets.title" />

          <AppText variant="muted" i18nKey="budgets.description" />
        </View>

        {currentBudget ? (
          <View style={styles.headerActions}>
            <AppButton
              variant="secondary"
              onPress={() => handleDeleteBudget(currentBudget.id)}
              i18nKey="budgets.deleteBudget"
            />

            <AppButton
              onPress={() => openEditBudgetForm(currentBudget)}
              i18nKey="budgets.editBudget"
            />
          </View>
        ) : null}
      </View>

      {!currentBudget ? (
        <EmptyState
          titleI18nKey="budgets.currentEmptyTitle"
          descriptionI18nKey="budgets.currentEmptyDescription"
          descriptionI18nValues={{ period: currentPeriodLabel }}
          action={
            <AppButton
              onPress={openCreateBudgetForm}
              i18nKey="budgets.createMonthlyBudget"
            />
          }
        />
      ) : null}

      {currentBudget ? (
        <BudgetUsageCard
          usage={calculateMonthlyBudgetUsage({
            budget: currentBudget,
            movements,
          })}
        />
      ) : null}

      {pastBudgets.length > 0 ? (
        <View style={styles.history}>
          <AppText variant="subtitle" i18nKey="budgets.historyTitle" />

          {pastBudgets.map((budget) => (
            <AppCard key={budget.id} style={styles.budgetCard}>
              <View style={styles.budgetHeader}>
                <View style={styles.copy}>
                  <AppText variant="body">
                    {getBudgetPeriodLabel(budget.year, budget.month)}
                  </AppText>

                  <AppText
                    variant="caption"
                    i18nKey="budgets.generalLimitValue"
                    i18nValues={{
                      amount: budget.generalLimit,
                      currency: budget.currency,
                    }}
                  />
                </View>

                <View style={styles.actions}>
                  <AppButton
                    variant="ghost"
                    onPress={() => openEditBudgetForm(budget)}
                    style={styles.smallButton}
                    i18nKey="common.edit"
                  />

                  <AppButton
                    variant="ghost"
                    onPress={() => handleDeleteBudget(budget.id)}
                    style={styles.smallButton}
                    i18nKey="common.delete"
                  />
                </View>
              </View>
            </AppCard>
          ))}
        </View>
      ) : null}

      <AppFormModal
        visible={isFormOpen}
        titleI18nKey={
          editingBudget ? "budgets.editBudget" : "budgets.newBudget"
        }
        descriptionI18nKey="budgets.modalDescription"
        onClose={handleCloseForm}
      >
        <BudgetForm
          initialBudget={editingBudget ?? undefined}
          onCancel={handleCloseForm}
          onSubmit={(input) => {
            if (editingBudget) {
              editBudget(editingBudget.id, {
                currency: input.currency,
                generalLimit: input.generalLimit,
                categoryLimits: input.categoryLimits,
              });
            } else {
              addBudget(input);
            }

            handleCloseForm();
          }}
        />
      </AppFormModal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 22,
  },

  header: {
    gap: 18,
  },

  headerActions: {
    gap: 10,
  },

  copy: {
    flex: 1,
    gap: 8,
  },

  history: {
    gap: 12,
  },

  budgetCard: {
    gap: 12,
  },

  budgetHeader: {
    gap: 12,
  },

  actions: {
    gap: 8,
  },

  smallButton: {
    minHeight: 42,
  },
});
