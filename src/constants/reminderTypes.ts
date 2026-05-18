import { ReminderFrequency, ReminderType } from "@/types/finance.types";

export type ReminderTypeOption = {
  value: ReminderType;
  label: string;
  description: string;
};

export type ReminderFrequencyOption = {
  value: ReminderFrequency;
  label: string;
  description: string;
};

export const reminderTypes: ReminderTypeOption[] = [
  {
    value: "payment",
    label: "Pago",
    description: "Servicios, deudas, tarjeta o compromisos por pagar.",
  },
  {
    value: "collection",
    label: "Cobro",
    description: "Dinero que deben pagarte.",
  },
  {
    value: "subscription",
    label: "Suscripción",
    description: "Netflix, Spotify, software u otros pagos recurrentes.",
  },
  {
    value: "saving",
    label: "Ahorro",
    description: "Recordatorio para separar dinero.",
  },
  {
    value: "investment",
    label: "Inversión",
    description: "Compra recurrente de activos o cripto.",
  },
  {
    value: "purchase",
    label: "Compra",
    description: "Compra importante planificada.",
  },
  {
    value: "custom",
    label: "Personalizado",
    description: "Recordatorio financiero libre.",
  },
];

export const reminderFrequencies: ReminderFrequencyOption[] = [
  {
    value: "once",
    label: "Una vez",
    description: "Se notificará solo en la fecha elegida.",
  },
  {
    value: "daily",
    label: "Diario",
    description: "Se repetirá todos los días.",
  },
  {
    value: "weekly",
    label: "Semanal",
    description: "Se repetirá cada semana.",
  },
  {
    value: "monthly",
    label: "Mensual",
    description: "Se repetirá cada mes.",
  },
];

export function getReminderTypeOption(type: ReminderType) {
  return reminderTypes.find((reminderType) => reminderType.value === type);
}

export function getReminderFrequencyOption(frequency: ReminderFrequency) {
  return reminderFrequencies.find((item) => item.value === frequency);
}
