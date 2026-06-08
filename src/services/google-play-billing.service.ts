import {
    endConnection,
    fetchProducts,
    finishTransaction,
    initConnection,
    purchaseErrorListener,
    purchaseUpdatedListener,
    requestPurchase,
} from "react-native-iap";

import {
    androidBillingProductIds,
    billingProductIds,
} from "@/constants/billingProducts";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";

type GooglePlayProducts = NonNullable<
  Awaited<ReturnType<typeof fetchProducts>>
>;

let purchaseUpdateSubscription: { remove: () => void } | null = null;
let purchaseErrorSubscription: { remove: () => void } | null = null;
let isBillingInitialized = false;

export async function initializeGooglePlayBilling() {
  if (isBillingInitialized) {
    return true;
  }

  const connected = await initConnection();

  if (!connected) {
    return false;
  }

  isBillingInitialized = true;

  purchaseUpdateSubscription?.remove();
  purchaseErrorSubscription?.remove();

  purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
    const productId = purchase.productId;

    if (productId !== billingProductIds.plusLifetime) {
      return;
    }

    useSubscriptionStore.getState().setSubscription({
      planId: "plus",
      status: "active",
      source: "google_play",
      startedAt: new Date().toISOString(),
    });

    await finishTransaction({
      purchase,
      isConsumable: false,
    });
  });

  purchaseErrorSubscription = purchaseErrorListener((error) => {
    console.warn("Google Play Billing purchase error", error);
  });

  return true;
}

export async function getGooglePlayProducts(): Promise<GooglePlayProducts> {
  await initializeGooglePlayBilling();

  const products = await fetchProducts({
    skus: [...androidBillingProductIds],
    type: "in-app",
  });

  return products ?? [];
}

export async function buyPlusLifetime() {
  await initializeGooglePlayBilling();

  return requestPurchase({
    request: {
      google: {
        skus: [billingProductIds.plusLifetime],
      },
    },
    type: "in-app",
  });
}

export async function closeGooglePlayBillingConnection() {
  purchaseUpdateSubscription?.remove();
  purchaseErrorSubscription?.remove();

  purchaseUpdateSubscription = null;
  purchaseErrorSubscription = null;
  isBillingInitialized = false;

  await endConnection();
}
