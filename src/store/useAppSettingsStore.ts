import { Appearance } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { AppThemeName } from "@/constants/colors";
import { appStorage } from "@/services/storage/app-storage.service";
import { CurrencyCode } from "@/types/finance.types";
import { AppGuideKey } from "@/types/guide.types";
import {
  CryptoUsage,
  FinancialGoal,
  MultiCurrencyUsage,
  OnboardingSettings,
  UserProfileType,
} from "@/types/onboarding.types";

type ThemeMode = "system" | "dark" | "light";

type AppSettingsState = OnboardingSettings & {
  themeMode: ThemeMode;
  resolvedTheme: AppThemeName;
  hasHydrated: boolean;

  setThemeMode: (themeMode: ThemeMode) => void;
  syncThemeWithSystem: () => void;

  setMainCurrency: (mainCurrency: CurrencyCode) => void;
  setShouldCalculateTotalNetWorth: (value: boolean) => void;
  setUserProfileType: (userProfileType: UserProfileType) => void;
  setCryptoUsage: (cryptoUsage: CryptoUsage) => void;
  setMultiCurrencyUsage: (multiCurrencyUsage: MultiCurrencyUsage) => void;
  setFinancialGoal: (financialGoal: FinancialGoal) => void;
  setWantsReminders: (wantsReminders: boolean) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;

  hiddenAccountBalanceIds: Record<string, boolean>;
  toggleAccountBalanceVisibility: (accountId: string) => void;
  isAccountBalanceHidden: (accountId: string) => boolean;

  seenGuides: AppGuideKey[];
  markGuideAsSeen: (guideKey: AppGuideKey) => void;
  hasSeenGuide: (guideKey: AppGuideKey) => boolean;
};

const getSystemTheme = (): AppThemeName => {
  const colorScheme = Appearance.getColorScheme();

  return colorScheme === "dark" ? "dark" : "light";
};

const resolveTheme = (themeMode: ThemeMode): AppThemeName => {
  return themeMode === "system" ? getSystemTheme() : themeMode;
};

export const defaultOnboardingSettings: OnboardingSettings = {
  hasCompletedOnboarding: false,
  mainCurrency: "USD",
  shouldCalculateTotalNetWorth: true,
  userProfileType: "personal",
  cryptoUsage: "none",
  multiCurrencyUsage: "none",
  financialGoal: "control_expenses",
  wantsReminders: true,
};

export const useAppSettingsStore = create<AppSettingsState>()(
  persist(
    (set, get) => ({
      themeMode: "system",
      resolvedTheme: getSystemTheme(),
      hasHydrated: false,

      ...defaultOnboardingSettings,

      hiddenAccountBalanceIds: {},
      seenGuides: [],

      setThemeMode: (themeMode) => {
        set({
          themeMode,
          resolvedTheme: resolveTheme(themeMode),
        });
      },

      syncThemeWithSystem: () => {
        const { themeMode } = get();

        if (themeMode !== "system") {
          return;
        }

        set({
          resolvedTheme: getSystemTheme(),
        });
      },

      setMainCurrency: (mainCurrency) => {
        set({ mainCurrency });
      },

      setShouldCalculateTotalNetWorth: (value) => {
        set({ shouldCalculateTotalNetWorth: value });
      },

      setUserProfileType: (userProfileType) => {
        set({ userProfileType });
      },

      setCryptoUsage: (cryptoUsage) => {
        set({ cryptoUsage });
      },

      setMultiCurrencyUsage: (multiCurrencyUsage) => {
        set({ multiCurrencyUsage });
      },

      setFinancialGoal: (financialGoal) => {
        set({ financialGoal });
      },

      setWantsReminders: (wantsReminders) => {
        set({ wantsReminders });
      },

      completeOnboarding: () => {
        set({ hasCompletedOnboarding: true });
      },

      resetOnboarding: () => {
        set({
          ...defaultOnboardingSettings,
        });
      },

      toggleAccountBalanceVisibility: (accountId) => {
        set((state) => ({
          hiddenAccountBalanceIds: {
            ...state.hiddenAccountBalanceIds,
            [accountId]: !state.hiddenAccountBalanceIds[accountId],
          },
        }));
      },

      isAccountBalanceHidden: (accountId) => {
        return Boolean(get().hiddenAccountBalanceIds[accountId]);
      },

      markGuideAsSeen: (guideKey) => {
        set((state) => {
          if (state.seenGuides.includes(guideKey)) {
            return state;
          }

          return {
            seenGuides: [...state.seenGuides, guideKey],
          };
        });
      },

      hasSeenGuide: (guideKey) => {
        return get().seenGuides.includes(guideKey);
      },
    }),
    {
      name: "finance-app-settings",
      storage: createJSONStorage(() => appStorage),
      partialize: (state) => ({
        themeMode: state.themeMode,
        resolvedTheme: state.resolvedTheme,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        mainCurrency: state.mainCurrency,
        shouldCalculateTotalNetWorth: state.shouldCalculateTotalNetWorth,
        userProfileType: state.userProfileType,
        cryptoUsage: state.cryptoUsage,
        multiCurrencyUsage: state.multiCurrencyUsage,
        financialGoal: state.financialGoal,
        wantsReminders: state.wantsReminders,
        hiddenAccountBalanceIds: state.hiddenAccountBalanceIds,
        seenGuides: state.seenGuides,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setThemeMode(state.themeMode);

        useAppSettingsStore.setState({
          hasHydrated: true,
        });
      },
    },
  ),
);
