import "@/i18n";

import "react-native-gesture-handler";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { colors } from "@/constants/colors";
import { useLegacyLoanMigration } from "@/features/loans/hooks/useLegacyLoanMigration";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

export default function RootLayout() {
  useLegacyLoanMigration();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: themeColors.background,
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding/welcome" />
        <Stack.Screen name="onboarding/setup" />
        <Stack.Screen name="onboarding/plans" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
        <Stack.Screen name="tabs" />
      </Stack>
    </>
  );
}
