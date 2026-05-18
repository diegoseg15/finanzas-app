import {
  CreateTransferInput,
  Transfer,
  UpdateTransferInput,
} from "@/types/finance.types";

function createId() {
  return `transfer_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function createTransfer(input: CreateTransferInput): Transfer {
  const now = new Date().toISOString();

  return {
    id: createId(),
    fromAccountId: input.fromAccountId,
    toAccountId: input.toAccountId,

    fromAmount: input.fromAmount,
    fromCurrency: input.fromCurrency,

    toAmount: input.toAmount,
    toCurrency: input.toCurrency,

    feeAmount: input.feeAmount,
    feeCurrency: input.feeCurrency,

    exchangeRate: input.exchangeRate,

    note: input.note?.trim(),
    status: input.status,
    date: input.date,
    createdAt: now,
    updatedAt: now,
  };
}

export function updateTransfer(
  currentTransfer: Transfer,
  input: UpdateTransferInput,
): Transfer {
  return {
    ...currentTransfer,
    ...input,
    note: input.note?.trim() ?? currentTransfer.note,
    updatedAt: new Date().toISOString(),
  };
}

export function calculateExchangeRate(fromAmount: number, toAmount: number) {
  if (fromAmount <= 0 || toAmount <= 0) {
    return 0;
  }

  return toAmount / fromAmount;
}

export function getTotalDebitFromOrigin(
  fromAmount: number,
  feeAmount: number,
  feeCurrencyMatchesOrigin: boolean,
) {
  return feeCurrencyMatchesOrigin ? fromAmount + feeAmount : fromAmount;
}
