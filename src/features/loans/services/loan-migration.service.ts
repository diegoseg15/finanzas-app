import { Account } from "@/types/finance.types";
import { Loan } from "@/types/loan.types";

function isLegacyLoanAccount(account: Account) {
  return account.type === "loan_payable" || account.type === "loan_receivable";
}

function getLoanKindFromAccount(account: Account) {
  return account.type === "loan_payable" ? "payable" : "receivable";
}

function getLegacyLoanId(accountId: string) {
  return `loan_legacy_${accountId}`;
}

function getMainBalanceAmount(account: Account) {
  const mainBalance =
    account.balances.find(
      (balance) => balance.currency === account.mainCurrency,
    ) ?? account.balances[0];

  return Math.abs(mainBalance?.amount ?? 0);
}

function createLoanFromLegacyAccount(account: Account): Loan {
  const now = new Date().toISOString();
  const amount = getMainBalanceAmount(account);

  return {
    id: getLegacyLoanId(account.id),
    title: account.name,
    kind: getLoanKindFromAccount(account),
    currency: account.mainCurrency,
    originalAmount: amount,
    remainingAmount: amount,
    payments: [],
    status: "active",
    linkedLegacyAccountId: account.id,
    createdAt: account.createdAt || now,
    updatedAt: now,
  };
}

function markLegacyAccountAsMigrated(
  account: Account,
  loanId: string,
): Account {
  return {
    ...account,
    status: "archived",
    includeInTotalBalance: false,
    hiddenFromAccounts: true,
    legacyType: "loan",
    migratedToLoanId: loanId,
    updatedAt: new Date().toISOString(),
  };
}

export function migrateLegacyLoanAccounts(params: {
  accounts: Account[];
  loans: Loan[];
}) {
  const { accounts, loans } = params;

  let hasChanges = false;
  const nextLoans = [...loans];

  const nextAccounts = accounts.map((account) => {
    if (!isLegacyLoanAccount(account)) {
      return account;
    }

    if (account.migratedToLoanId) {
      return account;
    }

    const existingLoan = nextLoans.find(
      (loan) => loan.linkedLegacyAccountId === account.id,
    );

    if (existingLoan) {
      hasChanges = true;
      return markLegacyAccountAsMigrated(account, existingLoan.id);
    }

    const newLoan = createLoanFromLegacyAccount(account);

    nextLoans.unshift(newLoan);
    hasChanges = true;

    return markLegacyAccountAsMigrated(account, newLoan.id);
  });

  return {
    hasChanges,
    accounts: nextAccounts,
    loans: nextLoans,
  };
}
