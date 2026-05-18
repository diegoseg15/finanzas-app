import { clearAppStorage } from "@/services/storage/app-storage.service";
import { clearSecureStorage } from "@/services/storage/secure-storage.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useMovementStore } from "@/store/useMovementStore";
import { useReminderStore } from "@/store/useReminderStore";
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

  useAppSettingsStore.setState({
    themeMode: "system",
    resolvedTheme: "dark",
  });
}
