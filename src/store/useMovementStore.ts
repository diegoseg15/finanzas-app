import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  createMovement,
  getSignedMovementAmount,
} from "@/services/movement.service";
import { appStorage } from "@/services/storage/app-storage.service";
import { useAccountStore } from "@/store/useAccountStore";
import {
  CreateMovementInput,
  Movement,
  MovementKind,
} from "@/types/finance.types";

type MovementState = {
  movements: Movement[];

  addMovement: (input: CreateMovementInput) => void;

  getMovementsByKind: (kind: MovementKind) => Movement[];
  getMovementsByAccountId: (accountId: string) => Movement[];
};

export const useMovementStore = create<MovementState>()(
  persist(
    (set, get) => ({
      movements: [],

      addMovement: (input) => {
        const newMovement = createMovement(input);

        set((state) => ({
          movements: [newMovement, ...state.movements],
        }));

        if (newMovement.status === "confirmed") {
          const signedAmount = getSignedMovementAmount(
            newMovement.kind,
            newMovement.amount,
          );

          useAccountStore
            .getState()
            .applyAccountBalanceChange(
              newMovement.accountId,
              newMovement.currency,
              signedAmount,
            );
        }
      },

      getMovementsByKind: (kind) => {
        return get().movements.filter((movement) => movement.kind === kind);
      },

      getMovementsByAccountId: (accountId) => {
        return get().movements.filter(
          (movement) => movement.accountId === accountId,
        );
      },
    }),
    {
      name: "finance-app-movements",
      storage: createJSONStorage(() => appStorage),
      partialize: (state) => ({
        movements: state.movements,
      }),
    },
  ),
);
