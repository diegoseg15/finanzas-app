import { Appearance } from "react-native";
import { create } from "zustand";

import { AppThemeName } from "@/constants/colors";

type AppSettingsState = {
  themeMode: "system" | "dark" | "light";
  resolvedTheme: AppThemeName;
  setThemeMode: (themeMode: AppSettingsState["themeMode"]) => void;
};

const getSystemTheme = (): AppThemeName => {
  const colorScheme = Appearance.getColorScheme();

  return colorScheme === "dark" ? "dark" : "light";
};

export const useAppSettingsStore = create<AppSettingsState>((set) => ({
  themeMode: "system",
  resolvedTheme: getSystemTheme(),

  setThemeMode: (themeMode) => {
    const resolvedTheme = themeMode === "system" ? getSystemTheme() : themeMode;

    set({
      themeMode,
      resolvedTheme,
    });
  },
}));
