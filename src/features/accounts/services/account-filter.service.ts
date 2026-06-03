import { isCryptoAccount, isVisibleAccount } from "@/services/account.service";
import { Account } from "@/types/finance.types";

export function getVisibleAccounts(accounts: Account[]) {
  return accounts.filter(isVisibleAccount);
}

export function getRegularAccounts(accounts: Account[]) {
  return getVisibleAccounts(accounts).filter(
    (account) => !isCryptoAccount(account),
  );
}

export function getCryptoAccounts(accounts: Account[]) {
  return getVisibleAccounts(accounts).filter(isCryptoAccount);
}
