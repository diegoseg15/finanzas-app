import * as Localization from "expo-localization";
import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from "@/i18n/languages/en";
import { es } from "@/i18n/languages/es";

export const defaultLanguage = "es";

export const supportedLanguages = ["es", "en"] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

export const languageLabels: Record<SupportedLanguage, string> = {
  es: "Español",
  en: "English",
};

const resources: Resource = {
  es: {
    translation: es,
  },
  en: {
    translation: en,
  },
};

function isSupportedLanguage(
  language?: string | null,
): language is SupportedLanguage {
  return supportedLanguages.includes(language as SupportedLanguage);
}

export function getDeviceLanguage(): SupportedLanguage {
  const locale = Localization.getLocales()[0];
  const languageCode = locale?.languageCode?.toLowerCase();

  if (isSupportedLanguage(languageCode)) {
    return languageCode;
  }

  return defaultLanguage;
}

export function normalizeLanguage(language?: string | null): SupportedLanguage {
  if (isSupportedLanguage(language)) {
    return language;
  }

  return defaultLanguage;
}

export async function changeAppLanguage(language: SupportedLanguage) {
  await i18n.changeLanguage(language);
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: defaultLanguage,
    supportedLngs: [...supportedLanguages],

    compatibilityJSON: "v4",

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },

    returnNull: false,
  });
}

export { i18n };
export default i18n;
