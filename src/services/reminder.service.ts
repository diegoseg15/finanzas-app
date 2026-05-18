import {
    CreateReminderInput,
    Reminder,
    UpdateReminderInput,
} from "@/types/finance.types";

function createId() {
  return `reminder_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function createReminder(input: CreateReminderInput): Reminder {
  const now = new Date().toISOString();

  return {
    id: createId(),
    title: input.title.trim(),
    description: input.description?.trim(),
    amount: input.amount,
    currency: input.currency,
    type: input.type,
    frequency: input.frequency,
    accountId: input.accountId,
    scheduledAt: input.scheduledAt,
    status: "active",
    createdAt: now,
    updatedAt: now,
  };
}

export function updateReminder(
  currentReminder: Reminder,
  input: UpdateReminderInput,
): Reminder {
  return {
    ...currentReminder,
    ...input,
    updatedAt: new Date().toISOString(),
  };
}

export function completeReminder(currentReminder: Reminder): Reminder {
  return updateReminder(currentReminder, {
    status: "completed",
  });
}

export function cancelReminder(currentReminder: Reminder): Reminder {
  return updateReminder(currentReminder, {
    status: "cancelled",
  });
}

export function isReminderUpcoming(reminder: Reminder) {
  return (
    reminder.status === "active" &&
    new Date(reminder.scheduledAt).getTime() >= Date.now()
  );
}

export function sortRemindersByDate(reminders: Reminder[]) {
  return [...reminders].sort(
    (a, b) =>
      new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
  );
}
