import { Account, CurrencyCode } from "@/types/finance.types";

export type ValidationResult = {
  isValid: boolean;
  message?: string;
};

export function validateRequiredText(
  value: string,
  fieldName: string,
  minLength = 2,
): ValidationResult {
  if (!value.trim()) {
    return {
      isValid: false,
      message: `${fieldName} es obligatorio.`,
    };
  }

  if (value.trim().length < minLength) {
    return {
      isValid: false,
      message: `${fieldName} debe tener al menos ${minLength} caracteres.`,
    };
  }

  return {
    isValid: true,
  };
}

export function validatePositiveAmount(
  amount: number,
  fieldName = "El monto",
): ValidationResult {
  if (!Number.isFinite(amount)) {
    return {
      isValid: false,
      message: `${fieldName} no es válido.`,
    };
  }

  if (amount <= 0) {
    return {
      isValid: false,
      message: `${fieldName} debe ser mayor a 0.`,
    };
  }

  return {
    isValid: true,
  };
}

export function getAccountBalanceByCurrency(
  account: Account,
  currency: CurrencyCode,
) {
  return (
    account.balances.find((balance) => balance.currency === currency)?.amount ??
    0
  );
}

export function validateAccountHasEnoughBalance(params: {
  account: Account;
  currency: CurrencyCode;
  amount: number;
  allowNegativeBalance?: boolean;
}): ValidationResult {
  const { account, currency, amount, allowNegativeBalance = true } = params;

  if (allowNegativeBalance) {
    return {
      isValid: true,
    };
  }

  const currentBalance = getAccountBalanceByCurrency(account, currency);

  if (currentBalance < amount) {
    return {
      isValid: false,
      message: `Saldo insuficiente en ${account.name}.`,
    };
  }

  return {
    isValid: true,
  };
}

export function validateFutureDate(date: Date): ValidationResult {
  if (Number.isNaN(date.getTime())) {
    return {
      isValid: false,
      message: "La fecha ingresada no es válida.",
    };
  }

  if (date.getTime() <= Date.now()) {
    return {
      isValid: false,
      message: "La fecha debe ser futura.",
    };
  }

  return {
    isValid: true,
  };
}
