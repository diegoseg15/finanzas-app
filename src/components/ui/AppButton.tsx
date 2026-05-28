import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

type AppButtonVariant = "primary" | "secondary" | "ghost";

type I18nValues = Record<string, string | number>;

type AppButtonProps = PressableProps & {
  children?: ReactNode;
  variant?: AppButtonVariant;
  style?: ViewStyle;
  i18nKey?: string;
  i18nValues?: I18nValues;
};

export function AppButton({
  children,
  variant = "primary",
  style,
  disabled,
  i18nKey,
  i18nValues,
  ...props
}: AppButtonProps) {
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const backgroundColor =
    variant === "primary"
      ? themeColors.primary
      : variant === "secondary"
        ? themeColors.cardSoft
        : "transparent";

  const textColor =
    variant === "primary"
      ? "#FFFFFF"
      : variant === "secondary"
        ? themeColors.text
        : themeColors.textMuted;

  const translatedContent = i18nKey ? t(i18nKey, i18nValues) : undefined;

  const content =
    translatedContent ||
    typeof children === "string" ||
    typeof children === "number" ? (
      <Text style={[styles.text, { color: textColor }]}>
        {translatedContent ?? children}
      </Text>
    ) : (
      <View style={styles.content}>{children}</View>
    );

  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor,
          opacity: disabled ? 0.45 : pressed ? 0.75 : 1,
          borderColor: variant === "ghost" ? themeColors.border : "transparent",
        },
        style,
      ]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    paddingHorizontal: 20,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  text: {
    fontSize: 15,
    fontWeight: "700",
  },
});
