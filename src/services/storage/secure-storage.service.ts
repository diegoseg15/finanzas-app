import * as SecureStore from "expo-secure-store";

export const secureStorageKeys = {
  authToken: "finance-app-auth-token",
  refreshToken: "finance-app-refresh-token",
  userPinEnabled: "finance-app-user-pin-enabled",
} as const;

type SecureStorageKey =
  (typeof secureStorageKeys)[keyof typeof secureStorageKeys];

export async function saveSecureItem(key: SecureStorageKey, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getSecureItem(key: SecureStorageKey) {
  return SecureStore.getItemAsync(key);
}

export async function deleteSecureItem(key: SecureStorageKey) {
  await SecureStore.deleteItemAsync(key);
}

export async function clearSecureStorage() {
  await Promise.all(
    Object.values(secureStorageKeys).map((key) =>
      SecureStore.deleteItemAsync(key),
    ),
  );
}
