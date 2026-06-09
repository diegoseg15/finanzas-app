import "@/i18n";

import "react-native-gesture-handler";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { colors } from "@/constants/colors";
import { useLegacyLoanMigration } from "@/features/loans/hooks/useLegacyLoanMigration";
import { migrateAppStorageToEncrypted } from "@/services/storage/app-storage.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

/**
 * Activar solo mientras esta build se distribuya a testers.
 * Antes de publicar al público general, cambiar a false o eliminar este bloque.
 */
const LEGACY_TESTER_CAPTURE_ENABLED = true;

export default function RootLayout() {
  useLegacyLoanMigration();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  useEffect(() => {
    migrateAppStorageToEncrypted().catch((error) => {
      console.warn("Storage encryption migration failed", error);
    });
  }, []);

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
