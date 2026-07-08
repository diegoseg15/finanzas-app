import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { assertTransferKeepsBalancesNonNegative } from "@/services/balance-guard.service";
import { appStorage } from "@/services/storage/app-storage.service";
import {
  createTransfer,
  getTotalDebitFromOrigin,
  updateTransfer,
} from "@/services/transfer.service";
import { useAccountStore } from "@/store/useAccountStore";
import {
  CreateTransferInput,
  Transfer,
  UpdateTransferInput,
} from "@/types/finance.types";

type TransferState = {
  transfers: Transfer[];

  addTransfer: (input: CreateTransferInput) => void;
  editTransfer: (transferId: string, input: UpdateTransferInput) => void;
  deleteTransfer: (transferId: string) => void;

  getTransfersByAccountId: (accountId: string) => Transfer[];
};

function applyTransferBalance(transfer: Transfer) {
  if (transfer.status !== "confirmed") {
    return;
  }

  const accountStore = useAccountStore.getState();

  const originDebit = getTotalDebitFromOrigin(
    transfer.fromAmount,
    transfer.feeAmount,
    transfer.feeCurrency === transfer.fromCurrency,
  );

  accountStore.applyAccountBalanceChange(
    transfer.fromAccountId,
    transfer.fromCurrency,
    -originDebit,
  );

  accountStore.applyAccountBalanceChange(
    transfer.toAccountId,
    transfer.toCurrency,
    transfer.toAmount,
  );

  if (
    transfer.feeAmount > 0 &&
    transfer.feeCurrency !== transfer.fromCurrency
  ) {
    accountStore.applyAccountBalanceChange(
      transfer.fromAccountId,
      transfer.feeCurrency,
      -transfer.feeAmount,
    );
  }
}

function revertTransferBalance(transfer: Transfer) {
  if (transfer.status !== "confirmed") {
    return;
  }

  const accountStore = useAccountStore.getState();

  const originDebit = getTotalDebitFromOrigin(
    transfer.fromAmount,
    transfer.feeAmount,
    transfer.feeCurrency === transfer.fromCurrency,
  );

  accountStore.applyAccountBalanceChange(
    transfer.fromAccountId,
    transfer.fromCurrency,
    originDebit,
  );

  accountStore.applyAccountBalanceChange(
    transfer.toAccountId,
    transfer.toCurrency,
    -transfer.toAmount,
  );

  if (
    transfer.feeAmount > 0 &&
    transfer.feeCurrency !== transfer.fromCurrency
  ) {
    accountStore.applyAccountBalanceChange(
      transfer.fromAccountId,
      transfer.feeCurrency,
      transfer.feeAmount,
    );
  }
}

export const useTransferStore = create<TransferState>()(
  persist(
    (set, get) => ({
      transfers: [],

      addTransfer: (input) => {
        const newTransfer = createTransfer(input);

        assertTransferKeepsBalancesNonNegative({
          transfer: newTransfer,
        });

        set((state) => ({
          transfers: [newTransfer, ...state.transfers],
        }));

        applyTransferBalance(newTransfer);
      },

      editTransfer: (transferId, input) => {
        const currentTransfer = get().transfers.find(
          (transfer) => transfer.id === transferId,
        );

        if (!currentTransfer) {
          return;
        }

        const updatedTransfer = updateTransfer(currentTransfer, input);

        assertTransferKeepsBalancesNonNegative({
          transfer: updatedTransfer,
          currentTransfer,
        });

        revertTransferBalance(currentTransfer);
        applyTransferBalance(updatedTransfer);

        set((state) => ({
          transfers: state.transfers.map((transfer) =>
            transfer.id === transferId ? updatedTransfer : transfer,
          ),
        }));
      },

      deleteTransfer: (transferId) => {
        const currentTransfer = get().transfers.find(
          (transfer) => transfer.id === transferId,
        );

        if (!currentTransfer) {
          return;
        }

        revertTransferBalance(currentTransfer);

        set((state) => ({
          transfers: state.transfers.filter(
            (transfer) => transfer.id !== transferId,
          ),
        }));
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
