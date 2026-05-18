import { colors } from "@/constants/colors";
import { Tag } from "@/types/finance.types";

export const tags: Tag[] = [
  {
    id: "gasto_hormiga",
    name: "Gasto hormiga",
    color: colors.dark.warning,
  },
  {
    id: "trabajo",
    name: "Trabajo",
    color: colors.dark.secondary,
  },
  {
    id: "proyecto",
    name: "Proyecto",
    color: colors.dark.primary,
  },
  {
    id: "personal",
    name: "Personal",
    color: colors.dark.textMuted,
  },
  {
    id: "urgente",
    name: "Urgente",
    color: colors.dark.expense,
  },
  {
    id: "recurrente",
    name: "Recurrente",
    color: colors.dark.income,
  },
  {
    id: "innecesario",
    name: "Innecesario",
    color: colors.dark.expense,
  },
  {
    id: "importante",
    name: "Importante",
    color: colors.dark.primary,
  },
];

export function getTagById(tagId: string) {
  return tags.find((tag) => tag.id === tagId);
}
