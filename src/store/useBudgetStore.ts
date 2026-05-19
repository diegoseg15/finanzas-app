import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
    createMonthlyBudget,
    updateMonthlyBudget,
} from "@/services/budget.service";
import { appStorage } from "@/services/storage/app-storage.service";
import { CategoryBudgetLimit, MonthlyBudget } from "@/types/budget.types";
import { CurrencyCode } from "@/types/finance.types";

type BudgetState = {
  budgets: MonthlyBudget[];

  addBudget: (input: {
    year: number;
    month: number;
    currency: CurrencyCode;
    generalLimit: number;
    categoryLimits?: CategoryBudgetLimit[];
  }) => void;

  editBudget: (
    budgetId: string,
    input: Partial<
      Pick<MonthlyBudget, "generalLimit" | "currency" | "categoryLimits">
    >,
  ) => void;

  deleteBudget: (budgetId: string) => void;

  getBudgetByPeriod: (year: number, month: number) => MonthlyBudget | undefined;
};

export const useBudgetStore = create<BudgetState>()(
  persist(
    (set, get) => ({
      budgets: [],

      addBudget: (input) => {
        const existingBudget = get().budgets.find(
          (budget) =>
            budget.year === input.year && budget.month === input.month,
        );

        if (existingBudget) {
          const updatedBudget = updateMonthlyBudget(existingBudget, {
            currency: input.currency,
            generalLimit: input.generalLimit,
            categoryLimits: input.categoryLimits ?? [],
          });

          set((state) => ({
            budgets: state.budgets.map((budget) =>
              budget.id === existingBudget.id ? updatedBudget : budget,
            ),
          }));

          return;
        }

        const newBudget = createMonthlyBudget(input);

        set((state) => ({
          budgets: [newBudget, ...state.budgets],
        }));
      },

      editBudget: (budgetId, input) => {
        set((state) => ({
          budgets: state.budgets.map((budget) =>
            budget.id === budgetId
              ? updateMonthlyBudget(budget, input)
              : budget,
          ),
        }));
      },

      deleteBudget: (budgetId) => {
        set((state) => ({
          budgets: state.budgets.filter((budget) => budget.id !== budgetId),
        }));
      },

      getBudgetByPeriod: (year, month) => {
        return get().budgets.find(
          (budget) => budget.year === year && budget.month === month,
        );
      },
    }),
    {
      name: "finance-app-budgets",
      storage: createJSONStorage(() => appStorage),
      partialize: (state) => ({
        budgets: state.budgets,
      }),
    },
  ),
);
