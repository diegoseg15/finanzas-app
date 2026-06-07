import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
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
import { MovementCalculatorForm } from "@/features/movements/components/MovementCalculatorForm";
import { MovementCard } from "@/features/movements/components/MovementCard";
import { MovementFilterSelector } from "@/features/movements/components/MovementFilterSelector";
import { MovementFormMode } from "@/features/movements/components/MovementTypeSelector";
import { buildMovementTimeline } from "@/features/movements/services/movements-dashboard.service";
import { MovementFilter } from "@/features/movements/types/movement-filter.types";
import { CreateTransferForm } from "@/features/transfers/components/CreateTransferForm";
import { TransferCard } from "@/features/transfers/components/TransferCard";
import { canCreateMovement as canCreateMovementByPlan } from "@/services/subscription.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useMovementStore } from "@/store/useMovementStore";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { useTransferStore } from "@/store/useTransferStore";
import { Movement, Transfer } from "@/types/finance.types";

type CreationMode = "movement" | "transfer";

export default function MovementsScreen() {
  const { t } = useTranslation();

  const params = useLocalSearchParams<{ create?: string }>();

  const [isCreating, setIsCreating] = useState(false);
  const [creationMode, setCreationMode] = useState<CreationMode>("movement");
  const [filter, setFilter] = useState<MovementFilter>("all");

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

  const timelineItems = useMemo(
    () =>
      buildMovementTimeline({
        movements,
        transfers,
        filter,
      }),
    [movements, transfers, filter],
  );

  const allTimelineItems = useMemo(
    () =>
      buildMovementTimeline({
        movements,
        transfers,
        filter: "all",
      }),
    [movements, transfers],
  );

  const openCreateMovementForm = () => {
    setEditingMovement(null);
    setEditingTransfer(null);
    setCreationMode("movement");
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

  useEffect(() => {
    if (params.create !== "movement") {
      return;
    }

    if (!hasActiveAccounts || !canCreateMoreMovements) {
      router.setParams({ create: undefined });
      return;
    }

    setEditingMovement(null);
    setEditingTransfer(null);
    setCreationMode("movement");
    setIsCreating(true);

    router.setParams({ create: undefined });
  }, [params.create, hasActiveAccounts, canCreateMoreMovements]);

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <AppText variant="title" i18nKey="movements.title" />

          <AppText variant="muted" i18nKey="movements.description" />
        </View>
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

      {hasActiveAccounts && allTimelineItems.length > 0 ? (
        <MovementFilterSelector value={filter} onChange={setFilter} />
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
            canCreateTransfer={canCreateTransfer}
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

      {allTimelineItems.length === 0 && hasActiveAccounts && !isCreating ? (
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

      {allTimelineItems.length > 0 && timelineItems.length === 0 ? (
        <EmptyState
          titleI18nKey="movements.emptyFilterTitle"
          descriptionI18nKey="movements.emptyFilterDescription"
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

  list: {
    gap: 14,
  },
});
