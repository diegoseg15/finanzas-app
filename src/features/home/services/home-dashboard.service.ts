import { getCategoryById } from "@/constants/categories";
import {
    Account,
    CurrencyCode,
    Movement,
    Transfer,
} from "@/types/finance.types";

import { HomeActivityItem, HomeMonthlySummary } from "../types/home.types";

export function getActiveAccounts(accounts: Account[]) {
  return accounts.filter((account) => account.status === "active");
}

export function calculateTotalBalance(
  accounts: Account[],
  mainCurrency: CurrencyCode,
) {
  return accounts.reduce((total, account) => {
    if (!account.includeInTotalBalance) {
      return total;
    }

    const mainBalance = account.balances[0];

    if (!mainBalance || mainBalance.currency !== mainCurrency) {
      return total;
    }

    return total + mainBalance.amount;
  }, 0);
}

export function calculateMonthlySummary(params: {
  movements: Movement[];
  currency: CurrencyCode;
}): HomeMonthlySummary {
  const { movements, currency } = params;

  const now = new Date();

  const monthlyMovements = movements.filter((movement) => {
    const movementDate = new Date(movement.date);

    return (
      movement.status === "confirmed" &&
      movement.currency === currency &&
      movementDate.getMonth() === now.getMonth() &&
      movementDate.getFullYear() === now.getFullYear()
    );
  });

  const income = monthlyMovements
    .filter((movement) => movement.kind === "income")
    .reduce((total, movement) => total + movement.amount, 0);

  const expense = monthlyMovements
    .filter((movement) => movement.kind === "expense")
    .reduce((total, movement) => total + movement.amount, 0);

  return {
    income,
    expense,
    balance: income - expense,
  };
}

export function buildLatestActivityItems(params: {
  movements: Movement[];
  transfers: Transfer[];
  limit?: number;
}): HomeActivityItem[] {
  const { movements, transfers, limit = 4 } = params;

  const movementItems: HomeActivityItem[] = movements.map((movement) => {
    const category = getCategoryById(movement.categoryId);

    return {
      id: movement.id,
      type: "movement",
      date: movement.date,
      amount: movement.amount,
      currency: movement.currency,
      kind: movement.kind,
      labelI18nKey: category?.labelI18nKey,
      fallbackLabel: category?.name ?? "",
    };
  });

  const transferItems: HomeActivityItem[] = transfers.map((transfer) => ({
    id: transfer.id,
    type: "transfer",
    date: transfer.date,
    amount: transfer.fromAmount,
    currency: transfer.fromCurrency,
    kind: "transfer",
    labelI18nKey: "common.transfer",
    fallbackLabel: "Transferencia",
  }));

  return [...movementItems, ...transferItems]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
