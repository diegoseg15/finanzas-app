import {
  CreateMovementInput,
  Movement,
  MovementKind,
  UpdateMovementInput,
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
    attachment: input.attachment ?? null,
    createdAt: now,
    updatedAt: now,
  };
}

export function updateMovement(
  currentMovement: Movement,
  input: UpdateMovementInput,
): Movement {
  return {
    ...currentMovement,
    ...input,
    note: input.note?.trim() ?? currentMovement.note,
    updatedAt: new Date().toISOString(),
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
