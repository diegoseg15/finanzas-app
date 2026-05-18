import { SubscriptionPlan } from "@/types/subscription.types";

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Gratis",
    description: "Para empezar a registrar tus finanzas personales.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Hasta 3 cuentas",
      "Hasta 30 movimientos por mes",
      "Ingresos y egresos",
      "Transferencias básicas",
      "Categorías base",
      "Recordatorios básicos",
      "Modo oscuro y claro",
    ],
    limits: {
      maxAccounts: 3,
      maxMovementsPerMonth: 30,
      multiCurrencyTransfers: false,
      advancedStatistics: false,
      exportData: false,
      customCategories: false,
      unlimitedReminders: false,
    },
  },
  {
    id: "plus",
    name: "Plus",
    description:
      "Para controlar cuentas, monedas, transferencias y reportes avanzados.",
    monthlyPrice: 2.99,
    yearlyPrice: 24.99,
    features: [
      "Cuentas ilimitadas",
      "Movimientos ilimitados",
      "Transferencias con múltiples monedas",
      "Comisiones y tipo de cambio",
      "Estadísticas avanzadas",
      "Recordatorios ilimitados",
      "Exportación futura CSV / Excel / PDF",
      "Preparado para asistente IA financiero",
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
