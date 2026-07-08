import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { assertMovementKeepsBalancesNonNegative } from "@/services/balance-guard.service";
import { deleteMovementAttachment } from "@/services/movement-attachment.service";
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

function resolveBalanceAfterMovement(movement: Movement) {
  if (movement.status !== "confirmed") {
    return undefined;
  }

  const currentBalance = useAccountStore
    .getState()
    .getAccountBalance(movement.accountId, movement.currency);

  const signedAmount = getSignedMovementAmount(movement.kind, movement.amount);

  return currentBalance + signedAmount;
}

export const useMovementStore = create<MovementState>()(
  persist(
    (set, get) => ({
      movements: [],

      addMovement: (input) => {
        const createdMovement = createMovement(input);

        assertMovementKeepsBalancesNonNegative({
          movement: createdMovement,
        });

        const newMovement: Movement = {
          ...createdMovement,
          balanceAfterMovement: resolveBalanceAfterMovement(createdMovement),
        };

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

        void deleteMovementAttachment(currentMovement.attachment);
      },

      editMovement: (movementId, input) => {
        const currentMovement = get().movements.find(
          (movement) => movement.id === movementId,
        );

        if (!currentMovement) {
          return;
        }

        const updatedMovementBase = updateMovement(currentMovement, input);

        assertMovementKeepsBalancesNonNegative({
          movement: updatedMovementBase,
          currentMovement,
        });

        revertMovementBalance(currentMovement);

        const updatedMovement: Movement = {
          ...updatedMovementBase,
          balanceAfterMovement:
            resolveBalanceAfterMovement(updatedMovementBase),
        };

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
