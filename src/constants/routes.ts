export const routes = {
  onboarding: {
    welcome: "/onboarding/welcome",
    setup: "/onboarding/setup",
    plans: "/onboarding/plans",
  },

  auth: {
    login: "/auth/login",
    register: "/auth/register",
  },

  tabs: {
    home: "/tabs/home",
    accounts: "/tabs/accounts",
    movements: "/tabs/movements",
    statistics: "/tabs/statistics",
    settings: "/tabs/settings",
  },
} as const;
