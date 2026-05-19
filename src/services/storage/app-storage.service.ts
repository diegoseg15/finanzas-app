import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateStorage } from "zustand/middleware";

export const appStorage: StateStorage = {
  getItem: async (name: string) => {
    return AsyncStorage.getItem(name);
  },

  setItem: async (name: string, value: string) => {
    await AsyncStorage.setItem(name, value);
  },

  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
};

await AsyncStorage.multiRemove([
  "finance-app-settings",
  "finance-app-accounts",
  "finance-app-movements",
  "finance-app-transfers",
  "finance-app-reminders",
  "finance-app-subscription",
  "finance-app-budgets",
]);
