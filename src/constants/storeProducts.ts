import { ProductEntitlement } from "@/types/subscription.types";

export type StoreProductType = "lifetime" | "card_pack";

export type StoreProduct = {
  id: ProductEntitlement;
  playStoreProductId: string;
  type: StoreProductType;
  name: string;
  description: string;
  priceLabel: string;
  legacyPriceLabel?: string;
  features: string[];
};

export const storeProducts: StoreProduct[] = [
  {
    id: "plus_lifetime",
    playStoreProductId: "orvian_plus_lifetime",
    type: "lifetime",
    name: "Plus Lifetime",
    description: "Desbloquea funciones premium locales con un solo pago.",
    priceLabel: "$4.99",
    legacyPriceLabel: "$2.99",
    features: [
      "Cuentas ilimitadas",
      "Recordatorios ilimitados",
      "Diseños premium de tarjetas",
      "Categorías personalizadas",
      "Personalización avanzada",
      "Exportación local futura",
    ],
  },
  {
    id: "card_pack_dark",
    playStoreProductId: "orvian_card_pack_dark",
    type: "card_pack",
    name: "Pack Dark",
    description: "Diseños oscuros y elegantes para tus cuentas.",
    priceLabel: "$0.99",
    features: ["Cards oscuras", "Estilo premium", "Compra única"],
  },
  {
    id: "card_pack_luxury",
    playStoreProductId: "orvian_card_pack_luxury",
    type: "card_pack",
    name: "Pack Luxury",
    description: "Diseños más exclusivos para una app con más presencia.",
    priceLabel: "$0.99",
    features: ["Cards premium", "Estilo elegante", "Compra única"],
  },
  {
    id: "card_pack_crypto",
    playStoreProductId: "orvian_card_pack_crypto",
    type: "card_pack",
    name: "Pack Crypto",
    description: "Diseños inspirados en activos digitales y wallets.",
    priceLabel: "$0.99",
    features: ["Cards cripto", "Estilo tecnológico", "Compra única"],
  },
  {
    id: "card_pack_minimal",
    playStoreProductId: "orvian_card_pack_minimal",
    type: "card_pack",
    name: "Pack Minimal",
    description: "Diseños limpios y sobrios para cuentas personales.",
    priceLabel: "$0.99",
    features: ["Cards minimalistas", "Estilo limpio", "Compra única"],
  },
];

export function getStoreProductById(productId: ProductEntitlement) {
  return storeProducts.find((product) => product.id === productId);
}
