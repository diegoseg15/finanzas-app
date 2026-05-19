import { X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import {
    defaultReportFilters,
    useReportFilterStore,
} from "@/store/useReportFilterStore";
import { ReportFilters } from "@/types/report.types";
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

  const filters = useReportFilterStore((state) => state.filters);
  const setFilters = useReportFilterStore((state) => state.setFilters);

  const [draftFilters, setDraftFilters] = useState<ReportFilters>(filters);

  useEffect(() => {
    if (visible) {
      setDraftFilters(filters);
    }
  }, [visible, filters]);

  const handleChangeDraftFilters = (nextFilters: Partial<ReportFilters>) => {
    setDraftFilters((currentFilters) => ({
      ...currentFilters,
      ...nextFilters,
    }));
  };

  const handleResetDraftFilters = () => {
    setDraftFilters(defaultReportFilters);
  };

  const handleApplyFilters = () => {
    setFilters(draftFilters);
    onClose();
  };

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
            <ReportFilterPanel
              compact
              filters={draftFilters}
              onChangeFilters={handleChangeDraftFilters}
              onResetFilters={handleResetDraftFilters}
            />
          </View>

          <View style={styles.actions}>
            <AppButton variant="secondary" onPress={onClose}>
              Cancelar
            </AppButton>

            <AppButton onPress={handleApplyFilters}>Aplicar filtros</AppButton>
          </View>
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

  actions: {
    gap: 10,
  },
});
