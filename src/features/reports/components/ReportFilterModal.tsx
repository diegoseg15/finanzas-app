import { useEffect, useState } from "react";

import { AppButton } from "@/components/ui/AppButton";
import { AppFormModal } from "@/components/ui/AppFormModal";
import {
  defaultReportFilters,
  useReportFilterStore,
} from "@/store/useReportFilterStore";
import { ReportFilters } from "@/types/report.types";
import { View } from "lucide-react-native";
import { StyleSheet } from "react-native";
import { ReportFilterPanel } from "./ReportFilterPanel";

type ReportFilterModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function ReportFilterModal({
  visible,
  onClose,
}: ReportFilterModalProps) {
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
    <AppFormModal
      visible={visible}
      title="Filtros de reporte"
      description="Ajusta el período, cuenta, categoría y moneda."
      onClose={onClose}
    >
      <ReportFilterPanel
        compact
        filters={draftFilters}
        onChangeFilters={handleChangeDraftFilters}
        onResetFilters={handleResetDraftFilters}
      />

      <View style={styles.actions} />

      <AppButton onPress={handleApplyFilters}>Aplicar filtros</AppButton>
    </AppFormModal>
  );
}

const styles = StyleSheet.create({
  actions: {
    marginTop: 18,
  },
});
