import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { EmptyState } from "@/components/ui/EmptyState";
import { Account } from "@/types/finance.types";

import { AccountViewMode } from "../types/account-view-mode.types";
import { AccountCard } from "./AccountCard";

type AccountsContentProps = {
  activeAccounts: Account[];
  visibleAccounts: Account[];
  viewMode: AccountViewMode;
  isCreating: boolean;
  canCreateMoreAccounts: boolean;
  onCreatePress: () => void;
};

export function AccountsContent({
  activeAccounts,
  visibleAccounts,
  viewMode,
  isCreating,
  canCreateMoreAccounts,
  onCreatePress,
}: AccountsContentProps) {
  const { t } = useTranslation();

  const emptyGroupText =
    viewMode === "crypto"
      ? t("accounts.emptyCryptoAccounts")
      : t("accounts.emptyRegularAccounts");

  if (activeAccounts.length === 0 && !isCreating) {
    return (
      <EmptyState
        titleI18nKey="accounts.emptyTitle"
        descriptionI18nKey="accounts.emptyDescription"
        action={
          canCreateMoreAccounts ? (
            <AppButton
              onPress={onCreatePress}
              i18nKey="accounts.firstAccount"
            />
          ) : undefined
        }
      />
    );
  }

  if (activeAccounts.length > 0 && visibleAccounts.length === 0) {
    return (
      <AppCard style={styles.emptyGroupCard}>
        <AppText variant="muted">{emptyGroupText}</AppText>
      </AppCard>
    );
  }

  if (visibleAccounts.length === 0) {
    return null;
  }

  return (
    <View style={styles.list}>
      {visibleAccounts.map((account) => (
        <AccountCard
          key={account.id}
          account={account}
          onPress={() => router.push(`/accounts/${account.id}` as never)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyGroupCard: {
    gap: 8,
  },

  list: {
    gap: 14,
  },
});
