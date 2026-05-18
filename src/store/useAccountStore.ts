import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  archiveAccount,
  createAccount,
  updateAccount,
} from "@/services/account.service";
import { appStorage } from "@/services/storage/app-storage.service";
import {
  Account,
  CreateAccountInput,
  CurrencyCode,
  UpdateAccountInput,
} from "@/types/finance.types";

type AccountState = {
  accounts: Account[];

  addAccount: (input: CreateAccountInput) => void;
  editAccount: (accountId: string, input: UpdateAccountInput) => void;
  archiveAccountById: (accountId: string) => void;
  applyAccountBalanceChange: (
    accountId: string,
    currency: CurrencyCode,
    amountChange: number,
  ) => void;

  getActiveAccounts: () => Account[];
  getAccountById: (accountId: string) => Account | undefined;
};

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      accounts: [],

      addAccount: (input) => {
        const newAccount = createAccount(input);

        set((state) => ({
          accounts: [newAccount, ...state.accounts],
        }));
      },

      editAccount: (accountId, input) => {
        set((state) => ({
          accounts: state.accounts.map((account) =>
            account.id === accountId ? updateAccount(account, input) : account,
          ),
        }));
      },

      archiveAccountById: (accountId) => {
        set((state) => ({
          accounts: state.accounts.map((account) =>
            account.id === accountId ? archiveAccount(account) : account,
          ),
        }));
      },

      applyAccountBalanceChange: (accountId, currency, amountChange) => {
        set((state) => ({
          accounts: state.accounts.map((account) => {
            if (account.id !== accountId) {
              return account;
            }

            const balanceExists = account.balances.some(
              (balance) => balance.currency === currency,
            );

            const balances = balanceExists
              ? account.balances.map((balance) =>
                  balance.currency === currency
                    ? {
                        ...balance,
                        amount: balance.amount + amountChange,
                      }
                    : balance,
                )
              : [
                  ...account.balances,
                  {
                    currency,
                    amount: amountChange,
                  },
                ];

            return {
              ...account,
              balances,
              updatedAt: new Date().toISOString(),
            };
          }),
        }));
      },

      getActiveAccounts: () => {
        return get().accounts.filter((account) => account.status === "active");
      },

      getAccountById: (accountId) => {
        return get().accounts.find((account) => account.id === accountId);
      },
    }),
    {
      name: "finance-app-accounts",
      storage: createJSONStorage(() => appStorage),
      partialize: (state) => ({
        accounts: state.accounts,
      }),
    },
  ),
);
