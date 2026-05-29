import * as Localization from "expo-localization";
import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";

import { ar } from "@/i18n/languages/ar";
import { de } from "@/i18n/languages/de";
import { en } from "@/i18n/languages/en";
import { es } from "@/i18n/languages/es";
import { fr } from "@/i18n/languages/fr";
import { hi } from "@/i18n/languages/hi";
import { it } from "@/i18n/languages/it";
import { ja } from "@/i18n/languages/ja";
import { pt } from "@/i18n/languages/pt";
import { ru } from "@/i18n/languages/ru";
import { tr } from "@/i18n/languages/tr";
import { uk } from "@/i18n/languages/uk";
import { vi } from "@/i18n/languages/vi";
import { zh } from "@/i18n/languages/zh";

export const defaultLanguage = "en";

export const supportedLanguages = [
  "es",
  "en",
  "pt",
  "it",
  "ja",
  "vi",
  "ru",
  "tr",
  "de",
  "ar",
  "fr",
  "hi",
  "zh",
  "uk",
] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

export const languageLabels: Record<SupportedLanguage, string> = {
  es: "Español",
  en: "English",
  pt: "Português",
  it: "Italiano",
  ja: "日本語",
  vi: "Tiếng Việt",
  ru: "Русский",
  tr: "Türkçe",
  de: "Deutsch",
  ar: "العربية",
  fr: "Français",
  hi: "हिन्दी",
  zh: "中文",
  uk: "Українська",
};

const resources: Resource = {
  es: {
    translation: es,
  },
  en: {
    translation: en,
  },
  pt: {
    translation: pt,
  },
  it: {
    translation: it,
  },
  ja: {
    translation: ja,
  },
  vi: {
    translation: vi,
  },
  ru: {
    translation: ru,
  },
  tr: {
    translation: tr,
  },
  de: {
    translation: de,
  },
  ar: {
    translation: ar,
  },
  fr: {
    translation: fr,
  },
  hi: {
    translation: hi,
  },
  zh: {
    translation: zh,
  },
  uk: {
    translation: uk,
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
