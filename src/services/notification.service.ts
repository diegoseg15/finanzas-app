import Constants from "expo-constants";

import { ReminderFrequency } from "@/types/finance.types";

type ScheduleReminderNotificationParams = {
  title: string;
  body: string;
  scheduledAt: string;
  frequency: ReminderFrequency;
};

type ExpoNotificationsModule = typeof import("expo-notifications");

function isRunningInExpoGo() {
  return Constants.executionEnvironment === "storeClient";
}

async function getNotificationsModule(): Promise<ExpoNotificationsModule | null> {
  if (isRunningInExpoGo()) {
    return null;
  }

  const Notifications = await import("expo-notifications");

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  return Notifications;
}

export async function requestNotificationPermissions() {
  const Notifications = await getNotificationsModule();

  if (!Notifications) {
    return false;
  }

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
  const Notifications = await getNotificationsModule();

  if (!Notifications) {
    return undefined;
  }

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

  const Notifications = await getNotificationsModule();

  if (!Notifications) {
    return;
  }

  await Notifications.cancelScheduledNotificationAsync(notificationId);
}
