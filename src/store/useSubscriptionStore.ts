import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { appStorage } from "@/services/storage/app-storage.service";
import {
  createDefaultSubscription,
  markAsLegacyTester,
  upgradeToPlan,
} from "@/services/subscription.service";
import {
  ProductEntitlement,
  SubscriptionPlanId,
  UserPurchase,
  UserSubscription,
} from "@/types/subscription.types";

type SubscriptionState = {
  subscription: UserSubscription;

  setPlan: (planId: SubscriptionPlanId) => void;
  upgrade: (planId: SubscriptionPlanId) => void;
  setSubscription: (subscription: UserSubscription) => void;

  addPurchase: (purchase: UserPurchase) => void;
  hasPurchase: (productId: ProductEntitlement) => boolean;

  markLegacyTester: () => void;
};

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set, get) => ({
      subscription: createDefaultSubscription(),

      setPlan: (planId) => {
        set({
          subscription: upgradeToPlan(planId),
        });
      },

      upgrade: (planId) => {
        set({
          subscription: upgradeToPlan(planId),
        });
      },

      setSubscription: (subscription) => {
        set({
          subscription,
        });
      },

      addPurchase: (purchase) => {
        set((state) => {
          const currentPurchases = state.subscription.purchases ?? [];

          const nextPurchases = [
            purchase,
            ...currentPurchases.filter(
              (currentPurchase) =>
                currentPurchase.productId !== purchase.productId,
            ),
          ];

          return {
            subscription: {
              ...state.subscription,
              planId:
                purchase.productId === "plus_lifetime"
                  ? "plus"
                  : state.subscription.planId,
              status: "active",
              source:
                purchase.source === "google_play"
                  ? "google_play"
                  : state.subscription.source,
              purchases: nextPurchases,
            },
          };
        });
      },

      hasPurchase: (productId) => {
        const purchases = get().subscription.purchases ?? [];

        return purchases.some((purchase) => {
          if (purchase.productId !== productId) {
            return false;
          }

          if (!purchase.expiresAt) {
            return true;
          }

          return new Date(purchase.expiresAt).getTime() > Date.now();
        });
      },

      /**
       * Se conserva por compatibilidad con v1.9.1.
       * No llamar automáticamente en v2.0.
       */
      markLegacyTester: () => {
        const currentSubscription = get().subscription;

        set({
          subscription: markAsLegacyTester(currentSubscription),
        });
      },
    }),
    {
      name: "finance-app-subscription",
      storage: createJSONStorage(() => appStorage),
      partialize: (state) => ({
        subscription: state.subscription,
      }),
    },
  ),
);
