import { getCurrencyByCode } from "@/constants/currencies";
import { CurrencyCode } from "@/types/finance.types";

type FormatMoneyInput = {
  amount: number;
  currencyCode: CurrencyCode;
  hideAmount?: boolean;
};

export function formatMoney({
  amount,
  currencyCode,
  hideAmount = false,
}: FormatMoneyInput) {
  const currency = getCurrencyByCode(currencyCode);
  const symbol = currency?.symbol ?? currencyCode;
  const symbolPosition = currency?.symbolPosition ?? "prefix";

  if (hideAmount) {
    return symbolPosition === "suffix" ? "••.•• €" : `${symbol}••.••`;
  }

  const formattedAmount = new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return symbolPosition === "suffix"
    ? `${formattedAmount} ${symbol}`
    : `${symbol}${formattedAmount}`;
}

export function sanitizeMoneyValue(value: string) {
  const normalizedValue = value.replace(",", ".");
  const parsedValue = Number(normalizedValue);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
}
