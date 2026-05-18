import { clearAppStorage } from "@/services/storage/app-storage.service";
import { clearSecureStorage } from "@/services/storage/secure-storage.service";
import { useAccountStore } from "@/store/useAccountStore";
import {
  defaultOnboardingSettings,
  useAppSettingsStore,
} from "@/store/useAppSettingsStore";
import { useMovementStore } from "@/store/useMovementStore";
import { useReminderStore } from "@/store/useReminderStore";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { useTransferStore } from "@/store/useTransferStore";

export async function resetLocalData() {
  await clearAppStorage();
  await clearSecureStorage();

  useAccountStore.setState({
    accounts: [],
  });

  useMovementStore.setState({
    movements: [],
  });

  useTransferStore.setState({
    transfers: [],
  });

  useReminderStore.setState({
    reminders: [],
  });

  useSubscriptionStore.setState({
    subscription: {
      planId: "free",
      status: "active",
      startedAt: new Date().toISOString(),
    },
  });

  useAppSettingsStore.setState({
    themeMode: "system",
    resolvedTheme: "dark",
    hasHydrated: true,
    ...defaultOnboardingSettings,
  });
}
