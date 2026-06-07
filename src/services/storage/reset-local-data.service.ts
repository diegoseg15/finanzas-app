import { clearAppStorage } from "@/services/storage/app-storage.service";
import { clearSecureStorage } from "@/services/storage/secure-storage.service";
import { useAccountStore } from "@/store/useAccountStore";
import {
  defaultOnboardingSettings,
  useAppSettingsStore,
} from "@/store/useAppSettingsStore";
import { useBudgetStore } from "@/store/useBudgetStore";
import { useMovementStore } from "@/store/useMovementStore";
import { useReminderStore } from "@/store/useReminderStore";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { useTransferStore } from "@/store/useTransferStore";

export async function resetLocalData() {
  await clearAppStorage();
  await clearSecureStorage();

  useAppSettingsStore.getState().resetAppSettings();

  useAccountStore.setState({
    accounts: [],
  });

  useMovementStore.setState({
    movements: [],
  });

  useTransferStore.setState({
    transfers: [],
  });

  useBudgetStore.setState({
    budgets: [],
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
