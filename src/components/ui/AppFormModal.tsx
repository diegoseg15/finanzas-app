import { X } from "lucide-react-native";
import { ReactNode } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { AppText } from "./AppText";

type AppFormModalProps = {
  visible: boolean;
  title?: string;
  description?: string;
  showHeader?: boolean;
  children: ReactNode;
  onClose: () => void;
};

export function AppFormModal({
  visible,
  title,
  description,
  showHeader = true,
  children,
  onClose,
}: AppFormModalProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <View
          style={[
            styles.sheet,
            {
              backgroundColor: themeColors.background,
              borderColor: themeColors.border,
            },
          ]}
        >
          {showHeader ? (
            <View style={styles.header}>
              <View style={styles.copy}>
                {title ? <AppText variant="subtitle">{title}</AppText> : null}

                {description ? (
                  <AppText variant="caption">{description}</AppText>
                ) : null}
              </View>

              <Pressable onPress={onClose} style={styles.closeButton}>
                <X size={20} color={themeColors.textMuted} />
              </Pressable>
            </View>
          ) : null}

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.content}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "flex-end",
  },

  sheet: {
    maxHeight: "90%",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    padding: 18,
    gap: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
  },

  copy: {
    flex: 1,
    gap: 4,
  },

  closeButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    paddingBottom: 24,
  },
});
