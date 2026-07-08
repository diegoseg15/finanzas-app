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
    symbolPosition: "suffix",
  },
  {
    code: "CRC",
    name: "Colón costarricense",
    symbol: "₡",
    type: "fiat",
  },
  {
    code: "SVC",
    name: "Colón salvadoreño",
    symbol: "₡",
    type: "fiat",
  },
  {
    code: "MXN",
    name: "Peso mexicano",
    symbol: "$",
    type: "fiat",
  },
  {
    code: "COP",
    name: "Peso colombiano",
    symbol: "$",
    type: "fiat",
  },
  {
    code: "ARS",
    name: "Peso argentino",
    symbol: "$",
    type: "fiat",
  },
  {
    code: "CLP",
    name: "Peso chileno",
    symbol: "$",
    type: "fiat",
  },
  {
    code: "PEN",
    name: "Sol peruano",
    symbol: "S/",
    type: "fiat",
  },
  {
    code: "BRL",
    name: "Real brasileño",
    symbol: "R$",
    type: "fiat",
  },
  {
    code: "GBP",
    name: "Libra esterlina",
    symbol: "£",
    type: "fiat",
  },
  {
    code: "CAD",
    name: "Dólar canadiense",
    symbol: "$",
    type: "fiat",
  },
  {
    code: "AUD",
    name: "Dólar australiano",
    symbol: "$",
    type: "fiat",
  },
  {
    code: "JPY",
    name: "Yen japonés",
    symbol: "¥",
    type: "fiat",
  },
  {
    code: "CNY",
    name: "Yuan chino",
    symbol: "¥",
    type: "fiat",
  },
  {
    code: "CHF",
    name: "Franco suizo",
    symbol: "CHF",
    type: "fiat",
  },

  // Monedas agregadas para nuevos idiomas / mercados
  {
    code: "VND",
    name: "Dong vietnamita",
    symbol: "₫",
    type: "fiat",
    symbolPosition: "suffix",
  },
  {
    code: "RUB",
    name: "Rublo ruso",
    symbol: "₽",
    type: "fiat",
    symbolPosition: "suffix",
  },
  {
    code: "TRY",
    name: "Lira turca",
    symbol: "₺",
    type: "fiat",
  },
  {
    code: "INR",
    name: "Rupia india",
    symbol: "₹",
    type: "fiat",
  },
  {
    code: "UAH",
    name: "Grivna ucraniana",
    symbol: "₴",
    type: "fiat",
    symbolPosition: "suffix",
  },
  {
    code: "SAR",
    name: "Riyal saudí",
    symbol: "ر.س",
    type: "fiat",
    symbolPosition: "suffix",
  },
  {
    code: "AED",
    name: "Dírham de Emiratos Árabes Unidos",
    symbol: "د.إ",
    type: "fiat",
    symbolPosition: "suffix",
  },

  {
    code: "USDT",
    name: "Tether",
    symbol: "USDT",
    type: "crypto",
  },
  {
    code: "USDC",
    name: "USD Coin",
    symbol: "USDC",
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

export function getCurrencyNameI18nKey(code: string) {
  return `currencies.${code}.name`;
}
