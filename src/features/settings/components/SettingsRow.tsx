import { ChevronRight } from "lucide-react-native";
import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

export function SettingsRow({
  icon,
  title,
  description,
  onPress,
}: {
  icon: ReactNode;
  title: string;
  description?: string;
  onPress: () => void;
}) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.settingsRow,
        {
          opacity: pressed ? 0.75 : 1,
        },
      ]}
    >
      <View
        style={[
          styles.rowIcon,
          {
            backgroundColor: themeColors.accentSoft,
          },
        ]}
      >
        {icon}
      </View>

      <View style={styles.rowCopy}>
        <AppText variant="body">{title}</AppText>

        {description ? (
          <AppText variant="caption" numberOfLines={1}>
            {description}
          </AppText>
        ) : null}
      </View>

      <ChevronRight size={19} color={themeColors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  settingsRow: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },

  rowIcon: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  rowCopy: {
    flex: 1,
    gap: 3,
  },
});
