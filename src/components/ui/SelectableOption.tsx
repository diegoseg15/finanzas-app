import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { AppText } from "./AppText";

type I18nValues = Record<string, string | number>;

type SelectableOptionProps = {
  title?: string;
  titleI18nKey?: string;
  titleI18nValues?: I18nValues;
  description?: string;
  descriptionI18nKey?: string;
  descriptionI18nValues?: I18nValues;
  selected?: boolean;
  leftSlot?: ReactNode;
  onPress: () => void;
};

export function SelectableOption({
  title,
  titleI18nKey,
  titleI18nValues,
  description,
  descriptionI18nKey,
  descriptionI18nValues,
  selected = false,
  leftSlot,
  onPress,
}: SelectableOptionProps) {
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const resolvedTitle = titleI18nKey ? t(titleI18nKey, titleI18nValues) : title;

  const resolvedDescription = descriptionI18nKey
    ? t(descriptionI18nKey, descriptionI18nValues)
    : description;

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
        {resolvedTitle ? <AppText>{resolvedTitle}</AppText> : null}

        {resolvedDescription ? (
          <AppText variant="caption" style={{ marginTop: 3 }}>
            {resolvedDescription}
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
