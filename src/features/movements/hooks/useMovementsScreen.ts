import { router } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

import { routes } from "@/constants/routes";
import {
  canCreateMovement as canCreateMovementByPlan,
  getRemainingFreeMovements,
} from "@/services/subscription.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useMovementStore } from "@/store/useMovementStore";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { useTransferStore } from "@/store/useTransferStore";
import { Movement, Transfer } from "@/types/finance.types";
import { buildMovementTimeline } from "../services/movements-dashboard.service";
import { MovementFilter } from "../types/movement-filter.types";

export type CreationMode = "movement" | "transfer";

export function useMovementsScreen() {
  const { t } = useTranslation();

  const [isCreating, setIsCreating] = useState(false);
  const [creationMode, setCreationMode] = useState<CreationMode>("movement");

  const [filter, setFilter] = useState<MovementFilter>("all");

  const [editingMovement, setEditingMovement] = useState<Movement | null>(null);
  const [editingTransfer, setEditingTransfer] = useState<Transfer | null>(null);

  const accounts = useAccountStore((state) => state.accounts);

  const movements = useMovementStore((state) => state.movements);
  const addMovement = useMovementStore((state) => state.addMovement);
  const editMovement = useMovementStore((state) => state.editMovement);
  const deleteMovement = useMovementStore((state) => state.deleteMovement);

  const transfers = useTransferStore((state) => state.transfers);
  const addTransfer = useTransferStore((state) => state.addTransfer);
  const editTransfer = useTransferStore((state) => state.editTransfer);
  const deleteTransfer = useTransferStore((state) => state.deleteTransfer);

  const subscription = useSubscriptionStore((state) => state.subscription);

  const activeAccounts = useMemo(
    () => accounts.filter((account) => account.status === "active"),
    [accounts],
  );

  const hasActiveAccounts = activeAccounts.length > 0;
  const canCreateTransfer = activeAccounts.length >= 2;

  const canCreateMoreMovements = canCreateMovementByPlan(
    subscription,
    movements,
  );

  const remainingFreeMovements = getRemainingFreeMovements(
    subscription,
    movements,
  );

  const timelineItems = useMemo(
    () =>
      buildMovementTimeline({
        movements,
        transfers,
        filter,
      }),
    [movements, transfers, filter],
  );

  const openCreateMovementForm = () => {
    setEditingMovement(null);
    setEditingTransfer(null);
    setCreationMode("movement");
    setIsCreating(true);
  };

  const openCreateTransferForm = () => {
    setEditingMovement(null);
    setEditingTransfer(null);
    setCreationMode("transfer");
    setIsCreating(true);
  };

  const handleCancelForm = () => {
    setEditingMovement(null);
    setEditingTransfer(null);
    setIsCreating(false);
  };

  const handleDeleteMovement = (movementId: string) => {
    Alert.alert(
      t("movements.deleteMovementTitle"),
      t("movements.deleteMovementDescription"),
      [
        {
          text: t("common.cancel"),
          style: "cancel",
        },
        {
          text: t("common.delete"),
          style: "destructive",
          onPress: () => deleteMovement(movementId),
        },
      ],
    );
  };

  const handleDeleteTransfer = (transferId: string) => {
    Alert.alert(
      t("movements.deleteTransferTitle"),
      t("movements.deleteTransferDescription"),
      [
        {
          text: t("common.cancel"),
          style: "cancel",
        },
        {
          text: t("common.delete"),
          style: "destructive",
          onPress: () => deleteTransfer(transferId),
        },
      ],
    );
  };

  const openPlans = () => {
    router.push(routes.tabs.plans as never);
  };

  return {
    isCreating,
    creationMode,
    editingMovement,
    editingTransfer,

    activeAccounts,
    hasActiveAccounts,
    canCreateTransfer,
    canCreateMoreMovements,
    remainingFreeMovements,
    timelineItems,

    filter,
    setFilter,

    addMovement,
    editMovement,
    addTransfer,
    editTransfer,

    openCreateMovementForm,
    openCreateTransferForm,
    handleCancelForm,
    handleDeleteMovement,
    handleDeleteTransfer,
    openPlans,

    setEditingMovement,
    setEditingTransfer,
    setCreationMode,
    setIsCreating,
  };
}
