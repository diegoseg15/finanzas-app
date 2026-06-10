import {
  androidBillingProductIds,
  billingProductIds,
} from "@/constants/billingProducts";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";

type ReactNativeIapModule = typeof import("react-native-iap");

type GooglePlayProducts = NonNullable<
  Awaited<ReturnType<ReactNativeIapModule["fetchProducts"]>>
>;

let iapModulePromise: Promise<ReactNativeIapModule> | null = null;
let purchaseUpdateSubscription: { remove: () => void } | null = null;
let purchaseErrorSubscription: { remove: () => void } | null = null;
let isBillingInitialized = false;

async function loadIapModule() {
  if (!iapModulePromise) {
    iapModulePromise = import("react-native-iap");
  }

  return iapModulePromise;
}

export async function initializeGooglePlayBilling() {
  if (isBillingInitialized) {
    return true;
  }

  const {
    finishTransaction,
    initConnection,
    purchaseErrorListener,
    purchaseUpdatedListener,
  } = await loadIapModule();

  const connected = await initConnection();

  if (!connected) {
    throw new Error("Google Play Billing no pudo iniciar conexión.");
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
  const { fetchProducts } = await loadIapModule();

  await initializeGooglePlayBilling();

  const products = await fetchProducts({
    skus: [...androidBillingProductIds],
    type: "in-app",
  });

  return products ?? [];
}

export async function buyPlusLifetime() {
  const { requestPurchase } = await loadIapModule();

  await initializeGooglePlayBilling();

  const products = await getGooglePlayProducts();

  const plusProduct = products.find(
    (product) => product.id === billingProductIds.plusLifetime,
  );

  if (!plusProduct) {
    throw new Error(
      "Google Play no devolvió el producto orvian_plus_lifetime.",
    );
  }

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
  const { endConnection } = await loadIapModule();

  purchaseUpdateSubscription?.remove();
  purchaseErrorSubscription?.remove();

  purchaseUpdateSubscription = null;
  purchaseErrorSubscription = null;
  isBillingInitialized = false;

  await endConnection();
}

function persistPlusLifetimePurchase(purchase: {
  productId?: string;
  transactionDate?: number | string;
  purchaseToken?: string;
  token?: string;
  transactionReceipt?: string;
}) {
  const purchasedAt =
    typeof purchase.transactionDate === "number"
      ? new Date(purchase.transactionDate).toISOString()
      : typeof purchase.transactionDate === "string"
        ? new Date(Number(purchase.transactionDate)).toISOString()
        : new Date().toISOString();

  useSubscriptionStore.getState().addPurchase({
    productId: "plus_lifetime",
    source: "google_play",
    purchasedAt,
    purchaseToken:
      purchase.purchaseToken ?? purchase.token ?? purchase.transactionReceipt,
  });
}
