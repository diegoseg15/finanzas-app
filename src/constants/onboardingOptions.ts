import {
    CryptoUsage,
    FinancialGoal,
    MultiCurrencyUsage,
    UserProfileType,
} from "@/types/onboarding.types";

export const userProfileOptions: {
  value: UserProfileType;
  label: string;
  description: string;
}[] = [
  {
    value: "personal",
    label: "Personal",
    description: "Quiero manejar mis finanzas personales.",
  },
  {
    value: "freelancer",
    label: "Freelancer",
    description: "Tengo ingresos por proyectos o clientes.",
  },
  {
    value: "entrepreneur",
    label: "Emprendedor",
    description: "Manejo dinero de negocio o emprendimiento.",
  },
  {
    value: "investor",
    label: "Inversionista",
    description: "Quiero controlar activos, cripto o inversiones.",
  },
  {
    value: "student",
    label: "Estudiante",
    description: "Quiero organizar gastos y ahorros.",
  },
];

export const cryptoUsageOptions: {
  value: CryptoUsage;
  label: string;
  description: string;
}[] = [
  {
    value: "none",
    label: "No uso cripto",
    description: "No necesito cuentas como Binance o Metamask.",
  },
  {
    value: "basic",
    label: "Uso pocas criptomonedas",
    description: "Tengo una o pocas monedas digitales.",
  },
  {
    value: "advanced",
    label: "Uso varias criptomonedas",
    description: "Manejo varias monedas o wallets.",
  },
];

export const multiCurrencyOptions: {
  value: MultiCurrencyUsage;
  label: string;
  description: string;
}[] = [
  {
    value: "none",
    label: "Solo una moneda",
    description: "Manejo principalmente una moneda.",
  },
  {
    value: "occasional",
    label: "Ocasionalmente",
    description: "A veces uso otras monedas.",
  },
  {
    value: "frequent",
    label: "Frecuentemente",
    description: "Manejo varias monedas con frecuencia.",
  },
];

export const financialGoalOptions: {
  value: FinancialGoal;
  label: string;
  description: string;
}[] = [
  {
    value: "control_expenses",
    label: "Controlar gastos",
    description: "Quiero saber en qué se va mi dinero.",
  },
  {
    value: "save_more",
    label: "Ahorrar más",
    description: "Quiero separar mejor mi dinero.",
  },
  {
    value: "pay_debts",
    label: "Pagar deudas",
    description: "Quiero organizar deudas o créditos.",
  },
  {
    value: "track_income",
    label: "Controlar ingresos",
    description: "Quiero seguir ingresos de trabajo o proyectos.",
  },
  {
    value: "understand_investments",
    label: "Entender inversiones",
    description: "Quiero ver mejor activos, cripto o patrimonio.",
  },
  {
    value: "avoid_small_expenses",
    label: "Evitar gastos hormiga",
    description: "Quiero detectar gastos pequeños repetidos.",
  },
];
