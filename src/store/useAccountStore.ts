import { create } from "zustand";

import {
    archiveAccount,
    createAccount,
    updateAccount,
} from "@/services/account.service";
import {
    Account,
    CreateAccountInput,
    UpdateAccountInput,
} from "@/types/finance.types";

type AccountState = {
  accounts: Account[];

  addAccount: (input: CreateAccountInput) => void;
  editAccount: (accountId: string, input: UpdateAccountInput) => void;
  archiveAccountById: (accountId: string) => void;

  getActiveAccounts: () => Account[];
  getAccountById: (accountId: string) => Account | undefined;
};

export const useAccountStore = create<AccountState>((set, get) => ({
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

  getActiveAccounts: () => {
    return get().accounts.filter((account) => account.status === "active");
  },

  getAccountById: (accountId) => {
    return get().accounts.find((account) => account.id === accountId);
  },
}));
