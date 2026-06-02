import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

type HomeSectionHeaderProps = {
  titleI18nKey: string;
  actionI18nKey?: string;
  onActionPress?: () => void;
};

export function HomeSectionHeader({
  titleI18nKey,
  actionI18nKey,
  onActionPress,
}: HomeSectionHeaderProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <View style={styles.sectionHeader}>
      <AppText variant="subtitle" i18nKey={titleI18nKey} />

      {actionI18nKey && onActionPress ? (
        <Pressable onPress={onActionPress}>
          <AppText
            variant="caption"
            style={{ color: themeColors.primary }}
            i18nKey={actionI18nKey}
          />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
