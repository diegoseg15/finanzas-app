import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { colors } from "@/constants/colors";
import { routes } from "@/constants/routes";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

export default function IndexScreen() {
  const hasHydrated = useAppSettingsStore((state) => state.hasHydrated);
  const hasCompletedOnboarding = useAppSettingsStore(
    (state) => state.hasCompletedOnboarding,
  );
  const theme = useAppSettingsStore((state) => state.resolvedTheme);

  const themeColors = colors[theme];

  if (!hasHydrated) {
    return (
      <View
        style={[
          styles.loadingContainer,
          {
            backgroundColor: themeColors.background,
          },
        ]}
      >
        <ActivityIndicator color={themeColors.primary} />
      </View>
    );
  }

  if (hasCompletedOnboarding) {
    return <Redirect href={routes.tabs.home as never} />;
  }

  return <Redirect href={routes.onboarding.welcome as never} />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
