import {
    BudgetPeriod,
    BudgetUsageStatus,
    CategoryBudgetLimit,
    MonthlyBudget,
    MonthlyBudgetUsage,
} from "@/types/budget.types";
import { Movement } from "@/types/finance.types";

function createId() {
  return `budget_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function getCurrentBudgetPeriod(): BudgetPeriod {
  const now = new Date();

  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  };
}

export function getBudgetPeriodLabel(year: number, month: number) {
  const date = new Date(year, month - 1, 1);

  return date.toLocaleDateString("es-EC", {
    month: "long",
    year: "numeric",
  });
}

export function createMonthlyBudget(input: {
  year: number;
  month: number;
  currency: MonthlyBudget["currency"];
  generalLimit: number;
  categoryLimits?: CategoryBudgetLimit[];
}): MonthlyBudget {
  const now = new Date().toISOString();

  return {
    id: createId(),
    year: input.year,
    month: input.month,
    currency: input.currency,
    generalLimit: input.generalLimit,
    categoryLimits: input.categoryLimits ?? [],
    createdAt: now,
    updatedAt: now,
  };
}

export function updateMonthlyBudget(
  currentBudget: MonthlyBudget,
  input: Partial<
    Pick<MonthlyBudget, "generalLimit" | "currency" | "categoryLimits">
  >,
): MonthlyBudget {
  return {
    ...currentBudget,
    ...input,
    updatedAt: new Date().toISOString(),
  };
}

export function isMovementInsideBudgetPeriod(
  movement: Movement,
  year: number,
  month: number,
) {
  const movementDate = new Date(movement.date);

  return (
    movementDate.getFullYear() === year && movementDate.getMonth() + 1 === month
  );
}

export function getBudgetUsageStatus(
  percentageUsed: number,
): BudgetUsageStatus {
  if (percentageUsed >= 100) {
    return "exceeded";
  }

  if (percentageUsed >= 80) {
    return "warning";
  }

  return "safe";
}

export function calculateMonthlyBudgetUsage(params: {
  budget: MonthlyBudget;
  movements: Movement[];
}): MonthlyBudgetUsage {
  const { budget, movements } = params;

  const monthlyExpenses = movements.filter(
    (movement) =>
      movement.kind === "expense" &&
      movement.status === "confirmed" &&
      movement.currency === budget.currency &&
      isMovementInsideBudgetPeriod(movement, budget.year, budget.month),
  );

  const totalSpent = monthlyExpenses.reduce(
    (total, movement) => total + movement.amount,
    0,
  );

  const totalPercentageUsed =
    budget.generalLimit > 0 ? (totalSpent / budget.generalLimit) * 100 : 0;

  const categories = budget.categoryLimits.map((categoryLimit) => {
    const spent = monthlyExpenses
      .filter((movement) => movement.categoryId === categoryLimit.categoryId)
      .reduce((total, movement) => total + movement.amount, 0);

    const percentageUsed =
      categoryLimit.limit > 0 ? (spent / categoryLimit.limit) * 100 : 0;

    return {
      categoryId: categoryLimit.categoryId,
      limit: categoryLimit.limit,
      spent,
      remaining: categoryLimit.limit - spent,
      percentageUsed,
      status: getBudgetUsageStatus(percentageUsed),
    };
  });

  return {
    budget,
    totalSpent,
    totalRemaining: budget.generalLimit - totalSpent,
    totalPercentageUsed,
    totalStatus: getBudgetUsageStatus(totalPercentageUsed),
    categories,
  };
}
