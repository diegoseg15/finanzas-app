import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { archiveLoan, createLoan, updateLoan } from "@/services/loan.service";
import { appStorage } from "@/services/storage/app-storage.service";
import { CreateLoanInput, Loan, UpdateLoanInput } from "@/types/loan.types";

type LoanState = {
  loans: Loan[];

  setLoans: (loans: Loan[]) => void;
  addLoan: (input: CreateLoanInput) => void;
  editLoan: (loanId: string, input: UpdateLoanInput) => void;
  archiveLoanById: (loanId: string) => void;

  getActiveLoans: () => Loan[];
  getLoanById: (loanId: string) => Loan | undefined;
};

export const useLoanStore = create<LoanState>()(
  persist(
    (set, get) => ({
      loans: [],

      setLoans: (loans) => {
        set({
          loans,
        });
      },

      addLoan: (input) => {
        const newLoan = createLoan(input);

        set((state) => ({
          loans: [newLoan, ...state.loans],
        }));
      },

      editLoan: (loanId, input) => {
        set((state) => ({
          loans: state.loans.map((loan) =>
            loan.id === loanId ? updateLoan(loan, input) : loan,
          ),
        }));
      },

      archiveLoanById: (loanId) => {
        set((state) => ({
          loans: state.loans.map((loan) =>
            loan.id === loanId ? archiveLoan(loan) : loan,
          ),
        }));
      },

      getActiveLoans: () => {
        return get().loans.filter((loan) => loan.status === "active");
      },

      getLoanById: (loanId) => {
        return get().loans.find((loan) => loan.id === loanId);
      },
    }),
    {
      name: "finance-app-loans",
      storage: createJSONStorage(() => appStorage),
      partialize: (state) => ({
        loans: state.loans,
      }),
    },
  ),
);
