import { create } from "zustand";

import { ReportFilters } from "@/types/report.types";

type ReportFilterState = {
  filters: ReportFilters;

  setFilters: (filters: Partial<ReportFilters>) => void;
  resetFilters: () => void;
};

export const defaultReportFilters: ReportFilters = {
  periodPreset: "current_month",
  movementKind: "all",
  currency: "all",
};

export const useReportFilterStore = create<ReportFilterState>((set) => ({
  filters: defaultReportFilters,

  setFilters: (filters) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters,
      },
    }));
  },

  resetFilters: () => {
    set({
      filters: defaultReportFilters,
    });
  },
}));
