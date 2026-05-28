import { Lock } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { AppText } from "./AppText";

type I18nValues = Record<string, string | number>;

type PremiumBadgeProps = {
  label?: string;
  labelI18nKey?: string;
  labelI18nValues?: I18nValues;
};

export function PremiumBadge({
  label = "Plus",
  labelI18nKey,
  labelI18nValues,
}: PremiumBadgeProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: themeColors.primary,
        },
      ]}
    >
      <Lock size={12} color="#FFFFFF" />

      <AppText
        variant="caption"
        style={styles.text}
        i18nKey={labelI18nKey}
        i18nValues={labelI18nValues}
      >
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    minHeight: 28,
    borderRadius: 999,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  text: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
});
