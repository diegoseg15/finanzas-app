import { MovementKind } from "@/types/finance.types";
import { ReportPeriodPreset } from "@/types/report.types";

export const reportPeriodOptions: {
  value: ReportPeriodPreset;
  labelI18nKey: string;
  descriptionI18nKey: string;
}[] = [
  {
    value: "current_month",
    labelI18nKey: "reports.periods.current_month.label",
    descriptionI18nKey: "reports.periods.current_month.description",
  },
  {
    value: "last_month",
    labelI18nKey: "reports.periods.last_month.label",
    descriptionI18nKey: "reports.periods.last_month.description",
  },
  {
    value: "last_3_months",
    labelI18nKey: "reports.periods.last_3_months.label",
    descriptionI18nKey: "reports.periods.last_3_months.description",
  },
  {
    value: "current_year",
    labelI18nKey: "reports.periods.current_year.label",
    descriptionI18nKey: "reports.periods.current_year.description",
  },
  {
    value: "custom",
    labelI18nKey: "reports.periods.custom.label",
    descriptionI18nKey: "reports.periods.custom.description",
  },
];

export const movementKindFilterOptions: {
  value: MovementKind | "all";
  labelI18nKey: string;
  descriptionI18nKey: string;
}[] = [
  {
    value: "all",
    labelI18nKey: "reports.movementKinds.all.label",
    descriptionI18nKey: "reports.movementKinds.all.description",
  },
  {
    value: "income",
    labelI18nKey: "reports.movementKinds.income.label",
    descriptionI18nKey: "reports.movementKinds.income.description",
  },
  {
    value: "expense",
    labelI18nKey: "reports.movementKinds.expense.label",
    descriptionI18nKey: "reports.movementKinds.expense.description",
  },
];
