import { CurrencyCode } from "@/types/finance.types";

export type LoanKind = "payable" | "receivable";

export type LoanStatus = "active" | "paid" | "archived";

export type Loan = {
  id: string;
  title: string;
  kind: LoanKind;
  personOrEntity?: string;
  currency: CurrencyCode;
  originalAmount: number;
  remainingAmount: number;
  dueDate?: string;
  notes?: string;
  status: LoanStatus;
  linkedLegacyAccountId?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateLoanInput = {
  title: string;
  kind: LoanKind;
  personOrEntity?: string;
  currency: CurrencyCode;
  originalAmount: number;
  remainingAmount?: number;
  dueDate?: string;
  notes?: string;
};

export type UpdateLoanInput = Partial<
  Pick<
    Loan,
    | "title"
    | "kind"
    | "personOrEntity"
    | "currency"
    | "originalAmount"
    | "remainingAmount"
    | "dueDate"
    | "notes"
    | "status"
  >
>;
