import { colors } from "@/constants/colors";
import {
  Account,
  CreateAccountInput,
  UpdateAccountInput,
} from "@/types/finance.types";

function createId() {
  return `account_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function getDefaultAccountColor(type: CreateAccountInput["type"]) {
  if (type === "crypto_exchange" || type === "crypto_wallet") {
    return colors.dark.warning;
  }

  if (type === "loan_payable" || type === "credit_card") {
    return colors.dark.expense;
  }

  if (type === "loan_receivable") {
    return colors.dark.income;
  }

  return colors.dark.primary;
}

function getDefaultAccountIcon(type: CreateAccountInput["type"]) {
  const iconByType: Record<CreateAccountInput["type"], string> = {
    bank: "building-bank",
    cash: "wallet",
    piggy_bank: "piggy-bank",
    crypto_exchange: "bitcoin",
    crypto_wallet: "shield",
    credit_card: "credit-card",
    loan_receivable: "arrow-down-left",
    loan_payable: "arrow-up-right",
    custom: "circle-dollar-sign",
  };

  return iconByType[type];
}

export function createAccount(input: CreateAccountInput): Account {
  const now = new Date().toISOString();

  return {
    id: createId(),
    name: input.name.trim(),
    type: input.type,
    mainCurrency: input.mainCurrency,
    balances: [
      {
        currency: input.mainCurrency,
        amount: input.initialBalance,
      },
    ],
    includeInTotalBalance: input.includeInTotalBalance,
    status: "active",
    color: getDefaultAccountColor(input.type),
    icon: getDefaultAccountIcon(input.type),
    institutionName: input.institutionName?.trim(),
    isPinned: input.isPinned ?? false,
    displayOrder: Date.now(),
    cardDesign: input.cardDesign ?? "default",
    isSavingsTarget: input.isSavingsTarget ?? input.type === "piggy_bank",
    createdAt: now,
    updatedAt: now,
  };
}

export function updateAccount(
  currentAccount: Account,
  input: UpdateAccountInput,
): Account {
  return {
    ...currentAccount,
    ...input,
    updatedAt: new Date().toISOString(),
  };
}

export function archiveAccount(currentAccount: Account): Account {
  return updateAccount(currentAccount, {
    status: "archived",
  });
}

export function getAccountTotalBalance(account: Account) {
  return account.balances.reduce((total, balance) => total + balance.amount, 0);
}

export function isCryptoAccount(account: Account) {
  return account.type === "crypto_exchange" || account.type === "crypto_wallet";
}

export function isLoanAccount(account: Account) {
  return account.type === "loan_payable" || account.type === "loan_receivable";
}

export function isVisibleAccount(account: Account) {
  return (
    account.status === "active" &&
    !account.hiddenFromAccounts &&
    !isLoanAccount(account)
  );
}
