import { AccountTypeOption } from "@/types/finance.types";

export const accountTypes: AccountTypeOption[] = [
  {
    value: "bank",
    label: "Banco",
    description: "Cuenta bancaria tradicional.",
    icon: "building-bank",
    supportsMultipleCurrencies: false,
  },
  {
    value: "cash",
    label: "Efectivo",
    description: "Dinero físico disponible.",
    icon: "wallet",
    supportsMultipleCurrencies: false,
  },
  {
    value: "piggy_bank",
    label: "Alcancía",
    description: "Dinero guardado para ahorro específico.",
    icon: "piggy-bank",
    supportsMultipleCurrencies: false,
  },
  {
    value: "crypto_exchange",
    label: "Exchange cripto",
    description: "Binance u otro exchange con múltiples monedas.",
    icon: "bitcoin",
    supportsMultipleCurrencies: true,
  },
  {
    value: "crypto_wallet",
    label: "Wallet cripto",
    description: "Metamask u otra wallet descentralizada.",
    icon: "shield",
    supportsMultipleCurrencies: true,
  },
  {
    value: "credit_card",
    label: "Tarjeta de crédito",
    description: "Crédito disponible o deuda asociada.",
    icon: "credit-card",
    supportsMultipleCurrencies: false,
  },
  {
    value: "loan_receivable",
    label: "Me deben",
    description: "Dinero que otras personas deben pagarte.",
    icon: "arrow-down-left",
    supportsMultipleCurrencies: false,
  },
  {
    value: "loan_payable",
    label: "Debo pagar",
    description: "Dinero que debes a otra persona o institución.",
    icon: "arrow-up-right",
    supportsMultipleCurrencies: false,
  },
  {
    value: "custom",
    label: "Personalizada",
    description: "Cuenta creada según tu necesidad.",
    icon: "circle-dollar-sign",
    supportsMultipleCurrencies: false,
  },
];

export function getAccountTypeOption(type: string) {
  return accountTypes.find((accountType) => accountType.value === type);
}

export function accountTypeSupportsMultipleCurrencies(type: string) {
  return Boolean(getAccountTypeOption(type)?.supportsMultipleCurrencies);
}

export function getSelectableAccountTypes() {
  return accountTypes.filter(
    (accountType) =>
      accountType.value !== "loan_receivable" &&
      accountType.value !== "loan_payable",
  );
}
