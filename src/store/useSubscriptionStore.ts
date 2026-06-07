import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { appStorage } from "@/services/storage/app-storage.service";
import {
  createDefaultSubscription,
  markAsLegacyTester,
  upgradeToPlan,
} from "@/services/subscription.service";
import {
  SubscriptionPlanId,
  UserSubscription,
} from "@/types/subscription.types";

type SubscriptionState = {
  subscription: UserSubscription;

  setPlan: (planId: SubscriptionPlanId) => void;
  upgrade: (planId: SubscriptionPlanId) => void;
  setSubscription: (subscription: UserSubscription) => void;
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
