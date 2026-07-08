import { getSignedMovementAmount } from "@/services/movement.service";
import { getTotalDebitFromOrigin } from "@/services/transfer.service";
import { useAccountStore } from "@/store/useAccountStore";
import { CurrencyCode, Movement, Transfer } from "@/types/finance.types";

const MIN_BALANCE_EPSILON = -0.000001;

type BalanceDelta = {
  accountId: string;
  currency: CurrencyCode;
  amountChange: number;
};

type BalanceDeltaBucket = {
  accountId: string;
  currency: CurrencyCode;
  amountChange: number;
};

function getBalanceKey(accountId: string, currency: CurrencyCode) {
  return `${accountId}:${currency}`;
}

function mergeBalanceDeltas(deltas: BalanceDelta[]) {
  const buckets = new Map<string, BalanceDeltaBucket>();

  deltas.forEach((delta) => {
    const key = getBalanceKey(delta.accountId, delta.currency);
    const currentBucket = buckets.get(key);

    if (!currentBucket) {
      buckets.set(key, {
        ...delta,
      });
      return;
    }

    buckets.set(key, {
      ...currentBucket,
      amountChange: currentBucket.amountChange + delta.amountChange,
    });
  });

  return Array.from(buckets.values());
}

function assertDeltasKeepBalancesNonNegative(deltas: BalanceDelta[]) {
  const accountStore = useAccountStore.getState();
  const mergedDeltas = mergeBalanceDeltas(deltas);

  const invalidDelta = mergedDeltas.find((delta) => {
    const currentBalance = accountStore.getAccountBalance(
      delta.accountId,
      delta.currency,
    );

    const projectedBalance = currentBalance + delta.amountChange;

    return projectedBalance < MIN_BALANCE_EPSILON;
  });

  if (invalidDelta) {
    throw new Error(
      "No tienes dinero suficiente. Esta operación dejaría una cuenta en negativo.",
    );
  }
}

function getApplyMovementDeltas(movement: Movement): BalanceDelta[] {
  if (movement.status !== "confirmed") {
    return [];
  }

  return [
    {
      accountId: movement.accountId,
      currency: movement.currency,
      amountChange: getSignedMovementAmount(movement.kind, movement.amount),
    },
  ];
}

function getRevertMovementDeltas(movement: Movement): BalanceDelta[] {
  if (movement.status !== "confirmed") {
    return [];
  }

  return [
    {
      accountId: movement.accountId,
      currency: movement.currency,
      amountChange: -getSignedMovementAmount(movement.kind, movement.amount),
    },
  ];
}

function getApplyTransferDeltas(transfer: Transfer): BalanceDelta[] {
  if (transfer.status !== "confirmed") {
    return [];
  }

  const originDebit = getTotalDebitFromOrigin(
    transfer.fromAmount,
    transfer.feeAmount,
    transfer.feeCurrency === transfer.fromCurrency,
  );

  const deltas: BalanceDelta[] = [
    {
      accountId: transfer.fromAccountId,
      currency: transfer.fromCurrency,
      amountChange: -originDebit,
    },
    {
      accountId: transfer.toAccountId,
      currency: transfer.toCurrency,
      amountChange: transfer.toAmount,
    },
  ];

  if (
    transfer.feeAmount > 0 &&
    transfer.feeCurrency !== transfer.fromCurrency
  ) {
    deltas.push({
      accountId: transfer.fromAccountId,
      currency: transfer.feeCurrency,
      amountChange: -transfer.feeAmount,
    });
  }

  return deltas;
}

function getRevertTransferDeltas(transfer: Transfer): BalanceDelta[] {
  if (transfer.status !== "confirmed") {
    return [];
  }

  const originDebit = getTotalDebitFromOrigin(
    transfer.fromAmount,
    transfer.feeAmount,
    transfer.feeCurrency === transfer.fromCurrency,
  );

  const deltas: BalanceDelta[] = [
    {
      accountId: transfer.fromAccountId,
      currency: transfer.fromCurrency,
      amountChange: originDebit,
    },
    {
      accountId: transfer.toAccountId,
      currency: transfer.toCurrency,
      amountChange: -transfer.toAmount,
    },
  ];

  if (
    transfer.feeAmount > 0 &&
    transfer.feeCurrency !== transfer.fromCurrency
  ) {
    deltas.push({
      accountId: transfer.fromAccountId,
      currency: transfer.feeCurrency,
      amountChange: transfer.feeAmount,
    });
  }

  return deltas;
}

export function assertMovementKeepsBalancesNonNegative({
  movement,
  currentMovement,
}: {
  movement: Movement;
  currentMovement?: Movement;
}) {
  assertDeltasKeepBalancesNonNegative([
    ...(currentMovement ? getRevertMovementDeltas(currentMovement) : []),
    ...getApplyMovementDeltas(movement),
  ]);
}

export function assertTransferKeepsBalancesNonNegative({
  transfer,
  currentTransfer,
}: {
  transfer: Transfer;
  currentTransfer?: Transfer;
}) {
  assertDeltasKeepBalancesNonNegative([
    ...(currentTransfer ? getRevertTransferDeltas(currentTransfer) : []),
    ...getApplyTransferDeltas(transfer),
  ]);
}
