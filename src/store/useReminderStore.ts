import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
    cancelReminderNotification,
    scheduleReminderNotification,
} from "@/services/notification.service";
import {
    cancelReminder,
    completeReminder,
    createReminder,
    sortRemindersByDate,
    updateReminder,
} from "@/services/reminder.service";
import { appStorage } from "@/services/storage/app-storage.service";
import {
    CreateReminderInput,
    Reminder,
    UpdateReminderInput,
} from "@/types/finance.types";

type ReminderState = {
  reminders: Reminder[];

  addReminder: (input: CreateReminderInput) => Promise<void>;
  editReminder: (
    reminderId: string,
    input: UpdateReminderInput,
  ) => Promise<void>;
  completeReminderById: (reminderId: string) => Promise<void>;
  cancelReminderById: (reminderId: string) => Promise<void>;

  getActiveReminders: () => Reminder[];
};

export const useReminderStore = create<ReminderState>()(
  persist(
    (set, get) => ({
      reminders: [],

      addReminder: async (input) => {
        const newReminder = createReminder(input);

        const notificationId = await scheduleReminderNotification({
          title: newReminder.title,
          body: newReminder.description ?? "Tienes un recordatorio financiero.",
          scheduledAt: newReminder.scheduledAt,
          frequency: newReminder.frequency,
        });

        const reminderWithNotification: Reminder = {
          ...newReminder,
          notificationId,
        };

        set((state) => ({
          reminders: sortRemindersByDate([
            reminderWithNotification,
            ...state.reminders,
          ]),
        }));
      },

      editReminder: async (reminderId, input) => {
        const currentReminder = get().reminders.find(
          (reminder) => reminder.id === reminderId,
        );

        if (!currentReminder) {
          return;
        }

        await cancelReminderNotification(currentReminder.notificationId);

        const updatedReminder = updateReminder(currentReminder, input);

        const notificationId =
          updatedReminder.status === "active"
            ? await scheduleReminderNotification({
                title: updatedReminder.title,
                body:
                  updatedReminder.description ??
                  "Tienes un recordatorio financiero.",
                scheduledAt: updatedReminder.scheduledAt,
                frequency: updatedReminder.frequency,
              })
            : undefined;

        set((state) => ({
          reminders: sortRemindersByDate(
            state.reminders.map((reminder) =>
              reminder.id === reminderId
                ? {
                    ...updatedReminder,
                    notificationId,
                  }
                : reminder,
            ),
          ),
        }));
      },

      completeReminderById: async (reminderId) => {
        const currentReminder = get().reminders.find(
          (reminder) => reminder.id === reminderId,
        );

        if (!currentReminder) {
          return;
        }

        await cancelReminderNotification(currentReminder.notificationId);

        set((state) => ({
          reminders: state.reminders.map((reminder) =>
            reminder.id === reminderId ? completeReminder(reminder) : reminder,
          ),
        }));
      },

      cancelReminderById: async (reminderId) => {
        const currentReminder = get().reminders.find(
          (reminder) => reminder.id === reminderId,
        );

        if (!currentReminder) {
          return;
        }

        await cancelReminderNotification(currentReminder.notificationId);

        set((state) => ({
          reminders: state.reminders.map((reminder) =>
            reminder.id === reminderId ? cancelReminder(reminder) : reminder,
          ),
        }));
      },

      getActiveReminders: () => {
        return get().reminders.filter(
          (reminder) => reminder.status === "active",
        );
      },
    }),
    {
      name: "finance-app-reminders",
      storage: createJSONStorage(() => appStorage),
      partialize: (state) => ({
        reminders: state.reminders,
      }),
    },
  ),
);
