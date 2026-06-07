import { SubscriptionPlan } from "@/types/subscription.types";

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Gratis",
    description: "Para empezar a controlar tus finanzas personales.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Hasta 3 cuentas",
      "Movimientos ilimitados",
      "Recordatorios básicos",
      "Categorías base",
      "Modo oscuro y claro",
    ],
    limits: {
      maxAccounts: 3,
      maxMovementsPerMonth: null,
      multiCurrencyTransfers: false,
      advancedStatistics: false,
      exportData: false,
      customCategories: false,
      unlimitedReminders: false,
    },
  },
  {
    id: "plus",
    name: "Plus Lifetime",
    description: "Desbloquea funciones premium locales con un solo pago.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Cuentas ilimitadas",
      "Movimientos ilimitados",
      "Recordatorios ilimitados",
      "Diseños premium de tarjetas",
      "Categorías personalizadas",
      "Personalización avanzada",
      "Exportación local futura",
    ],
    limits: {
      maxAccounts: null,
      maxMovementsPerMonth: null,
      multiCurrencyTransfers: true,
      advancedStatistics: true,
      exportData: true,
      customCategories: true,
      unlimitedReminders: true,
    },
  },
];

export function getSubscriptionPlanById(planId: string) {
  return subscriptionPlans.find((plan) => plan.id === planId);
}

export const defaultSubscriptionPlanId = "free";
