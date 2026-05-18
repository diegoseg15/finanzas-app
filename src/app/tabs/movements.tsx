import { useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";
import { EmptyState } from "@/components/ui/EmptyState";
import { colors } from "@/constants/colors";
import { CreateMovementForm } from "@/features/movements/components/CreateMovementForm";
import { MovementCard } from "@/features/movements/components/MovementCard";
import { CreateTransferForm } from "@/features/transfers/components/CreateTransferForm";
import { TransferCard } from "@/features/transfers/components/TransferCard";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useMovementStore } from "@/store/useMovementStore";
import { useTransferStore } from "@/store/useTransferStore";

type CreationMode = "movement" | "transfer";

export default function MovementsScreen() {
  const [isCreating, setIsCreating] = useState(false);
  const [creationMode, setCreationMode] = useState<CreationMode>("movement");

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const accounts = useAccountStore((state) => state.accounts);
  const movements = useMovementStore((state) => state.movements);
  const addMovement = useMovementStore((state) => state.addMovement);

  const transfers = useTransferStore((state) => state.transfers);
  const addTransfer = useTransferStore((state) => state.addTransfer);

  const activeAccounts = useMemo(
    () => accounts.filter((account) => account.status === "active"),
    [accounts],
  );

  const canCreateMovement = activeAccounts.length > 0;
  const canCreateTransfer = activeAccounts.length >= 2;

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

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <AppText variant="title">Movimientos</AppText>
          <AppText variant="muted">
            Registra ingresos, egresos y transferencias entre tus cuentas.
          </AppText>
        </View>

        {!isCreating && canCreateMovement ? (
          <View style={styles.actionGrid}>
            <AppButton
              onPress={() => {
                setCreationMode("movement");
                setIsCreating(true);
              }}
            >
              Nuevo movimiento
            </AppButton>

            <AppButton
              variant="secondary"
              onPress={() => {
                setCreationMode("transfer");
                setIsCreating(true);
              }}
              disabled={!canCreateTransfer}
            >
              Nueva transferencia
            </AppButton>
          </View>
        ) : null}
      </View>

      {!canCreateMovement ? (
        <EmptyState
          title="Primero crea una cuenta"
          description="Necesitas al menos una cuenta activa para registrar ingresos o egresos."
        />
      ) : null}

      {isCreating && canCreateMovement ? (
        <View style={styles.creationBox}>
          <View style={styles.modeSwitch}>
            <Pressable
              onPress={() => setCreationMode("movement")}
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
                if (canCreateTransfer) {
                  setCreationMode("transfer");
                }
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
              onCancel={() => setIsCreating(false)}
              onSubmit={(input) => {
                addMovement(input);
                setIsCreating(false);
              }}
            />
          ) : (
            <CreateTransferForm
              accounts={activeAccounts}
              onCancel={() => setIsCreating(false)}
              onSubmit={(input) => {
                addTransfer(input);
                setIsCreating(false);
              }}
            />
          )}
        </View>
      ) : null}

      {timelineItems.length === 0 && canCreateMovement && !isCreating ? (
        <EmptyState
          title="Aún no tienes movimientos"
          description="Registra tu primer ingreso, egreso o transferencia para empezar a construir tu historial financiero."
          action={
            <AppButton
              onPress={() => {
                setCreationMode("movement");
                setIsCreating(true);
              }}
            >
              Registrar movimiento
            </AppButton>
          }
        />
      ) : null}

      {timelineItems.length > 0 ? (
        <View style={styles.list}>
          {timelineItems.map((item) =>
            item.type === "movement" ? (
              <MovementCard key={item.id} movement={item.data} />
            ) : (
              <TransferCard key={item.id} transfer={item.data} />
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
