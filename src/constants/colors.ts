export const colors = {
  dark: {
    background: "#050505",
    surface: "#111111",
    card: "#1A1A1A",
    cardSoft: "#242424",
    border: "#2A2A2A",

    text: "#FFFFFF",
    textMuted: "#A1A1AA",
    textSoft: "#D4D4D8",

    primary: "#8B5CF6",
    primarySoft: "#A78BFA",
    secondary: "#3B82F6",
    accent: "#42A2ED",
    accentSoft: "rgba(66, 162, 237, 0.14)",

    income: "#22C55E",
    expense: "#EF4444",
    warning: "#F59E0B",
  },

  light: {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    card: "#FFFFFF",
    cardSoft: "#F1F5F9",
    border: "#E2E8F0",

    text: "#0F172A",
    textMuted: "#64748B",
    textSoft: "#334155",

    primary: "#7C3AED",
    primarySoft: "#8B5CF6",
    secondary: "#2563EB",
    accent: "#42A2ED",
    accentSoft: "rgba(66, 162, 237, 0.14)",

    income: "#16A34A",
    expense: "#DC2626",
    warning: "#D97706",
  },
} as const;

export type AppThemeName = keyof typeof colors;
export type AppThemeColors = (typeof colors)[AppThemeName];
