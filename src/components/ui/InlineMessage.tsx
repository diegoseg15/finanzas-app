import { StyleSheet, View } from "react-native";

import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { AppText } from "./AppText";

type InlineMessageType = "info" | "warning" | "error" | "success";

type InlineMessageProps = {
  message: string;
  type?: InlineMessageType;
};

export function InlineMessage({ message, type = "info" }: InlineMessageProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const accentColor =
    type === "error"
      ? themeColors.expense
      : type === "warning"
        ? themeColors.warning
        : type === "success"
          ? themeColors.income
          : themeColors.secondary;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColors.cardSoft,
          borderColor: accentColor,
        },
      ]}
    >
      <AppText variant="caption" style={{ color: themeColors.text }}>
        {message}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 4,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
