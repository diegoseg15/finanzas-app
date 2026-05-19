import { X } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { EmptyState } from "@/components/ui/EmptyState";
import { colors } from "@/constants/colors";
import { BudgetForm } from "@/features/budgets/components/BudgetForm";
import { BudgetUsageCard } from "@/features/budgets/components/BudgetUsageCard";
import {
  calculateMonthlyBudgetUsage,
  getBudgetPeriodLabel,
  getCurrentBudgetPeriod,
} from "@/services/budget.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useBudgetStore } from "@/store/useBudgetStore";
import { useMovementStore } from "@/store/useMovementStore";
import { MonthlyBudget } from "@/types/budget.types";

export default function BudgetsScreen() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<MonthlyBudget | null>(
    null,
  );

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

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

        {currentBudget ? (
          <View style={styles.headerActions}>
            <AppButton
              variant="secondary"
              onPress={() => handleDeleteBudget(currentBudget.id)}
            >
              Eliminar presupuesto
            </AppButton>

            <AppButton onPress={() => openEditBudgetForm(currentBudget)}>
              Editar presupuesto
            </AppButton>
          </View>
        ) : null}
      </View>

      {!currentBudget ? (
        <EmptyState
          title="No tienes presupuesto este mes"
          description={`Crea un presupuesto para ${getBudgetPeriodLabel(
            currentPeriod.year,
            currentPeriod.month,
          )}.`}
          action={
            <AppButton onPress={openCreateBudgetForm}>
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

      {pastBudgets.length > 0 ? (
        <View style={styles.history}>
          <AppText variant="subtitle">Historial de presupuestos</AppText>

          {pastBudgets.map((budget) => (
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
                    onPress={() => openEditBudgetForm(budget)}
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

      <Modal
        visible={isFormOpen}
        transparent
        animationType="fade"
        onRequestClose={handleCloseForm}
      >
        <View style={styles.overlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={handleCloseForm}
          />

          <View
            style={[
              styles.sheet,
              {
                backgroundColor: themeColors.background,
                borderColor: themeColors.border,
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <View style={styles.copy}>
                <AppText variant="subtitle">
                  {editingBudget ? "Editar presupuesto" : "Nuevo presupuesto"}
                </AppText>

                <AppText variant="caption">
                  Configura límites para controlar tus gastos mensuales.
                </AppText>
              </View>

              <Pressable onPress={handleCloseForm} style={styles.closeButton}>
                <X size={20} color={themeColors.textMuted} />
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.formScrollContent}
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
            </ScrollView>
          </View>
        </View>
      </Modal>
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

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "flex-end",
  },

  sheet: {
    maxHeight: "90%",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    padding: 18,
    gap: 16,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
  },

  closeButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  formScrollContent: {
    paddingBottom: 24,
  },
});
