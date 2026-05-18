import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";
import { EmptyState } from "@/components/ui/EmptyState";
import { PlanLimitNotice } from "@/components/ui/PlanLimitNotice";
import { colors } from "@/constants/colors";
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

type CreationMode = "movement" | "transfer";

export default function MovementsScreen() {
  const [isCreating, setIsCreating] = useState(false);
  const [creationMode, setCreationMode] = useState<CreationMode>("movement");

  const [editingMovement, setEditingMovement] = useState<Movement | null>(null);
  const [editingTransfer, setEditingTransfer] = useState<Transfer | null>(null);

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

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
      "Eliminar movimiento",
      "Esta acción revertirá el saldo afectado por este movimiento.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deleteMovement(movementId),
        },
      ],
    );
  };

  const handleDeleteTransfer = (transferId: string) => {
    Alert.alert(
      "Eliminar transferencia",
      "Esta acción revertirá los saldos afectados por esta transferencia.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
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
          <AppText variant="title">Movimientos</AppText>

          <AppText variant="muted">
            Registra ingresos, egresos y transferencias entre tus cuentas.
          </AppText>

          {remainingFreeMovements !== null ? (
            <AppText variant="caption">
              Plan gratis: {remainingFreeMovements} movimientos disponibles este
              mes.
            </AppText>
          ) : (
            <AppText variant="caption">
              Plan Plus: movimientos ilimitados.
            </AppText>
          )}
        </View>

        {!isCreating && hasActiveAccounts && canCreateMoreMovements ? (
          <View style={styles.actionGrid}>
            <AppButton onPress={openCreateMovementForm}>
              Nuevo movimiento
            </AppButton>

            <AppButton
              variant="secondary"
              onPress={openCreateTransferForm}
              disabled={!canCreateTransfer}
            >
              Nueva transferencia
            </AppButton>
          </View>
        ) : null}
      </View>

      {!hasActiveAccounts ? (
        <EmptyState
          title="Primero crea una cuenta"
          description="Necesitas al menos una cuenta activa para registrar ingresos o egresos."
        />
      ) : null}

      {hasActiveAccounts && !canCreateMoreMovements && !isCreating ? (
        <PlanLimitNotice
          title="Llegaste al límite de movimientos gratis"
          description="El plan gratuito permite hasta 30 movimientos por mes. Activa Plus para registrar movimientos ilimitados."
          onUpgrade={() => router.push(routes.tabs.plans as never)}
        />
      ) : null}

      {isCreating && hasActiveAccounts && canCreateMoreMovements ? (
        <View style={styles.creationBox}>
          <View style={styles.modeSwitch}>
            <Pressable
              onPress={() => {
                setEditingMovement(null);
                setEditingTransfer(null);
                setCreationMode("movement");
              }}
              style={[
                styles.modeButton,
                {
                  backgroundColor:
                    creationMode === "movement"
                      ? themeColors.primary
                      : themeColors.cardSoft,
                },
              ]}
            >
              <AppText
                variant="caption"
                style={{
                  color:
                    creationMode === "movement" ? "#FFFFFF" : themeColors.text,
                }}
              >
                Ingreso / Egreso
              </AppText>
            </Pressable>

            <Pressable
              onPress={() => {
                if (!canCreateTransfer) {
                  return;
                }

                setEditingMovement(null);
                setEditingTransfer(null);
                setCreationMode("transfer");
              }}
              style={[
                styles.modeButton,
                {
                  backgroundColor:
                    creationMode === "transfer"
                      ? themeColors.primary
                      : themeColors.cardSoft,
                  opacity: canCreateTransfer ? 1 : 0.45,
                },
              ]}
            >
              <AppText
                variant="caption"
                style={{
                  color:
                    creationMode === "transfer" ? "#FFFFFF" : themeColors.text,
                }}
              >
                Transferencia
              </AppText>
            </Pressable>
          </View>

          {creationMode === "movement" ? (
            <CreateMovementForm
              accounts={activeAccounts}
              initialMovement={
                editingMovement
                  ? {
                      kind: editingMovement.kind,
                      amount: editingMovement.amount,
                      accountId: editingMovement.accountId,
                      categoryId: editingMovement.categoryId,
                      tagIds: editingMovement.tagIds,
                      note: editingMovement.note,
                    }
                  : undefined
              }
              submitLabel={
                editingMovement ? "Guardar cambios" : "Guardar movimiento"
              }
              onCancel={handleCancelForm}
              onSubmit={(input) => {
                if (editingMovement) {
                  editMovement(editingMovement.id, input);
                  setEditingMovement(null);
                } else {
                  addMovement(input);
                }

                setIsCreating(false);
              }}
            />
          ) : (
            <CreateTransferForm
              accounts={activeAccounts}
              initialTransfer={editingTransfer ?? undefined}
              submitLabel={
                editingTransfer ? "Guardar cambios" : "Guardar transferencia"
              }
              onCancel={handleCancelForm}
              onSubmit={(input) => {
                if (editingTransfer) {
                  editTransfer(editingTransfer.id, input);
                  setEditingTransfer(null);
                } else {
                  addTransfer(input);
                }

                setIsCreating(false);
              }}
            />
          )}
        </View>
      ) : null}

      {timelineItems.length === 0 && hasActiveAccounts && !isCreating ? (
        <EmptyState
          title="Aún no tienes movimientos"
          description="Registra tu primer ingreso, egreso o transferencia para empezar a construir tu historial financiero."
          action={
            <AppButton onPress={openCreateMovementForm}>
              Registrar movimiento
            </AppButton>
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

  creationBox: {
    gap: 14,
  },

  modeSwitch: {
    flexDirection: "row",
    gap: 10,
  },

  modeButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },

  list: {
    gap: 14,
  },
});
