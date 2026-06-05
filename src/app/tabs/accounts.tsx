import { router } from "expo-router";
import { StyleSheet } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { PlanLimitNotice } from "@/components/ui/PlanLimitNotice";
import { routes } from "@/constants/routes";
import { AccountModeSelector } from "@/features/accounts/components/AccountModeSelector";
import { AccountsContent } from "@/features/accounts/components/AccountsContent";
import { AccountsFormModal } from "@/features/accounts/components/AccountsFormModal";
import { AccountsHeader } from "@/features/accounts/components/AccountsHeader";
import { AccountsSummaryCard } from "@/features/accounts/components/AccountsSummaryCard";
import { useAccountsScreen } from "@/features/accounts/hooks/useAccountsScreen";

export default function AccountsScreen() {
  const {
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
  } = useAccountsScreen();

  return (
    <Screen style={styles.container}>
      <AccountsHeader
        isCreating={isCreating}
        canCreateMoreAccounts={canCreateMoreAccounts}
        hasAccounts={activeAccounts.length > 0}
        onCreatePress={openCreateAccountForm}
      />

      {!canCreateMoreAccounts && !isCreating ? (
        <PlanLimitNotice
          titleI18nKey="accounts.limitTitle"
          descriptionI18nKey="accounts.limitDescription"
          ctaI18nKey="plans.plusPlan.cta"
          onUpgrade={() => router.push(routes.tabs.plans as never)}
        />
      ) : null}

      <AccountModeSelector value={viewMode} onChange={setViewMode} />

      {activeAccounts.length > 0 ? (
        <AccountsSummaryCard
          viewMode={viewMode}
          groupTotal={groupTotal}
          currency={mainCurrency}
          hideGroupTotal={hideGroupTotal}
          remainingFreeAccounts={remainingFreeAccounts}
          onToggleVisibility={toggleHideGroupTotal}
        />
      ) : null}

      <AccountsFormModal
        visible={isCreating}
        editingAccount={editingAccount}
        onClose={closeAccountForm}
        onSubmit={submitAccount}
      />

      <AccountsContent
        activeAccounts={activeAccounts}
        visibleAccounts={visibleAccounts}
        viewMode={viewMode}
        isCreating={isCreating}
        canCreateMoreAccounts={canCreateMoreAccounts}
        onCreatePress={openCreateAccountForm}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
});
