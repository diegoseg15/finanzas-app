import { router } from "expo-router";
import { TFunction } from "i18next";
import {
    BarChart3,
    Bell,
    CloudDownload,
    Coins,
    Info,
    Moon,
    Palette,
    RefreshCcw,
    ShieldCheck,
    Upload,
    WalletCards,
} from "lucide-react-native";

import { routes } from "@/constants/routes";
import {
    SettingsActionSection,
    SettingsModalType,
} from "@/features/settings/types/settings.types";
import { getAppVersion } from "@/features/settings/utils/app-version";
import { CurrencyCode } from "@/types/finance.types";

type ThemeColors = {
  primary: string;
};

type BuildSettingsSectionsParams = {
  t: TFunction;
  themeColors: ThemeColors;
  themeMode: string;
  mainCurrency: CurrencyCode;
  currentMainCurrency: string;
  currentPlanLabel: string;
  setActiveModal: (modal: SettingsModalType) => void;
};

export function buildSettingsSections({
  t,
  themeColors,
  themeMode,
  mainCurrency,
  currentMainCurrency,
  currentPlanLabel,
  setActiveModal,
}: BuildSettingsSectionsParams): SettingsActionSection[] {
  return [
    {
      id: "preferences",
      title: t("settings.sections.preferences", {
        defaultValue: "Preferencias",
      }),
      rows: [
        {
          id: "appearance",
          icon: <Palette size={20} color={themeColors.primary} />,
          title: t("settings.appearance"),
          description: t(`settings.themeModes.${themeMode}`),
          onPress: () => setActiveModal("appearance"),
        },
        {
          id: "currency",
          icon: <Coins size={20} color={themeColors.primary} />,
          title: t("settings.mainCurrency.title", {
            defaultValue: "Moneda principal",
          }),
          description: `${mainCurrency} · ${currentMainCurrency}`,
          onPress: () => setActiveModal("currency"),
        },
      ],
    },
    {
      id: "finance",
      title: t("settings.sections.finance", {
        defaultValue: "Finanzas",
      }),
      rows: [
        {
          id: "plan",
          icon: <Moon size={20} color={themeColors.primary} />,
          title: t("settings.currentPlan"),
          description: currentPlanLabel,
          onPress: () => router.push(routes.tabs.plans as never),
        },
        {
          id: "budgets",
          icon: <BarChart3 size={20} color={themeColors.primary} />,
          title: t("settings.shortcuts.budgets", {
            defaultValue: "Presupuestos",
          }),
          description: t("settings.shortcuts.budgetsDescription", {
            defaultValue: "Gestionar límites mensuales",
          }),
          onPress: () => router.push(routes.tabs.budgets as never),
        },
        {
          id: "reminders",
          icon: <Bell size={20} color={themeColors.primary} />,
          title: t("settings.shortcuts.reminders", {
            defaultValue: "Recordatorios",
          }),
          description: t("settings.shortcuts.remindersDescription", {
            defaultValue: "Pagos, cobros y suscripciones",
          }),
          onPress: () => router.push(routes.tabs.reminders as never),
        },
      ],
    },
    {
      id: "data",
      title: t("settings.sections.data", {
        defaultValue: "Datos",
      }),
      rows: [
        {
          id: "import",
          icon: <Upload size={20} color={themeColors.primary} />,
          title: t("settings.importData.title", {
            defaultValue: "Importar movimientos",
          }),
          description: t("settings.importData.description", {
            defaultValue: "Cargar movimientos desde CSV",
          }),
          onPress: () => setActiveModal("import"),
        },
        {
          id: "export",
          icon: <CloudDownload size={20} color={themeColors.primary} />,
          title: t("settings.exportData"),
          description: t("settings.exportDescription"),
          onPress: () => setActiveModal("export"),
        },
        {
          id: "localData",
          icon: <RefreshCcw size={20} color={themeColors.primary} />,
          title: t("settings.localData"),
          description: t("settings.localDataDescription"),
          onPress: () => setActiveModal("localData"),
        },
      ],
    },
    {
      id: "security",
      title: t("settings.sections.security", {
        defaultValue: "Seguridad",
      }),
      rows: [
        {
          id: "privacy",
          icon: <ShieldCheck size={20} color={themeColors.primary} />,
          title: t("settings.privacy"),
          description: t("settings.privacyDescription"),
          onPress: () => setActiveModal("privacy"),
        },
        {
          id: "secureStorage",
          icon: <WalletCards size={20} color={themeColors.primary} />,
          title: t("settings.secureStorage.title"),
          description: t("settings.secureStorage.description"),
          onPress: () => setActiveModal("security"),
        },
      ],
    },
    {
      id: "app",
      title: t("settings.sections.app", {
        defaultValue: "App",
      }),
      rows: [
        {
          id: "about",
          icon: <Info size={20} color={themeColors.primary} />,
          title: t("settings.about"),
          description: `Orvian · v${getAppVersion()}`,
          onPress: () => setActiveModal("about"),
        },
      ],
    },
  ];
}
