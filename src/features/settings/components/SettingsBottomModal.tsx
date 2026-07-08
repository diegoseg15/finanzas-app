import { ReactNode } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

export function SettingsBottomModal({
  visible,
  title,
  description,
  icon,
  children,
  onClose,
}: {
  visible: boolean;
  title: string;
  description?: string;
  icon: ReactNode;
  children: ReactNode;
  onClose: () => void;
}) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <Pressable style={styles.modalBackdrop} onPress={onClose} />

        <View
          style={[
            styles.bottomSheet,
            {
              backgroundColor: themeColors.background,
            },
          ]}
        >
          <View style={styles.modalHandle} />

          <Pressable
            onPress={onClose}
            style={[
              styles.modalClose,
              {
                backgroundColor: themeColors.cardSoft,
              },
            ]}
          >
            <AppText style={styles.modalCloseText}>×</AppText>
          </Pressable>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.modalContent}
          >
            <View
              style={[
                styles.modalHeroIcon,
                {
                  backgroundColor: themeColors.accentSoft,
                  borderColor: themeColors.border,
                },
              ]}
            >
              {icon}
            </View>

            <View style={styles.modalCopy}>
              <AppText variant="title" style={styles.centerText}>
                {title}
              </AppText>

              {description ? (
                <AppText variant="muted" style={styles.centerText}>
                  {description}
                </AppText>
              ) : null}
            </View>

            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },

  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.56)",
  },

  bottomSheet: {
    maxHeight: "88%",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 24,
  },

  modalHandle: {
    alignSelf: "center",
    width: 44,
    height: 4,
    borderRadius: 999,
    backgroundColor: "rgba(150, 150, 150, 0.45)",
    marginBottom: 12,
  },

  modalClose: {
    position: "absolute",
    top: 14,
    right: 16,
    zIndex: 2,
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  modalCloseText: {
    fontSize: 26,
    lineHeight: 28,
    fontWeight: "700",
  },

  modalContent: {
    gap: 18,
    paddingTop: 22,
    paddingBottom: 8,
  },

  modalHeroIcon: {
    width: 86,
    height: 86,
    borderRadius: 32,
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  modalCopy: {
    gap: 8,
  },

  centerText: {
    textAlign: "center",
  },
});
