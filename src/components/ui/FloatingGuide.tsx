import { X } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { AppGuideKey } from "@/types/guide.types";

type FloatingGuidePlacement = "top" | "center" | "bottom";

type FloatingGuideProps = {
  guideKey: AppGuideKey;
  titleI18nKey: string;
  descriptionI18nKey: string;
  placement?: FloatingGuidePlacement;
};

export function FloatingGuide({
  guideKey,
  titleI18nKey,
  descriptionI18nKey,
  placement = "bottom",
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
    <View pointerEvents="box-none" style={styles.overlay}>
      <View pointerEvents="box-none" style={styles.backdrop} />

      <View
        style={[
          styles.floatingWrapper,
          placement === "top" ? styles.topPlacement : null,
          placement === "center" ? styles.centerPlacement : null,
          placement === "bottom" ? styles.bottomPlacement : null,
        ]}
      >
        <View
          style={[
            styles.bubble,
            {
              backgroundColor: themeColors.card,
              borderColor: themeColors.primary,
              shadowColor: themeColors.text,
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

          <View style={styles.actions}>
            <AppButton
              onPress={() => markGuideAsSeen(guideKey)}
              i18nKey="common.understood"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    elevation: 999,
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.08)",
  },

  floatingWrapper: {
    position: "absolute",
    left: 18,
    right: 18,
  },

  topPlacement: {
    top: 22,
  },

  centerPlacement: {
    top: "38%",
  },

  bottomPlacement: {
    bottom: 24,
  },

  bubble: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    gap: 14,
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 12,
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

  actions: {
    gap: 10,
  },
});
