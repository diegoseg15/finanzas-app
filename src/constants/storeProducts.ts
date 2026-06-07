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
  {
    id: "card_pack_dark",
    playStoreProductId: "orvian_card_pack_dark",
    type: "card_pack",
    nameI18nKey: "plans.products.cardPacks.dark.name",
    descriptionI18nKey: "plans.products.cardPacks.dark.description",
    priceLabel: "$0.99",
    featuresI18nKeys: [
      "plans.products.cardPacks.dark.features.darkCards",
      "plans.products.cardPacks.shared.features.premiumStyle",
      "plans.products.cardPacks.shared.features.oneTimePurchase",
    ],
  },
  {
    id: "card_pack_luxury",
    playStoreProductId: "orvian_card_pack_luxury",
    type: "card_pack",
    nameI18nKey: "plans.products.cardPacks.luxury.name",
    descriptionI18nKey: "plans.products.cardPacks.luxury.description",
    priceLabel: "$0.99",
    featuresI18nKeys: [
      "plans.products.cardPacks.luxury.features.luxuryCards",
      "plans.products.cardPacks.shared.features.elegantStyle",
      "plans.products.cardPacks.shared.features.oneTimePurchase",
    ],
  },
  {
    id: "card_pack_crypto",
    playStoreProductId: "orvian_card_pack_crypto",
    type: "card_pack",
    nameI18nKey: "plans.products.cardPacks.crypto.name",
    descriptionI18nKey: "plans.products.cardPacks.crypto.description",
    priceLabel: "$0.99",
    featuresI18nKeys: [
      "plans.products.cardPacks.crypto.features.cryptoCards",
      "plans.products.cardPacks.shared.features.techStyle",
      "plans.products.cardPacks.shared.features.oneTimePurchase",
    ],
  },
  {
    id: "card_pack_minimal",
    playStoreProductId: "orvian_card_pack_minimal",
    type: "card_pack",
    nameI18nKey: "plans.products.cardPacks.minimal.name",
    descriptionI18nKey: "plans.products.cardPacks.minimal.description",
    priceLabel: "$0.99",
    featuresI18nKeys: [
      "plans.products.cardPacks.minimal.features.minimalCards",
      "plans.products.cardPacks.shared.features.cleanStyle",
      "plans.products.cardPacks.shared.features.oneTimePurchase",
    ],
  },
];

export function getStoreProductById(productId: ProductEntitlement) {
  return storeProducts.find((product) => product.id === productId);
}
