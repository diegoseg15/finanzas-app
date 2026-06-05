import { useMemo, useState } from "react";

import {
    getCryptoAccounts,
    getRegularAccounts,
} from "@/features/accounts/services/account-filter.service";
import { sortAccountsByImportance } from "@/features/accounts/services/account-order.service";
import {
    canCreateAccount,
    getRemainingFreeAccounts,
} from "@/services/subscription.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { Account, CreateAccountInput } from "@/types/finance.types";

import { AccountViewMode } from "../types/account-view-mode.types";

export function useAccountsScreen() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [viewMode, setViewMode] = useState<AccountViewMode>("regular");
  const [hideGroupTotal, setHideGroupTotal] = useState(false);

  const mainCurrency = useAppSettingsStore((state) => state.mainCurrency);

  const accounts = useAccountStore((state) => state.accounts);
  const addAccount = useAccountStore((state) => state.addAccount);
  const editAccount = useAccountStore((state) => state.editAccount);

  const subscription = useSubscriptionStore((state) => state.subscription);

  const regularAccounts = useMemo(
    () => sortAccountsByImportance(getRegularAccounts(accounts)),
    [accounts],
  );

  const cryptoAccounts = useMemo(
    () => sortAccountsByImportance(getCryptoAccounts(accounts)),
    [accounts],
  );

  const activeAccounts = useMemo(
    () => [...regularAccounts, ...cryptoAccounts],
    [regularAccounts, cryptoAccounts],
  );

  const visibleAccounts =
    viewMode === "crypto" ? cryptoAccounts : regularAccounts;

  const groupTotal = useMemo(() => {
    return visibleAccounts.reduce((total, account) => {
      if (!account.includeInTotalBalance) {
        return total;
      }

      const mainBalance = account.balances.find(
        (balance) => balance.currency === mainCurrency,
      );

      return total + (mainBalance?.amount ?? 0);
    }, 0);
  }, [visibleAccounts, mainCurrency]);

  const canCreateMoreAccounts = canCreateAccount(
    subscription,
    activeAccounts.length,
  );

  const remainingFreeAccounts = getRemainingFreeAccounts(
    subscription,
    activeAccounts.length,
  );

  const openCreateAccountForm = () => {
    setEditingAccount(null);
    setIsCreating(true);
  };

  const closeAccountForm = () => {
    setEditingAccount(null);
    setIsCreating(false);
  };

  const submitAccount = (input: CreateAccountInput) => {
    if (editingAccount) {
      editAccount(editingAccount.id, {
        name: input.name,
        type: input.type,
        includeInTotalBalance: input.includeInTotalBalance,
        institutionName: input.institutionName,
        isPinned: input.isPinned,
        isSavingsTarget: input.isSavingsTarget,
        cardDesign: input.cardDesign,
      });

      setEditingAccount(null);
    } else {
      addAccount(input);
    }

    setIsCreating(false);
  };

  const toggleHideGroupTotal = () => {
    setHideGroupTotal((current) => !current);
  };

  return {
    mainCurrency,

    isCreating,
    editingAccount,
    viewMode,
    hideGroupTotal,

    activeAccounts,
    visibleAccounts,
    groupTotal,
    canCreateMoreAccounts,
    remainingFreeAccounts,

    setViewMode,
    openCreateAccountForm,
    closeAccountForm,
    submitAccount,
    toggleHideGroupTotal,
  };
}
