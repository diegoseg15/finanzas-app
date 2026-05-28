import { colors } from "@/constants/colors";
import { Tag } from "@/types/finance.types";

export const tags: Tag[] = [
  {
    id: "essential",
    name: "Esencial",
    labelI18nKey: "tags.essential",
    color: colors.dark.income,
  },
  {
    id: "optional",
    name: "Opcional",
    labelI18nKey: "tags.optional",
    color: colors.dark.textMuted,
  },
  {
    id: "urgent",
    name: "Urgente",
    labelI18nKey: "tags.urgent",
    color: colors.dark.expense,
  },
  {
    id: "recurring",
    name: "Recurrente",
    labelI18nKey: "tags.recurring",
    color: colors.dark.primary,
  },
  {
    id: "planned",
    name: "Planificado",
    labelI18nKey: "tags.planned",
    color: colors.dark.secondary,
  },
  {
    id: "unplanned",
    name: "No planificado",
    labelI18nKey: "tags.unplanned",
    color: colors.dark.warning,
  },
  {
    id: "cash",
    name: "Efectivo",
    labelI18nKey: "tags.cash",
    color: colors.dark.secondary,
  },
  {
    id: "card",
    name: "Tarjeta",
    labelI18nKey: "tags.card",
    color: colors.dark.primary,
  },
  {
    id: "transfer",
    name: "Transferencia",
    labelI18nKey: "tags.transfer",
    color: colors.dark.primary,
  },
  {
    id: "online",
    name: "Online",
    labelI18nKey: "tags.online",
    color: colors.dark.secondary,
  },
  {
    id: "subscription",
    name: "Suscripción",
    labelI18nKey: "tags.subscription",
    color: colors.dark.warning,
  },
  {
    id: "work",
    name: "Trabajo",
    labelI18nKey: "tags.work",
    color: colors.dark.income,
  },
  {
    id: "personal",
    name: "Personal",
    labelI18nKey: "tags.personal",
    color: colors.dark.primary,
  },
  {
    id: "family",
    name: "Familia",
    labelI18nKey: "tags.family",
    color: colors.dark.warning,
  },
  {
    id: "business",
    name: "Negocio",
    labelI18nKey: "tags.business",
    color: colors.dark.income,
  },
  {
    id: "tax",
    name: "Impuesto",
    labelI18nKey: "tags.tax",
    color: colors.dark.expense,
  },
  {
    id: "invoice",
    name: "Factura",
    labelI18nKey: "tags.invoice",
    color: colors.dark.secondary,
  },
  {
    id: "debt",
    name: "Deuda",
    labelI18nKey: "tags.debt",
    color: colors.dark.expense,
  },
  {
    id: "savings",
    name: "Ahorro",
    labelI18nKey: "tags.savings",
    color: colors.dark.income,
  },
  {
    id: "small_expense",
    name: "Gasto hormiga",
    labelI18nKey: "tags.small_expense",
    color: colors.dark.warning,
  },
];
