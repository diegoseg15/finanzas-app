import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TextStyle } from "react-native";

import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

type AppTextVariant = "title" | "subtitle" | "body" | "caption" | "muted";

type I18nValues = Record<string, string | number>;

type AppTextProps = {
  children?: ReactNode;
  variant?: AppTextVariant;
  style?: TextStyle;
  i18nKey?: string;
  i18nValues?: I18nValues;
};

export function AppText({
  children,
  variant = "body",
  style,
  i18nKey,
  i18nValues,
}: AppTextProps) {
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const color =
    variant === "muted" || variant === "caption"
      ? themeColors.textMuted
      : themeColors.text;

  const content = i18nKey ? t(i18nKey, i18nValues) : children;

  return (
    <Text style={[styles.base, styles[variant], { color }, style]}>
      {content}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: undefined,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -1,
  },

  subtitle: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.5,
  },

  body: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
  },

  caption: {
    fontSize: 12,
    fontWeight: "500",
  },

  muted: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
});
