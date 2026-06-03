import {
  CreateLoanInput,
  Loan,
  LoanPayment,
  RegisterLoanPaymentInput,
  UpdateLoanInput,
} from "@/types/loan.types";

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function createLoan(input: CreateLoanInput): Loan {
  const now = new Date().toISOString();

  return {
    id: createId("loan"),
    title: input.title.trim(),
    kind: input.kind,
    personOrEntity: input.personOrEntity?.trim(),
    currency: input.currency,
    originalAmount: input.originalAmount,
    remainingAmount: input.remainingAmount ?? input.originalAmount,
    payments: [],
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

export function registerLoanPayment(
  currentLoan: Loan,
  input: RegisterLoanPaymentInput,
): Loan {
  const now = new Date().toISOString();
  const safeAmount = Math.min(
    Math.max(input.amount, 0),
    currentLoan.remainingAmount,
  );

  const payment: LoanPayment = {
    id: createId("loan_payment"),
    loanId: currentLoan.id,
    amount: safeAmount,
    currency: currentLoan.currency,
    note: input.note?.trim(),
    paidAt: input.paidAt ?? now,
    createdAt: now,
  };

  const nextRemainingAmount = Math.max(
    currentLoan.remainingAmount - safeAmount,
    0,
  );

  return {
    ...currentLoan,
    remainingAmount: nextRemainingAmount,
    payments: [payment, ...(currentLoan.payments ?? [])],
    status: nextRemainingAmount === 0 ? "paid" : currentLoan.status,
    updatedAt: now,
  };
}
