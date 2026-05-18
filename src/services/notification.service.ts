import * as Notifications from "expo-notifications";

import { ReminderFrequency } from "@/types/finance.types";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

type ScheduleReminderNotificationParams = {
  title: string;
  body: string;
  scheduledAt: string;
  frequency: ReminderFrequency;
};

export async function requestNotificationPermissions() {
  const currentPermissions = await Notifications.getPermissionsAsync();

  if (
    currentPermissions.granted ||
    currentPermissions.ios?.status ===
      Notifications.IosAuthorizationStatus.PROVISIONAL
  ) {
    return true;
  }

  const requestedPermissions = await Notifications.requestPermissionsAsync();

  return requestedPermissions.granted;
}

export async function scheduleReminderNotification({
  title,
  body,
  scheduledAt,
  frequency,
}: ScheduleReminderNotificationParams) {
  const hasPermission = await requestNotificationPermissions();

  if (!hasPermission) {
    return undefined;
  }

  const date = new Date(scheduledAt);

  if (date.getTime() <= Date.now()) {
    return undefined;
  }

  if (frequency === "once") {
    return Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date,
      },
    });
  }

  if (frequency === "daily") {
    return Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: date.getHours(),
        minute: date.getMinutes(),
      },
    });
  }

  if (frequency === "weekly") {
    return Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
        weekday: date.getDay() === 0 ? 1 : date.getDay() + 1,
        hour: date.getHours(),
        minute: date.getMinutes(),
      },
    });
  }

  return Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.MONTHLY,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
    },
  });
}

export async function cancelReminderNotification(notificationId?: string) {
  if (!notificationId) {
    return;
  }

  await Notifications.cancelScheduledNotificationAsync(notificationId);
}
