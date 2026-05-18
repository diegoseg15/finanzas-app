import { getCurrencyByCode } from "@/constants/currencies";
import { CurrencyCode } from "@/types/finance.types";

type FormatMoneyParams = {
  amount: number;
  currencyCode: CurrencyCode;
  maximumFractionDigits?: number;
};

export function formatMoney({
  amount,
  currencyCode,
  maximumFractionDigits = 2,
}: FormatMoneyParams) {
  const currency = getCurrencyByCode(currencyCode);

  if (!currency) {
    return `${amount.toFixed(maximumFractionDigits)} ${currencyCode}`;
  }

  if (currency.type === "crypto") {
    return `${amount.toLocaleString("en-US", {
      maximumFractionDigits: 8,
    })} ${currency.symbol}`;
  }

  return `${currency.symbol} ${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits,
  })}`;
}

export function sanitizeMoneyValue(value: string) {
  const normalizedValue = value.replace(",", ".").replace(/[^0-9.]/g, "");
  const parsedValue = Number(normalizedValue);

  if (Number.isNaN(parsedValue)) {
    return 0;
  }

  return parsedValue;
}

export function isValidMoneyAmount(amount: number) {
  return Number.isFinite(amount) && amount >= 0;
}
