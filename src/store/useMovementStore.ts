import { create } from "zustand";

import {
    createMovement,
    getSignedMovementAmount,
} from "@/services/movement.service";
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

export const useMovementStore = create<MovementState>((set, get) => ({
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
}));
