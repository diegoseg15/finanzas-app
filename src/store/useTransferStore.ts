import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { appStorage } from "@/services/storage/app-storage.service";
import {
  createTransfer,
  getTotalDebitFromOrigin,
} from "@/services/transfer.service";
import { useAccountStore } from "@/store/useAccountStore";
import { CreateTransferInput, Transfer } from "@/types/finance.types";

type TransferState = {
  transfers: Transfer[];

  addTransfer: (input: CreateTransferInput) => void;
  getTransfersByAccountId: (accountId: string) => Transfer[];
};

export const useTransferStore = create<TransferState>()(
  persist(
    (set, get) => ({
      transfers: [],

      addTransfer: (input) => {
        const newTransfer = createTransfer(input);

        set((state) => ({
          transfers: [newTransfer, ...state.transfers],
        }));

        if (newTransfer.status !== "confirmed") {
          return;
        }

        const accountStore = useAccountStore.getState();

        const originDebit = getTotalDebitFromOrigin(
          newTransfer.fromAmount,
          newTransfer.feeAmount,
          newTransfer.feeCurrency === newTransfer.fromCurrency,
        );

        accountStore.applyAccountBalanceChange(
          newTransfer.fromAccountId,
          newTransfer.fromCurrency,
          -originDebit,
        );

        accountStore.applyAccountBalanceChange(
          newTransfer.toAccountId,
          newTransfer.toCurrency,
          newTransfer.toAmount,
        );

        if (
          newTransfer.feeAmount > 0 &&
          newTransfer.feeCurrency !== newTransfer.fromCurrency
        ) {
          accountStore.applyAccountBalanceChange(
            newTransfer.fromAccountId,
            newTransfer.feeCurrency,
            -newTransfer.feeAmount,
          );
        }
      },

      getTransfersByAccountId: (accountId) => {
        return get().transfers.filter(
          (transfer) =>
            transfer.fromAccountId === accountId ||
            transfer.toAccountId === accountId,
        );
      },
    }),
    {
      name: "finance-app-transfers",
      storage: createJSONStorage(() => appStorage),
      partialize: (state) => ({
        transfers: state.transfers,
      }),
    },
  ),
);
