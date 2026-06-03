import { AccountCardDesign } from "@/types/finance.types";

export type AccountCardDesignOption = {
  value: AccountCardDesign;
  labelI18nKey: string;
  descriptionI18nKey: string;
};

export const accountCardDesigns: AccountCardDesignOption[] = [
  {
    value: "default",
    labelI18nKey: "accounts.cardDesigns.default.label",
    descriptionI18nKey: "accounts.cardDesigns.default.description",
  },
  {
    value: "minimal",
    labelI18nKey: "accounts.cardDesigns.minimal.label",
    descriptionI18nKey: "accounts.cardDesigns.minimal.description",
  },
  {
    value: "gradient",
    labelI18nKey: "accounts.cardDesigns.gradient.label",
    descriptionI18nKey: "accounts.cardDesigns.gradient.description",
  },
  {
    value: "blue",
    labelI18nKey: "accounts.cardDesigns.blue.label",
    descriptionI18nKey: "accounts.cardDesigns.blue.description",
  },
  {
    value: "dark",
    labelI18nKey: "accounts.cardDesigns.dark.label",
    descriptionI18nKey: "accounts.cardDesigns.dark.description",
  },
  {
    value: "premium",
    labelI18nKey: "accounts.cardDesigns.premium.label",
    descriptionI18nKey: "accounts.cardDesigns.premium.description",
  },
];
