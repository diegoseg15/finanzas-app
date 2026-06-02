import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";

type HomeQuickActionProps = {
  labelI18nKey: string;
  icon: ReactNode;
  backgroundColor?: string;
  borderColor: string;
  textColor: string;
  isHighlighted?: boolean;
  onPress: () => void;
};

export function HomeQuickAction({
  labelI18nKey,
  icon,
  backgroundColor = "transparent",
  borderColor,
  textColor,
  isHighlighted = false,
  onPress,
}: HomeQuickActionProps) {
  return (
    <Pressable onPress={onPress} style={styles.quickAction}>
      <View
        style={[
          styles.quickActionIcon,
          isHighlighted ? styles.quickActionIconHighlighted : null,
          {
            backgroundColor,
            borderColor,
          },
        ]}
      >
        {icon}
      </View>

      <AppText
        variant="caption"
        style={[
          styles.quickActionText,
          {
            color: textColor,
          },
          isHighlighted ? styles.quickActionTextHighlighted : null,
        ]}
        i18nKey={labelI18nKey}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  quickAction: {
    flex: 1,
    alignItems: "center",
    gap: 9,
  },

  quickActionIcon: {
    width: 58,
    height: 58,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  quickActionIconHighlighted: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 6,
  },

  quickActionText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
    textAlign: "center",
  },

  quickActionTextHighlighted: {
    fontWeight: "900",
  },
});
