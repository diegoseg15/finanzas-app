import { Movement } from "@/types/finance.types";

export function getTotalIncome(movements: Movement[]) {
  return movements
    .filter((movement) => movement.kind === "income")
    .reduce((total, movement) => total + movement.amount, 0);
}

export function getTotalExpense(movements: Movement[]) {
  return movements
    .filter((movement) => movement.kind === "expense")
    .reduce((total, movement) => total + movement.amount, 0);
}

export function getBalanceFromMovements(movements: Movement[]) {
  return getTotalIncome(movements) - getTotalExpense(movements);
}

export function getMovementsByCurrentMonth(movements: Movement[]) {
  const now = new Date();

  return movements.filter((movement) => {
    const movementDate = new Date(movement.date);

    return (
      movementDate.getMonth() === now.getMonth() &&
      movementDate.getFullYear() === now.getFullYear()
    );
  });
}

export function getExpenseByCategory(movements: Movement[]) {
  return movements
    .filter((movement) => movement.kind === "expense")
    .reduce<Record<string, number>>((result, movement) => {
      result[movement.categoryId] =
        (result[movement.categoryId] ?? 0) + movement.amount;

      return result;
    }, {});
}
