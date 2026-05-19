import { X } from "lucide-react-native";
import { Modal, Pressable, StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { ReportFilterPanel } from "./ReportFilterPanel";

type ReportFilterModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function ReportFilterModal({
  visible,
  onClose,
}: ReportFilterModalProps) {
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
          <View style={styles.header}>
            <View style={styles.headerCopy}>
              <AppText variant="subtitle">Filtros de reporte</AppText>
              <AppText variant="caption">
                Ajusta el período, cuenta, categoría y moneda.
              </AppText>
            </View>

            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={20} color={themeColors.textMuted} />
            </Pressable>
          </View>

          <View style={styles.content}>
            <ReportFilterPanel compact />
          </View>

          <AppButton onPress={onClose}>Aplicar filtros</AppButton>
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
    maxHeight: "88%",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    padding: 18,
    gap: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
  },

  headerCopy: {
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
    flexShrink: 1,
  },
});
