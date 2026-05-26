import AsyncStorage from "@react-native-async-storage/async-storage";

export const appStorage = {
  getItem: async (name: string) => {
    return AsyncStorage.getItem(name);
  },

  setItem: async (name: string, value: string) => {
    return AsyncStorage.setItem(name, value);
  },

  removeItem: async (name: string) => {
    return AsyncStorage.removeItem(name);
  },
};

export async function clearAppStorage() {
  await AsyncStorage.multiRemove([
    "finance-app-settings",
    "finance-app-accounts",
    "finance-app-movements",
    "finance-app-transfers",
    "finance-app-reminders",
    "finance-app-subscription",
    "finance-app-budgets",
  ]);
}
