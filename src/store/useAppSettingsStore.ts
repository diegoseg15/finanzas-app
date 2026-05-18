import { Appearance } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { AppThemeName } from "@/constants/colors";
import { appStorage } from "@/services/storage/app-storage.service";

type ThemeMode = "system" | "dark" | "light";

type AppSettingsState = {
  themeMode: ThemeMode;
  resolvedTheme: AppThemeName;

  setThemeMode: (themeMode: ThemeMode) => void;
  syncThemeWithSystem: () => void;
};

const getSystemTheme = (): AppThemeName => {
  const colorScheme = Appearance.getColorScheme();

  return colorScheme === "dark" ? "dark" : "light";
};

const resolveTheme = (themeMode: ThemeMode): AppThemeName => {
  return themeMode === "system" ? getSystemTheme() : themeMode;
};

export const useAppSettingsStore = create<AppSettingsState>()(
  persist(
    (set, get) => ({
      themeMode: "system",
      resolvedTheme: getSystemTheme(),

      setThemeMode: (themeMode) => {
        set({
          themeMode,
          resolvedTheme: resolveTheme(themeMode),
        });
      },

      syncThemeWithSystem: () => {
        const { themeMode } = get();

        if (themeMode !== "system") {
          return;
        }

        set({
          resolvedTheme: getSystemTheme(),
        });
      },
    }),
    {
      name: "finance-app-settings",
      storage: createJSONStorage(() => appStorage),
      partialize: (state) => ({
        themeMode: state.themeMode,
        resolvedTheme: state.resolvedTheme,
      }),
    },
  ),
);
