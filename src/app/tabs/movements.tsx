import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";
import { EmptyState } from "@/components/ui/EmptyState";
import { CreateMovementForm } from "@/features/movements/components/CreateMovementForm";
import { MovementCard } from "@/features/movements/components/MovementCard";
import { useAccountStore } from "@/store/useAccountStore";
import { useMovementStore } from "@/store/useMovementStore";

export default function MovementsScreen() {
  const [isCreating, setIsCreating] = useState(false);

  const accounts = useAccountStore((state) =>
    state.accounts.filter((account) => account.status === "active"),
  );

  const movements = useMovementStore((state) => state.movements);
  const addMovement = useMovementStore((state) => state.addMovement);

  const canCreateMovement = accounts.length > 0;

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <AppText variant="title">Movimientos</AppText>
          <AppText variant="muted">
            Registra ingresos y egresos para actualizar tus cuentas.
          </AppText>
        </View>

        {!isCreating && canCreateMovement ? (
          <AppButton onPress={() => setIsCreating(true)}>
            Nuevo movimiento
          </AppButton>
        ) : null}
      </View>

      {!canCreateMovement ? (
        <EmptyState
          title="Primero crea una cuenta"
          description="Necesitas al menos una cuenta activa para registrar ingresos o egresos."
        />
      ) : null}

      {isCreating && canCreateMovement ? (
        <CreateMovementForm
          accounts={accounts}
          onCancel={() => setIsCreating(false)}
          onSubmit={(input) => {
            addMovement(input);
            setIsCreating(false);
          }}
        />
      ) : null}

      {movements.length === 0 && canCreateMovement && !isCreating ? (
        <EmptyState
          title="Aún no tienes movimientos"
          description="Registra tu primer ingreso o egreso para empezar a ver tu historial financiero."
          action={
            <AppButton onPress={() => setIsCreating(true)}>
              Registrar movimiento
            </AppButton>
          }
        />
      ) : null}

      {movements.length > 0 ? (
        <View style={styles.list}>
          {movements.map((movement) => (
            <MovementCard key={movement.id} movement={movement} />
          ))}
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
