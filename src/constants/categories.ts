import { Category, MovementKind } from "@/types/finance.types";
import { colors } from "./colors";

export const expenseCategories: Category[] = [
  {
    id: "food",
    name: "Comida",
    labelI18nKey: "categories.food",
    type: "expense",
    icon: "utensils",
    color: "#F97316",
  },
  {
    id: "transport",
    name: "Transporte",
    labelI18nKey: "categories.transport",
    type: "expense",
    icon: "car",
    color: "#3B82F6",
  },
  {
    id: "housing",
    name: "Vivienda",
    labelI18nKey: "categories.housing",
    type: "expense",
    icon: "home",
    color: "#8B5CF6",
  },
  {
    id: "utilities",
    name: "Servicios",
    labelI18nKey: "categories.utilities",
    type: "expense",
    icon: "receipt",
    color: "#06B6D4",
  },
  {
    id: "health",
    name: "Salud",
    labelI18nKey: "categories.health",
    type: "expense",
    icon: "heart-pulse",
    color: "#EF4444",
  },
  {
    id: "education",
    name: "Educación",
    labelI18nKey: "categories.education",
    type: "expense",
    icon: "graduation-cap",
    color: "#6366F1",
  },
  {
    id: "entertainment",
    name: "Entretenimiento",
    labelI18nKey: "categories.entertainment",
    type: "expense",
    icon: "gamepad-2",
    color: "#EC4899",
  },
  {
    id: "shopping",
    name: "Compras",
    labelI18nKey: "categories.shopping",
    type: "expense",
    icon: "shopping-bag",
    color: "#A855F7",
  },
  {
    id: "subscriptions",
    name: "Suscripciones",
    labelI18nKey: "categories.subscriptions",
    type: "expense",
    icon: "refresh-cw",
    color: "#14B8A6",
  },
  {
    id: "debt",
    name: "Deudas",
    labelI18nKey: "categories.debt",
    type: "expense",
    icon: "landmark",
    color: "#DC2626",
  },
  {
    id: "savings",
    name: "Ahorro",
    labelI18nKey: "categories.savings",
    type: "expense",
    icon: "piggy-bank",
    color: "#42A2ED",
  },
  {
    id: "taxes",
    name: "Impuestos",
    labelI18nKey: "categories.taxes",
    type: "expense",
    icon: "file-text",
    color: "#64748B",
  },
  {
    id: "pets",
    name: "Mascotas",
    labelI18nKey: "categories.pets",
    type: "expense",
    icon: "paw-print",
    color: "#F59E0B",
  },
  {
    id: "family",
    name: "Familia",
    labelI18nKey: "categories.family",
    type: "expense",
    icon: "users",
    color: "#10B981",
  },
  {
    id: "other_expense",
    name: "Otros gastos",
    labelI18nKey: "categories.otherExpense",
    type: "expense",
    icon: "circle-dollar-sign",
    color: "#71717A",
  },
];

export const incomeCategories: Category[] = [
  {
    id: "salary",
    name: "Salario",
    labelI18nKey: "categories.salary",
    type: "income",
    icon: "briefcase-business",
    color: "#22C55E",
  },
  {
    id: "freelance",
    name: "Freelance",
    labelI18nKey: "categories.freelance",
    type: "income",
    icon: "laptop",
    color: "#14B8A6",
  },
  {
    id: "business",
    name: "Negocio",
    labelI18nKey: "categories.business",
    type: "income",
    icon: "store",
    color: "#3B82F6",
  },
  {
    id: "sales",
    name: "Ventas",
    labelI18nKey: "categories.sales",
    type: "income",
    icon: "shopping-cart",
    color: "#8B5CF6",
  },
  {
    id: "investments",
    name: "Inversiones",
    labelI18nKey: "categories.investments",
    type: "income",
    icon: "trending-up",
    color: "#F59E0B",
  },
  {
    id: "gifts",
    name: "Regalos",
    labelI18nKey: "categories.gifts",
    type: "income",
    icon: "gift",
    color: "#EC4899",
  },
  {
    id: "refunds",
    name: "Reembolsos",
    labelI18nKey: "categories.refunds",
    type: "income",
    icon: "rotate-ccw",
    color: "#06B6D4",
  },
  {
    id: "loan_collected",
    name: "Préstamo cobrado",
    labelI18nKey: "categories.loanCollected",
    type: "income",
    icon: "hand-coins",
    color: "#16A34A",
  },
  {
    id: "other_income",
    name: "Otros ingresos",
    labelI18nKey: "categories.otherIncome",
    type: "income",
    icon: "circle-dollar-sign",
    color: "#71717A",
  },
];

export const sharedCategories: Category[] = [
  {
    id: "other",
    name: "Otros",
    labelI18nKey: "categories.other",
    type: "both",
    icon: "circle-dollar-sign",
    color: colors.dark.textMuted,
  },
];

export const categories: Category[] = [
  ...expenseCategories,
  ...incomeCategories,
];

export function getCategoryById(categoryId: string) {
  return categories.find((category) => category.id === categoryId);
}

export function getCategoriesByType(kind: MovementKind) {
  return categories.filter((category) => category.type === kind);
}
