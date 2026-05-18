import { Currency } from "@/types/finance.types";

export const currencies: Currency[] = [
  {
    code: "USD",
    name: "Dólar estadounidense",
    symbol: "$",
    type: "fiat",
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    type: "fiat",
  },
  {
    code: "USDT",
    name: "Tether",
    symbol: "USDT",
    type: "crypto",
  },
  {
    code: "BTC",
    name: "Bitcoin",
    symbol: "BTC",
    type: "crypto",
  },
  {
    code: "ETH",
    name: "Ethereum",
    symbol: "ETH",
    type: "crypto",
  },
  {
    code: "SOL",
    name: "Solana",
    symbol: "SOL",
    type: "crypto",
  },
  {
    code: "BNB",
    name: "BNB",
    symbol: "BNB",
    type: "crypto",
  },
];

export const defaultCurrencyCode = "USD";

export function getCurrencyByCode(code: string) {
  return currencies.find((currency) => currency.code === code);
}
