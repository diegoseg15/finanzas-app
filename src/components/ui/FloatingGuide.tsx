import { X } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { AppGuideKey } from "@/types/guide.types";

type FloatingGuideProps = {
  guideKey: AppGuideKey;
  titleI18nKey: string;
  descriptionI18nKey: string;
};

export function FloatingGuide({
  guideKey,
  titleI18nKey,
  descriptionI18nKey,
}: FloatingGuideProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const seenGuides = useAppSettingsStore((state) => state.seenGuides);
  const markGuideAsSeen = useAppSettingsStore((state) => state.markGuideAsSeen);

  const isVisible = !seenGuides.includes(guideKey);

  if (!isVisible) {
    return null;
  }

  return (
    <AppCard
      style={[
        styles.card,
        {
          backgroundColor: themeColors.card,
          borderColor: themeColors.primary,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.copy}>
          <AppText variant="subtitle" i18nKey={titleI18nKey} />

          <AppText variant="muted" i18nKey={descriptionI18nKey} />
        </View>

        <Pressable
          onPress={() => markGuideAsSeen(guideKey)}
          style={[
            styles.closeButton,
            {
              backgroundColor: themeColors.cardSoft,
            },
          ]}
        >
          <X size={17} color={themeColors.textMuted} />
        </Pressable>
      </View>

      <AppButton
        onPress={() => markGuideAsSeen(guideKey)}
        i18nKey="common.understood"
      />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 14,
    borderWidth: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  copy: {
    flex: 1,
    gap: 6,
  },

  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
});
