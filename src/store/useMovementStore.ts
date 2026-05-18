import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  createMovement,
  getSignedMovementAmount,
  updateMovement,
} from "@/services/movement.service";
import { appStorage } from "@/services/storage/app-storage.service";
import { useAccountStore } from "@/store/useAccountStore";
import {
  CreateMovementInput,
  Movement,
  MovementKind,
  UpdateMovementInput,
} from "@/types/finance.types";

type MovementState = {
  movements: Movement[];

  addMovement: (input: CreateMovementInput) => void;
  editMovement: (movementId: string, input: UpdateMovementInput) => void;
  deleteMovement: (movementId: string) => void;

  getMovementsByKind: (kind: MovementKind) => Movement[];
  getMovementsByAccountId: (accountId: string) => Movement[];
};

function revertMovementBalance(movement: Movement) {
  if (movement.status !== "confirmed") {
    return;
  }

  const reverseAmount = -getSignedMovementAmount(
    movement.kind,
    movement.amount,
  );

  useAccountStore
    .getState()
    .applyAccountBalanceChange(
      movement.accountId,
      movement.currency,
      reverseAmount,
    );
}

function applyMovementBalance(movement: Movement) {
  if (movement.status !== "confirmed") {
    return;
  }

  const signedAmount = getSignedMovementAmount(movement.kind, movement.amount);

  useAccountStore
    .getState()
    .applyAccountBalanceChange(
      movement.accountId,
      movement.currency,
      signedAmount,
    );
}

export const useMovementStore = create<MovementState>()(
  persist(
    (set, get) => ({
      movements: [],

      addMovement: (input) => {
        const newMovement = createMovement(input);

        set((state) => ({
          movements: [newMovement, ...state.movements],
        }));

        applyMovementBalance(newMovement);
      },

      deleteMovement: (movementId) => {
        const currentMovement = get().movements.find(
          (movement) => movement.id === movementId,
        );

        if (!currentMovement) {
          return;
        }

        revertMovementBalance(currentMovement);

        set((state) => ({
          movements: state.movements.filter(
            (movement) => movement.id !== movementId,
          ),
        }));
      },

      editMovement: (movementId, input) => {
        const currentMovement = get().movements.find(
          (movement) => movement.id === movementId,
        );

        if (!currentMovement) {
          return;
        }

        const updatedMovement = updateMovement(currentMovement, input);

        revertMovementBalance(currentMovement);
        applyMovementBalance(updatedMovement);

        set((state) => ({
          movements: state.movements.map((movement) =>
            movement.id === movementId ? updatedMovement : movement,
          ),
        }));
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
