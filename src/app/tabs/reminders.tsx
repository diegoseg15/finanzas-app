import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";
import { EmptyState } from "@/components/ui/EmptyState";
import { CreateReminderForm } from "@/features/reminders/components/CreateReminderForm";
import { ReminderCard } from "@/features/reminders/components/ReminderCard";
import { sortRemindersByDate } from "@/services/reminder.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useReminderStore } from "@/store/useReminderStore";

export default function RemindersScreen() {
  const [isCreating, setIsCreating] = useState(false);

  const accounts = useAccountStore((state) => state.accounts);
  const reminders = useReminderStore((state) => state.reminders);

  const addReminder = useReminderStore((state) => state.addReminder);
  const completeReminderById = useReminderStore(
    (state) => state.completeReminderById,
  );
  const cancelReminderById = useReminderStore(
    (state) => state.cancelReminderById,
  );

  const activeAccounts = useMemo(
    () => accounts.filter((account) => account.status === "active"),
    [accounts],
  );

  const activeReminders = useMemo(
    () =>
      sortRemindersByDate(
        reminders.filter((reminder) => reminder.status === "active"),
      ),
    [reminders],
  );

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <AppText variant="title">Recordatorios</AppText>
          <AppText variant="muted">
            Programa pagos, cobros, compras, ahorros o inversiones.
          </AppText>
        </View>

        {!isCreating ? (
          <AppButton onPress={() => setIsCreating(true)}>
            Nuevo recordatorio
          </AppButton>
        ) : null}
      </View>

      {isCreating ? (
        <CreateReminderForm
          accounts={activeAccounts}
          onCancel={() => setIsCreating(false)}
          onSubmit={async (input) => {
            await addReminder(input);
            setIsCreating(false);
          }}
        />
      ) : null}

      {activeReminders.length === 0 && !isCreating ? (
        <EmptyState
          title="Aún no tienes recordatorios"
          description="Crea un recordatorio para no olvidar pagos, cobros o compras importantes."
          action={
            <AppButton onPress={() => setIsCreating(true)}>
              Crear recordatorio
            </AppButton>
          }
        />
      ) : null}

      {activeReminders.length > 0 ? (
        <View style={styles.list}>
          {activeReminders.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              onComplete={() => completeReminderById(reminder.id)}
              onCancel={() => cancelReminderById(reminder.id)}
            />
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
