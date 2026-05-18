import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { appStorage } from "@/services/storage/app-storage.service";
import {
    createDefaultSubscription,
    upgradeToPlan,
} from "@/services/subscription.service";
import {
    SubscriptionPlanId,
    UserSubscription,
} from "@/types/subscription.types";

type SubscriptionState = {
  subscription: UserSubscription;

  setPlan: (planId: SubscriptionPlanId) => void;
  resetSubscription: () => void;
};

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      subscription: createDefaultSubscription(),

      setPlan: (planId) => {
        set({
          subscription: upgradeToPlan(planId),
        });
      },

      resetSubscription: () => {
        set({
          subscription: createDefaultSubscription(),
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
