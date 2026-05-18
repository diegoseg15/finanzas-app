import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { AppText } from "./AppText";

type SelectableOptionProps = {
  title: string;
  description?: string;
  selected?: boolean;
  leftSlot?: ReactNode;
  onPress: () => void;
};

export function SelectableOption({
  title,
  description,
  selected = false,
  leftSlot,
  onPress,
}: SelectableOptionProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        {
          backgroundColor: selected ? themeColors.cardSoft : themeColors.card,
          borderColor: selected ? themeColors.primary : themeColors.border,
          opacity: pressed ? 0.75 : 1,
        },
      ]}
    >
      {leftSlot ? <View style={styles.leftSlot}>{leftSlot}</View> : null}

      <View style={styles.content}>
        <AppText>{title}</AppText>

        {description ? (
          <AppText variant="caption" style={{ marginTop: 3 }}>
            {description}
          </AppText>
        ) : null}
      </View>

      <View
        style={[
          styles.radio,
          {
            borderColor: selected ? themeColors.primary : themeColors.border,
            backgroundColor: selected ? themeColors.primary : "transparent",
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    minHeight: 72,
    borderWidth: 1,
    borderRadius: 22,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  leftSlot: {
    width: 36,
    height: 36,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flex: 1,
  },

  radio: {
    width: 18,
    height: 18,
    borderRadius: 999,
    borderWidth: 2,
  },
});
