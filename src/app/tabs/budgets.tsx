import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
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
  const [isCreating, setIsCreating] = useState(false);
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

  const handleDeleteBudget = (budgetId: string) => {
    Alert.alert(
      "Eliminar presupuesto",
      "Esto eliminará el presupuesto mensual, pero no afectará tus movimientos.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deleteBudget(budgetId),
        },
      ],
    );
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <AppText variant="title">Presupuestos</AppText>
          <AppText variant="muted">
            Define límites mensuales y controla si tus gastos van dentro del
            plan.
          </AppText>
        </View>

        {!isCreating ? (
          <AppButton
            onPress={() => {
              setEditingBudget(null);
              setIsCreating(true);
            }}
          >
            Nuevo presupuesto
          </AppButton>
        ) : null}
      </View>

      {isCreating ? (
        <BudgetForm
          initialBudget={editingBudget ?? undefined}
          onCancel={() => {
            setEditingBudget(null);
            setIsCreating(false);
          }}
          onSubmit={(input) => {
            if (editingBudget) {
              editBudget(editingBudget.id, {
                currency: input.currency,
                generalLimit: input.generalLimit,
                categoryLimits: input.categoryLimits,
              });

              setEditingBudget(null);
            } else {
              addBudget(input);
            }

            setIsCreating(false);
          }}
        />
      ) : null}

      {!currentBudget && !isCreating ? (
        <EmptyState
          title="No tienes presupuesto este mes"
          description={`Crea un presupuesto para ${getBudgetPeriodLabel(
            currentPeriod.year,
            currentPeriod.month,
          )}.`}
          action={
            <AppButton
              onPress={() => {
                setEditingBudget(null);
                setIsCreating(true);
              }}
            >
              Crear presupuesto mensual
            </AppButton>
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

      {sortedBudgets.length > 0 ? (
        <View style={styles.history}>
          <AppText variant="subtitle">Historial de presupuestos</AppText>

          {sortedBudgets.map((budget) => (
            <AppCard key={budget.id} style={styles.budgetCard}>
              <View style={styles.budgetHeader}>
                <View style={styles.copy}>
                  <AppText variant="body">
                    {getBudgetPeriodLabel(budget.year, budget.month)}
                  </AppText>

                  <AppText variant="caption">
                    Límite general: {budget.generalLimit} {budget.currency}
                  </AppText>
                </View>

                <View style={styles.actions}>
                  <AppButton
                    variant="ghost"
                    onPress={() => {
                      setEditingBudget(budget);
                      setIsCreating(true);
                    }}
                    style={styles.smallButton}
                  >
                    Editar
                  </AppButton>

                  <AppButton
                    variant="ghost"
                    onPress={() => handleDeleteBudget(budget.id)}
                    style={styles.smallButton}
                  >
                    Eliminar
                  </AppButton>
                </View>
              </View>
            </AppCard>
          ))}
        </View>
      ) : null}
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
