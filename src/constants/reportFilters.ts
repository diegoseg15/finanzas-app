import { ReportPeriodPreset } from "@/types/report.types";

export const reportPeriodOptions: {
  value: ReportPeriodPreset;
  label: string;
  description: string;
}[] = [
  {
    value: "current_month",
    label: "Mes actual",
    description: "Movimientos registrados durante este mes.",
  },
  {
    value: "last_month",
    label: "Mes anterior",
    description: "Movimientos del mes pasado.",
  },
  {
    value: "last_3_months",
    label: "Últimos 3 meses",
    description: "Resumen acumulado de los últimos tres meses.",
  },
  {
    value: "current_year",
    label: "Año actual",
    description: "Resumen desde enero hasta diciembre del año actual.",
  },
  {
    value: "custom",
    label: "Personalizado",
    description: "Elige una fecha inicial y final.",
  },
];

export const movementKindFilterOptions = [
  {
    value: "all",
    label: "Todos",
    description: "Ingresos y egresos.",
  },
  {
    value: "income",
    label: "Ingresos",
    description: "Solo entradas de dinero.",
  },
  {
    value: "expense",
    label: "Egresos",
    description: "Solo salidas de dinero.",
  },
] as const;
