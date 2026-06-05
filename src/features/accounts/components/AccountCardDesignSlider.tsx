import { Lock } from "lucide-react-native";
import { ScrollView, StyleSheet, View } from "react-native";

import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { accountCardDesigns } from "@/constants/accountCardDesigns";
import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { AccountCardDesign } from "@/types/finance.types";

type AccountCardDesignSliderProps = {
  value: AccountCardDesign;
  isPlusUser: boolean;
  onChange: (value: AccountCardDesign) => void;
};

export function AccountCardDesignSlider({
  value,
  isPlusUser,
  onChange,
}: AccountCardDesignSliderProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <AppText variant="caption" i18nKey="accounts.form.cardDesign" />

          {!isPlusUser ? (
            <View style={[styles.upgradeNotice]}>
              <AppText
                variant="caption"
                style={[
                  styles.upgradeNoticeText,
                  {
                    color: themeColors.accent,
                  },
                ]}
                i18nKey="accounts.form.cardDesignUpgradeMessage"
              />
            </View>
          ) : null}
        </View>

        {!isPlusUser ? <Lock size={18} color={themeColors.textMuted} /> : null}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {accountCardDesigns.map((design) => {
          const selected = value === design.value;
          const locked = !isPlusUser && design.value !== "default";

          return (
            <AppCard
              key={design.value}
              style={[
                styles.designCard,
                {
                  borderColor: selected
                    ? themeColors.primary
                    : themeColors.border,
                  backgroundColor: selected
                    ? themeColors.cardSoft
                    : themeColors.card,
                  opacity: locked ? 0.58 : 1,
                },
              ]}
            >
              <View
                onTouchEnd={() => {
                  if (locked) {
                    return;
                  }

                  onChange(design.value);
                }}
                style={styles.designContent}
              >
                <View
                  style={[
                    styles.preview,
                    {
                      backgroundColor: getPreviewColor(
                        design.value,
                        themeColors,
                      ),
                    },
                  ]}
                >
                  <View style={styles.previewChip} />

                  <View style={styles.previewLines}>
                    <View style={styles.previewLineLarge} />
                    <View style={styles.previewLineSmall} />
                  </View>

                  {locked ? (
                    <View style={styles.lockBadge}>
                      <Lock size={14} color="#FFFFFF" />
                    </View>
                  ) : null}
                </View>

                <AppText
                  variant="body"
                  style={styles.designTitle}
                  i18nKey={design.labelI18nKey}
                />

                <AppText
                  variant="caption"
                  i18nKey={design.descriptionI18nKey}
                />
              </View>
            </AppCard>
          );
        })}
      </ScrollView>
    </View>
  );
}

function getPreviewColor(
  design: AccountCardDesign,
  themeColors: typeof colors.dark | typeof colors.light,
) {
  if (design === "blue") {
    return themeColors.accent;
  }

  if (design === "dark") {
    return "#111827";
  }

  if (design === "premium") {
    return themeColors.primary;
  }

  if (design === "gradient") {
    return themeColors.primarySoft;
  }

  if (design === "minimal") {
    return "#1d1e1f";
  }

  return themeColors.primary;
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  headerCopy: {
    flex: 1,
    gap: 2,
  },

  upgradeNotice: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  upgradeNoticeText: {
    fontWeight: "800",
  },

  list: {
    gap: 12,
    paddingRight: 4,
  },

  designCard: {
    width: 190,
    gap: 10,
    padding: 12,
  },

  designContent: {
    gap: 10,
  },

  preview: {
    height: 96,
    borderRadius: 22,
    padding: 14,
    overflow: "hidden",
    justifyContent: "space-between",
  },

  previewChip: {
    width: 36,
    height: 24,
    borderRadius: 9,
    backgroundColor: "rgba(255,255,255,0.28)",
  },

  previewLines: {
    gap: 6,
  },

  previewLineLarge: {
    width: "70%",
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.75)",
  },

  previewLineSmall: {
    width: "42%",
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.45)",
  },

  lockBadge: {
    position: "absolute",
    right: 12,
    top: 12,
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.32)",
    alignItems: "center",
    justifyContent: "center",
  },

  designTitle: {
    fontWeight: "800",
  },
});
