import { router } from "expo-router";
import { Bitcoin, Landmark, Star } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

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
  const [isCreating, setIsCreating] = useState(false);
  const [viewMode, setViewMode] = useState<AccountViewMode>("regular");

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const mainCurrency = useAppSettingsStore((state) => state.mainCurrency);

  const accounts = useAccountStore((state) => state.accounts);
  const addAccount = useAccountStore((state) => state.addAccount);

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

  const pinnedAccounts = visibleAccounts.filter((account) => account.isPinned);
  const otherAccounts = visibleAccounts.filter((account) => !account.isPinned);

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

  const currentGroupTitle =
    viewMode === "crypto" ? "Activos digitales" : "Cuentas tradicionales";

  const currentGroupDescription =
    viewMode === "crypto"
      ? "Wallets, exchanges y activos cripto separados de tus cuentas normales."
      : "Bancos, efectivo, alcancías y cuentas operativas en un solo lugar.";

  const handleCancelForm = () => {
    setIsCreating(false);
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

        {canCreateMoreAccounts ? (
          <AppButton
            onPress={() => setIsCreating(true)}
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
              label="Tradicionales"
              count={regularAccounts.length}
              isActive={viewMode === "regular"}
              onPress={() => setViewMode("regular")}
            />

            <AccountModeButton
              label="Cripto"
              count={cryptoAccounts.length}
              isActive={viewMode === "crypto"}
              onPress={() => setViewMode("crypto")}
            />
          </View>

          <AppCard style={styles.summaryCard}>
            <View style={styles.summaryTop}>
              <View
                style={[
                  styles.summaryIconBox,
                  {
                    backgroundColor:
                      viewMode === "crypto"
                        ? themeColors.warning
                        : themeColors.primary,
                    borderColor:
                      viewMode === "crypto"
                        ? themeColors.warning
                        : themeColors.primary,
                  },
                ]}
              >
                {viewMode === "crypto" ? (
                  <Bitcoin size={22} color="#FFFFFF" />
                ) : (
                  <Landmark size={22} color="#FFFFFF" />
                )}
              </View>

              <View style={styles.summaryCopy}>
                <AppText variant="caption">{currentGroupTitle}</AppText>

                <AppText variant="title" numberOfLines={1}>
                  {formatMoney({
                    amount: groupTotal,
                    currencyCode: mainCurrency,
                  })}
                </AppText>
              </View>
            </View>

            <AppText variant="muted">{currentGroupDescription}</AppText>

            <View
              style={[
                styles.summaryDivider,
                {
                  backgroundColor: themeColors.border,
                },
              ]}
            />

            <View style={styles.summaryStats}>
              <SummaryStat label="Total" value={visibleAccounts.length} />
              <SummaryStat label="Incluidas" value={includedAccounts} />
              <SummaryStat label="Fijadas" value={pinnedAccounts.length} />
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
          submitLabelI18nKey="accounts.saveAccount"
          onCancel={handleCancelForm}
          onSubmit={(input) => {
            addAccount(input);
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
                onPress={() => setIsCreating(true)}
                i18nKey="accounts.firstAccount"
              />
            ) : undefined
          }
        />
      ) : null}

      {activeAccounts.length > 0 && visibleAccounts.length === 0 ? (
        <AppCard style={styles.emptyGroupCard}>
          <AppText variant="subtitle">
            {viewMode === "crypto"
              ? "Aún no tienes cuentas cripto"
              : "Aún no tienes cuentas tradicionales"}
          </AppText>

          <AppText variant="muted">
            {viewMode === "crypto"
              ? "Agrega un exchange o wallet para separar tus activos digitales."
              : "Agrega bancos, efectivo o alcancías para organizar tu dinero."}
          </AppText>

          {canCreateMoreAccounts ? (
            <AppButton
              onPress={() => setIsCreating(true)}
              i18nKey="accounts.newAccount"
            />
          ) : null}
        </AppCard>
      ) : null}

      {visibleAccounts.length > 0 ? (
        <View style={styles.accountsContent}>
          {pinnedAccounts.length > 0 ? (
            <AccountSection
              title="Importantes"
              count={pinnedAccounts.length}
              accounts={pinnedAccounts}
              highlighted
            />
          ) : null}

          {otherAccounts.length > 0 ? (
            <AccountSection
              title={
                viewMode === "crypto" ? "Activos digitales" : "Disponibles"
              }
              count={otherAccounts.length}
              accounts={otherAccounts}
            />
          ) : null}
        </View>
      ) : null}
    </Screen>
  );
}

type AccountModeButtonProps = {
  label: string;
  count: number;
  isActive: boolean;
  onPress: () => void;
};

function AccountModeButton({
  label,
  count,
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

      <View
        style={[
          styles.segmentedBadge,
          {
            backgroundColor: isActive
              ? "rgba(255,255,255,0.18)"
              : themeColors.card,
          },
        ]}
      >
        <AppText
          variant="caption"
          style={{
            color: isActive ? "#FFFFFF" : themeColors.textMuted,
          }}
        >
          {count}
        </AppText>
      </View>
    </Pressable>
  );
}

type SummaryStatProps = {
  label: string;
  value: number;
};

function SummaryStat({ label, value }: SummaryStatProps) {
  return (
    <View style={styles.summaryStatItem}>
      <AppText variant="caption">{label}</AppText>
      <AppText variant="body">{value}</AppText>
    </View>
  );
}

type AccountSectionProps = {
  title: string;
  count: number;
  accounts: Account[];
  highlighted?: boolean;
};

function AccountSection({
  title,
  count,
  accounts,
  highlighted = false,
}: AccountSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          {highlighted ? <Star size={18} color="#F59E0B" /> : null}

          <AppText variant="subtitle">{title}</AppText>
        </View>

        <AppText variant="caption">{count}</AppText>
      </View>

      <View style={styles.list}>
        {accounts.map((account) => (
          <AccountCard
            key={account.id}
            account={account}
            onPress={() => router.push(`/accounts/${account.id}` as never)}
          />
        ))}
      </View>
    </View>
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
    borderRadius: 24,
    borderWidth: 1,
    padding: 5,
    gap: 5,
  },

  segmentedButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    flexDirection: "row",
    gap: 8,
  },

  segmentedButtonText: {
    fontWeight: "900",
  },

  segmentedBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 7,
  },

  summaryCard: {
    gap: 16,
  },

  summaryTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  summaryIconBox: {
    width: 52,
    height: 52,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  summaryCopy: {
    flex: 1,
    gap: 3,
  },

  summaryDivider: {
    height: 1,
    opacity: 0.75,
  },

  summaryStats: {
    flexDirection: "row",
    gap: 10,
  },

  summaryStatItem: {
    flex: 1,
    gap: 4,
  },

  accountsContent: {
    gap: 22,
  },

  section: {
    gap: 12,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  list: {
    gap: 14,
  },

  emptyGroupCard: {
    gap: 12,
  },
});
