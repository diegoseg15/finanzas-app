import { router } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppFormModal } from "@/components/ui/AppFormModal";
import { AppText } from "@/components/ui/AppText";
import { EmptyState } from "@/components/ui/EmptyState";
import { PlanLimitNotice } from "@/components/ui/PlanLimitNotice";
import { colors } from "@/constants/colors";
import { routes } from "@/constants/routes";
import { AccountCard } from "@/features/accounts/components/AccountCard";
import { CreateAccountForm } from "@/features/accounts/components/CreateAccountForm";
import {
  getCryptoAccounts,
  getRegularAccounts,
} from "@/features/accounts/services/account-filter.service";
import { sortAccountsByImportance } from "@/features/accounts/services/account-order.service";
import { formatMoney } from "@/services/money.service";
import {
  canCreateAccount,
  getRemainingFreeAccounts,
} from "@/services/subscription.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { Account } from "@/types/finance.types";

type AccountViewMode = "regular" | "crypto";

export default function AccountsScreen() {
  const { t } = useTranslation();

  const [isCreating, setIsCreating] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [viewMode, setViewMode] = useState<AccountViewMode>("regular");

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const mainCurrency = useAppSettingsStore((state) => state.mainCurrency);

  const accounts = useAccountStore((state) => state.accounts);
  const addAccount = useAccountStore((state) => state.addAccount);
  const editAccount = useAccountStore((state) => state.editAccount);
  const archiveAccountById = useAccountStore(
    (state) => state.archiveAccountById,
  );

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

  const includedAccounts = visibleAccounts.filter(
    (account) => account.includeInTotalBalance,
  ).length;

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

      {activeAccounts.length > 0 ? (
        <>
          <View
            style={[
              styles.segmentedControl,
              {
                backgroundColor: themeColors.cardSoft,
                borderColor: themeColors.border,
              },
            ]}
          >
            <AccountModeButton
              label="No cripto"
              isActive={viewMode === "regular"}
              onPress={() => setViewMode("regular")}
            />

            <AccountModeButton
              label="Cripto"
              isActive={viewMode === "crypto"}
              onPress={() => setViewMode("crypto")}
            />
          </View>

          <AppCard style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <View style={styles.summaryCopy}>
                <AppText variant="caption">
                  {viewMode === "crypto" ? "Total cripto" : "Total no cripto"}
                </AppText>

                <AppText variant="title">
                  {formatMoney({
                    amount: groupTotal,
                    currencyCode: mainCurrency,
                  })}
                </AppText>
              </View>

              <View style={styles.summaryBadge}>
                <AppText variant="caption">
                  {visibleAccounts.length}{" "}
                  {visibleAccounts.length === 1 ? "cuenta" : "cuentas"}
                </AppText>
              </View>
            </View>

            <View
              style={[
                styles.summaryDivider,
                {
                  backgroundColor: themeColors.border,
                },
              ]}
            />

            <View style={styles.summaryFooter}>
              <AppText variant="caption">
                {includedAccounts} incluidas en el total
              </AppText>

              <AppText variant="caption">{mainCurrency}</AppText>
            </View>
          </AppCard>
        </>
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
                institutionName: input.institutionName,
                isPinned: input.isPinned,
                cardDesign: input.cardDesign,
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

      {activeAccounts.length > 0 && visibleAccounts.length === 0 ? (
        <AppCard style={styles.emptyGroupCard}>
          <AppText variant="muted">
            {viewMode === "crypto"
              ? "Aún no tienes cuentas cripto."
              : "Aún no tienes cuentas no cripto."}
          </AppText>
        </AppCard>
      ) : null}

      {visibleAccounts.length > 0 ? (
        <View style={styles.list}>
          {visibleAccounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onPress={() => router.push(`/accounts/${account.id}` as never)}
            />
          ))}
        </View>
      ) : null}
    </Screen>
  );
}

type AccountModeButtonProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

function AccountModeButton({
  label,
  isActive,
  onPress,
}: AccountModeButtonProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.segmentedButton,
        {
          backgroundColor: isActive ? themeColors.primary : "transparent",
        },
      ]}
    >
      <AppText
        variant="caption"
        style={[
          styles.segmentedButtonText,
          {
            color: isActive ? "#FFFFFF" : themeColors.textMuted,
          },
        ]}
      >
        {label}
      </AppText>
    </Pressable>
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

  segmentedControl: {
    flexDirection: "row",
    borderRadius: 22,
    borderWidth: 1,
    padding: 4,
    gap: 4,
  },

  segmentedButton: {
    flex: 1,
    minHeight: 42,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },

  segmentedButtonText: {
    fontWeight: "900",
  },

  summaryCard: {
    gap: 14,
  },

  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
  },

  summaryCopy: {
    flex: 1,
    gap: 4,
  },

  summaryBadge: {
    alignItems: "flex-end",
    justifyContent: "center",
  },

  summaryDivider: {
    height: 1,
    opacity: 0.75,
  },

  summaryFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  emptyGroupCard: {
    gap: 8,
  },

  list: {
    gap: 14,
  },
});
