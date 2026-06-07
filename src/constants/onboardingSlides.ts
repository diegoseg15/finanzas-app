import {
  BellRing,
  Calculator,
  ChartNoAxesColumn,
  CreditCard,
  Sparkles,
} from "lucide-react-native";

export type OnboardingSlideKind =
  | "welcome"
  | "accounts"
  | "movements"
  | "analytics"
  | "reminders";

export const onboardingSlides = [
  {
    id: "welcome",
    kind: "welcome",
    icon: Sparkles,
    titleI18nKey: "onboarding.v2.welcome.title",
    descriptionI18nKey: "onboarding.v2.welcome.description",
  },
  {
    id: "accounts",
    kind: "accounts",
    icon: CreditCard,
    titleI18nKey: "onboarding.v2.accounts.title",
    descriptionI18nKey: "onboarding.v2.accounts.description",
  },
  {
    id: "movements",
    kind: "movements",
    icon: Calculator,
    titleI18nKey: "onboarding.v2.movements.title",
    descriptionI18nKey: "onboarding.v2.movements.description",
  },
  {
    id: "analytics",
    kind: "analytics",
    icon: ChartNoAxesColumn,
    titleI18nKey: "onboarding.v2.analytics.title",
    descriptionI18nKey: "onboarding.v2.analytics.description",
  },
  {
    id: "reminders",
    kind: "reminders",
    icon: BellRing,
    titleI18nKey: "onboarding.v2.reminders.title",
    descriptionI18nKey: "onboarding.v2.reminders.description",
  },
] as const;
