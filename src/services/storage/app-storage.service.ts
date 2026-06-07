import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  clearStorageEncryptionKey,
  decryptStorageValue,
  encryptStorageValue,
  isEncryptedValue,
} from "@/services/security/encryption.service";

const appStorageKeys = [
  "finance-app-settings",
  "finance-app-accounts",
  "finance-app-movements",
  "finance-app-transfers",
  "finance-app-reminders",
  "finance-app-subscription",
  "finance-app-budgets",
  "finance-app-loans",
];

export const appStorage = {
  getItem: async (name: string) => {
    const storedValue = await AsyncStorage.getItem(name);

    if (!storedValue) {
      return null;
    }

    if (isEncryptedValue(storedValue)) {
      return decryptStorageValue(storedValue);
    }

    /**
     * Legacy migration:
     * If the value is plain JSON from previous versions,
     * return it normally and save it encrypted immediately.
     */
    const encryptedValue = await encryptStorageValue(storedValue);

    await AsyncStorage.setItem(name, encryptedValue);

    return storedValue;
  },

  setItem: async (name: string, value: string) => {
    const encryptedValue = await encryptStorageValue(value);

    return AsyncStorage.setItem(name, encryptedValue);
  },

  removeItem: async (name: string) => {
    return AsyncStorage.removeItem(name);
  },
};

export async function migrateAppStorageToEncrypted() {
  await Promise.all(
    appStorageKeys.map(async (key) => {
      const storedValue = await AsyncStorage.getItem(key);

      if (!storedValue || isEncryptedValue(storedValue)) {
        return;
      }

      const encryptedValue = await encryptStorageValue(storedValue);

      await AsyncStorage.setItem(key, encryptedValue);
    }),
  );
}

export async function clearAppStorage() {
  await AsyncStorage.multiRemove(appStorageKeys);
  await clearStorageEncryptionKey();
}
