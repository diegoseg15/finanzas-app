import { colors } from "@/constants/colors";
import { Category } from "@/types/finance.types";

export const categories: Category[] = [
  {
    id: "salary",
    name: "Sueldo",
    type: "income",
    icon: "briefcase",
    color: colors.dark.income,
  },
  {
    id: "freelance",
    name: "Proyecto / Freelance",
    type: "income",
    icon: "laptop",
    color: colors.dark.secondary,
  },
  {
    id: "investment_income",
    name: "Inversión",
    type: "income",
    icon: "trending-up",
    color: colors.dark.primary,
  },
  {
    id: "gift_income",
    name: "Regalo / Extra",
    type: "income",
    icon: "gift",
    color: colors.dark.warning,
  },
  {
    id: "food",
    name: "Alimentación",
    type: "expense",
    icon: "utensils",
    color: colors.dark.expense,
  },
  {
    id: "transport",
    name: "Transporte",
    type: "expense",
    icon: "car",
    color: colors.dark.secondary,
  },
  {
    id: "housing",
    name: "Vivienda",
    type: "expense",
    icon: "home",
    color: colors.dark.primary,
  },
  {
    id: "services",
    name: "Servicios",
    type: "expense",
    icon: "receipt",
    color: colors.dark.warning,
  },
  {
    id: "health",
    name: "Salud",
    type: "expense",
    icon: "heart-pulse",
    color: colors.dark.expense,
  },
  {
    id: "education",
    name: "Educación",
    type: "expense",
    icon: "graduation-cap",
    color: colors.dark.secondary,
  },
  {
    id: "entertainment",
    name: "Entretenimiento",
    type: "expense",
    icon: "gamepad-2",
    color: colors.dark.primary,
  },
  {
    id: "subscriptions",
    name: "Suscripciones",
    type: "expense",
    icon: "repeat",
    color: colors.dark.warning,
  },
  {
    id: "technology",
    name: "Tecnología",
    type: "expense",
    icon: "smartphone",
    color: colors.dark.secondary,
  },
  {
    id: "debt_payment",
    name: "Pago de deuda",
    type: "expense",
    icon: "credit-card",
    color: colors.dark.expense,
  },
  {
    id: "other",
    name: "Otros",
    type: "both",
    icon: "circle-dollar-sign",
    color: colors.dark.textMuted,
  },
];

export function getCategoryById(categoryId: string) {
  return categories.find((category) => category.id === categoryId);
}

export function getCategoriesByMovementKind(kind: "income" | "expense") {
  return categories.filter(
    (category) => category.type === kind || category.type === "both",
  );
}
