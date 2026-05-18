import { ReactNode } from "react";
import { ScrollView, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

type ScreenProps = {
  children: ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
};

export function Screen({ children, scroll = true, style }: ScreenProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  if (scroll) {
    return (
      <SafeAreaView
        style={[
          styles.safeArea,
          {
            backgroundColor: themeColors.background,
          },
        ]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, style]}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: themeColors.background,
        },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
