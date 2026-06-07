import { ProductEntitlement } from "@/types/subscription.types";

export type StoreProductType = "lifetime" | "card_pack";

export type StoreProduct = {
  id: ProductEntitlement;
  playStoreProductId: string;
  type: StoreProductType;
  nameI18nKey: string;
  descriptionI18nKey: string;
  priceLabel: string;
  legacyPriceLabel?: string;
  featuresI18nKeys: string[];
};

export const storeProducts: StoreProduct[] = [
  {
    id: "plus_lifetime",
    playStoreProductId: "orvian_plus_lifetime",
    type: "lifetime",
    nameI18nKey: "plans.products.plusLifetime.name",
    descriptionI18nKey: "plans.products.plusLifetime.description",
    priceLabel: "$4.99",
    legacyPriceLabel: "$2.99",
    featuresI18nKeys: [
      "plans.products.plusLifetime.features.unlimitedAccounts",
      "plans.products.plusLifetime.features.unlimitedReminders",
      "plans.products.plusLifetime.features.cardDesigns",
      "plans.products.plusLifetime.features.customCategories",
      "plans.products.plusLifetime.features.advancedCustomization",
      "plans.products.plusLifetime.features.localExport",
    ],
  },
];

export function getStoreProductById(productId: ProductEntitlement) {
  return storeProducts.find((product) => product.id === productId);
}
