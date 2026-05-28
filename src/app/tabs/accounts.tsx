import { router } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppFormModal } from "@/components/ui/AppFormModal";
import { AppText } from "@/components/ui/AppText";
import { EmptyState } from "@/components/ui/EmptyState";
import { PlanLimitNotice } from "@/components/ui/PlanLimitNotice";
import { routes } from "@/constants/routes";
import { AccountCard } from "@/features/accounts/components/AccountCard";
import { CreateAccountForm } from "@/features/accounts/components/CreateAccountForm";
import {
  canCreateAccount,
  getRemainingFreeAccounts,
} from "@/services/subscription.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { Account } from "@/types/finance.types";

export default function AccountsScreen() {
  const { t } = useTranslation();

  const [isCreating, setIsCreating] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);

  const accounts = useAccountStore((state) => state.accounts);
  const addAccount = useAccountStore((state) => state.addAccount);
  const editAccount = useAccountStore((state) => state.editAccount);
  const archiveAccountById = useAccountStore(
    (state) => state.archiveAccountById,
  );

  const subscription = useSubscriptionStore((state) => state.subscription);

  const activeAccounts = useMemo(
    () => accounts.filter((account) => account.status === "active"),
    [accounts],
  );

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

  const handleCancelForm = () => {
    setEditingAccount(null);
    setIsCreating(false);
  };

  const handleDeleteAccount = (accountId: string) => {
    Alert.alert(t("accounts.deleteTitle"), t("accounts.deleteDescription"), [
      {
        text: t("common.cancel"),
        style: "cancel",
      },
      {
        text: t("common.delete"),
        style: "destructive",
        onPress: () => archiveAccountById(accountId),
      },
    ]);
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <AppText variant="title" i18nKey="accounts.title" />

          <AppText variant="muted" i18nKey="accounts.description" />

          {remainingFreeAccounts !== null ? (
            <AppText
              variant="caption"
              i18nKey="accounts.freePlanRemaining"
              i18nValues={{ count: remainingFreeAccounts }}
            />
          ) : (
            <AppText variant="caption" i18nKey="accounts.plusPlanUnlimited" />
          )}
        </View>

        {!isCreating && canCreateMoreAccounts && activeAccounts.length > 0 ? (
          <AppButton
            onPress={openCreateAccountForm}
            i18nKey="accounts.newAccount"
          />
        ) : null}
      </View>

      {!canCreateMoreAccounts && !isCreating ? (
        <PlanLimitNotice
          titleI18nKey="accounts.limitTitle"
          descriptionI18nKey="accounts.limitDescription"
          ctaI18nKey="plans.plusPlan.cta"
          onUpgrade={() => router.push(routes.tabs.plans as never)}
        />
      ) : null}

      <AppFormModal
        visible={isCreating}
        showHeader={false}
        onClose={handleCancelForm}
      >
        <CreateAccountForm
          initialAccount={editingAccount ?? undefined}
          submitLabelI18nKey={
            editingAccount ? "accounts.saveChanges" : "accounts.saveAccount"
          }
          onCancel={handleCancelForm}
          onSubmit={(input) => {
            if (editingAccount) {
              editAccount(editingAccount.id, {
                name: input.name,
                type: input.type,
                includeInTotalBalance: input.includeInTotalBalance,
              });

              setEditingAccount(null);
            } else {
              addAccount(input);
            }

            setIsCreating(false);
          }}
        />
      </AppFormModal>

      {activeAccounts.length === 0 && !isCreating ? (
        <EmptyState
          titleI18nKey="accounts.emptyTitle"
          descriptionI18nKey="accounts.emptyDescription"
          action={
            canCreateMoreAccounts ? (
              <AppButton
                onPress={openCreateAccountForm}
                i18nKey="accounts.firstAccount"
              />
            ) : undefined
          }
        />
      ) : null}

      {activeAccounts.length > 0 ? (
        <View style={styles.list}>
          {activeAccounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onEdit={() => {
                setEditingAccount(account);
                setIsCreating(true);
              }}
              onDelete={() => handleDeleteAccount(account.id)}
            />
          ))}
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 22,
  },

  header: {
    gap: 18,
  },

  copy: {
    gap: 8,
  },

  list: {
    gap: 14,
  },
});
