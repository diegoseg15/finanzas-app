import { ReactNode } from "react";

export type SettingsModalType =
  | "appearance"
  | "currency"
  | "privacy"
  | "security"
  | "import"
  | "export"
  | "localData"
  | "about"
  | null;

export type SettingsAction = {
  id: string;
  icon: ReactNode;
  title: string;
  description?: string;
  onPress: () => void;
};

export type SettingsActionSection = {
  id: string;
  title: string;
  rows: SettingsAction[];
};
