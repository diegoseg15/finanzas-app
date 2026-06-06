import { router } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppFormModal } from "@/components/ui/AppFormModal";
import { AppText } from "@/components/ui/AppText";
import { EmptyState } from "@/components/ui/EmptyState";
import { PlanLimitNotice } from "@/components/ui/PlanLimitNotice";
import { routes } from "@/constants/routes";
import { CreateMovementForm } from "@/features/movements/components/CreateMovementForm";
import { MovementCard } from "@/features/movements/components/MovementCard";
import { CreateTransferForm } from "@/features/transfers/components/CreateTransferForm";
import { TransferCard } from "@/features/transfers/components/TransferCard";
import {
  canCreateMovement as canCreateMovementByPlan,
  getRemainingFreeMovements,
} from "@/services/subscription.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useMovementStore } from "@/store/useMovementStore";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { useTransferStore } from "@/store/useTransferStore";
import { Movement, Transfer } from "@/types/finance.types";

import { MovementCalculatorForm } from "@/features/movements/components/MovementCalculatorForm";
import { MovementFormMode } from "@/features/movements/components/MovementTypeSelector";

type CreationMode = "movement" | "transfer";

export default function MovementsScreen() {
  const { t } = useTranslation();

  const [isCreating, setIsCreating] = useState(false);
  const [creationMode, setCreationMode] = useState<CreationMode>("movement");

  const [editingMovement, setEditingMovement] = useState<Movement | null>(null);
  const [editingTransfer, setEditingTransfer] = useState<Transfer | null>(null);

  const mainCurrency = useAppSettingsStore((state) => state.mainCurrency);

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

  const timelineItems = useMemo(() => {
    const movementItems = movements.map((movement) => ({
      id: movement.id,
      type: "movement" as const,
      date: movement.date,
      data: movement,
    }));

    const transferItems = transfers.map((transfer) => ({
      id: transfer.id,
      type: "transfer" as const,
      date: transfer.date,
      data: transfer,
    }));

    return [...movementItems, ...transferItems].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [movements, transfers]);

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

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <AppText variant="title" i18nKey="movements.title" />

          <AppText variant="muted" i18nKey="movements.description" />

          {remainingFreeMovements !== null ? (
            <AppText
              variant="caption"
              i18nKey="movements.freePlanRemaining"
              i18nValues={{ count: remainingFreeMovements }}
            />
          ) : (
            <AppText variant="caption" i18nKey="movements.plusPlanUnlimited" />
          )}
        </View>

        {!isCreating &&
        hasActiveAccounts &&
        canCreateMoreMovements &&
        timelineItems.length > 0 ? (
          <View style={styles.actionGrid}>
            <AppButton
              onPress={openCreateMovementForm}
              i18nKey="movements.newMovement"
            />

            <AppButton
              variant="secondary"
              onPress={openCreateTransferForm}
              disabled={!canCreateTransfer}
              i18nKey="movements.newTransfer"
            />
          </View>
        ) : null}
      </View>

      {!hasActiveAccounts ? (
        <EmptyState
          titleI18nKey="movements.firstCreateAccountTitle"
          descriptionI18nKey="movements.firstCreateAccountDescription"
        />
      ) : null}

      {hasActiveAccounts && !canCreateMoreMovements && !isCreating ? (
        <PlanLimitNotice
          titleI18nKey="movements.limitTitle"
          descriptionI18nKey="movements.limitDescription"
          ctaI18nKey="plans.plusPlan.cta"
          onUpgrade={() => router.push(routes.tabs.plans as never)}
        />
      ) : null}

      <AppFormModal
        visible={isCreating && hasActiveAccounts && canCreateMoreMovements}
        showHeader={false}
        onClose={handleCancelForm}
      >
        {editingMovement ? (
          <CreateMovementForm
            accounts={activeAccounts}
            initialMovement={{
              kind: editingMovement.kind,
              amount: editingMovement.amount,
              accountId: editingMovement.accountId,
              categoryId: editingMovement.categoryId,
              tagIds: editingMovement.tagIds,
              note: editingMovement.note,
            }}
            submitLabelI18nKey="accounts.saveChanges"
            onCancel={handleCancelForm}
            onSubmit={(input) => {
              editMovement(editingMovement.id, input);
              setEditingMovement(null);
              setIsCreating(false);
            }}
          />
        ) : editingTransfer ? (
          <CreateTransferForm
            accounts={activeAccounts}
            initialTransfer={editingTransfer}
            submitLabelI18nKey="accounts.saveChanges"
            onCancel={handleCancelForm}
            onSubmit={(input) => {
              editTransfer(editingTransfer.id, input);
              setEditingTransfer(null);
              setIsCreating(false);
            }}
          />
        ) : (
          <MovementCalculatorForm
            currency={mainCurrency}
            accounts={activeAccounts}
            initialMode={
              creationMode === "transfer"
                ? "transfer"
                : ("expense" as MovementFormMode)
            }
            onCancel={handleCancelForm}
            onSubmitMovement={(input) => {
              addMovement(input);
              setIsCreating(false);
            }}
            onSubmitTransfer={(input) => {
              addTransfer(input);
              setIsCreating(false);
            }}
          />
        )}
      </AppFormModal>

      {timelineItems.length === 0 && hasActiveAccounts && !isCreating ? (
        <EmptyState
          titleI18nKey="movements.emptyTitle"
          descriptionI18nKey="movements.emptyDescription"
          action={
            <AppButton
              onPress={openCreateMovementForm}
              i18nKey="movements.registerMovement"
            />
          }
        />
      ) : null}

      {timelineItems.length > 0 ? (
        <View style={styles.list}>
          {timelineItems.map((item) =>
            item.type === "movement" ? (
              <MovementCard
                key={item.id}
                movement={item.data}
                onEdit={() => {
                  setEditingTransfer(null);
                  setEditingMovement(item.data);
                  setCreationMode("movement");
                  setIsCreating(true);
                }}
                onDelete={() => handleDeleteMovement(item.data.id)}
              />
            ) : (
              <TransferCard
                key={item.id}
                transfer={item.data}
                onEdit={() => {
                  setEditingMovement(null);
                  setEditingTransfer(item.data);
                  setCreationMode("transfer");
                  setIsCreating(true);
                }}
                onDelete={() => handleDeleteTransfer(item.data.id)}
              />
            ),
          )}
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 22,
  },

  header: {
    gap: 18,
  },

  copy: {
    gap: 8,
  },

  actionGrid: {
    gap: 10,
  },

  list: {
    gap: 14,
  },
});
