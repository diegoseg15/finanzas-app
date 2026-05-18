import { clearAppStorage } from "@/src/services/storage/app-storage.service";
import { clearSecureStorage } from "@/src/services/storage/secure-storage.service";
import { useAccountStore } from "@/src/store/useAccountStore";
import { useAppSettingsStore } from "@/src/store/useAppSettingsStore";
import { useMovementStore } from "@/src/store/useMovementStore";
import { useReminderStore } from "@/src/store/useReminderStore";
import { useTransferStore } from "@/src/store/useTransferStore";

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
