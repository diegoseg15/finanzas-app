import {
    BellRing,
    ChartNoAxesColumn,
    Coins,
    WalletCards,
} from "lucide-react-native";

export const onboardingSlides = [
  {
    id: "control",
    icon: WalletCards,
    titleI18nKey: "onboarding.v2.control.title",
    descriptionI18nKey: "onboarding.v2.control.description",
  },
  {
    id: "movements",
    icon: Coins,
    titleI18nKey: "onboarding.v2.movements.title",
    descriptionI18nKey: "onboarding.v2.movements.description",
  },
  {
    id: "reminders",
    icon: BellRing,
    titleI18nKey: "onboarding.v2.reminders.title",
    descriptionI18nKey: "onboarding.v2.reminders.description",
  },
  {
    id: "clarity",
    icon: ChartNoAxesColumn,
    titleI18nKey: "onboarding.v2.clarity.title",
    descriptionI18nKey: "onboarding.v2.clarity.description",
  },
] as const;
