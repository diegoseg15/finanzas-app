import { CreateLoanInput, Loan, UpdateLoanInput } from "@/types/loan.types";

function createId() {
  return `loan_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function createLoan(input: CreateLoanInput): Loan {
  const now = new Date().toISOString();

  return {
    id: createId(),
    title: input.title.trim(),
    kind: input.kind,
    personOrEntity: input.personOrEntity?.trim(),
    currency: input.currency,
    originalAmount: input.originalAmount,
    remainingAmount: input.remainingAmount ?? input.originalAmount,
    dueDate: input.dueDate,
    notes: input.notes?.trim(),
    status: "active",
    createdAt: now,
    updatedAt: now,
  };
}

export function updateLoan(currentLoan: Loan, input: UpdateLoanInput): Loan {
  return {
    ...currentLoan,
    ...input,
    updatedAt: new Date().toISOString(),
  };
}

export function archiveLoan(currentLoan: Loan): Loan {
  return updateLoan(currentLoan, {
    status: "archived",
  });
}
