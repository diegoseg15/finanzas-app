import {
    CreateMovementInput,
    Movement,
    MovementKind,
} from "@/types/finance.types";

function createId() {
  return `movement_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function createMovement(input: CreateMovementInput): Movement {
  const now = new Date().toISOString();

  return {
    id: createId(),
    kind: input.kind,
    amount: input.amount,
    currency: input.currency,
    accountId: input.accountId,
    categoryId: input.categoryId,
    tagIds: input.tagIds,
    note: input.note?.trim(),
    status: input.status,
    date: input.date,
    createdAt: now,
    updatedAt: now,
  };
}

export function getSignedMovementAmount(kind: MovementKind, amount: number) {
  return kind === "income" ? amount : -amount;
}

export function isIncomeMovement(movement: Movement) {
  return movement.kind === "income";
}

export function isExpenseMovement(movement: Movement) {
  return movement.kind === "expense";
}
