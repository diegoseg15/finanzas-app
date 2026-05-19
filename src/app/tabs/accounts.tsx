import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
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
    Alert.alert(
      "Eliminar cuenta",
      "La cuenta se ocultará de la lista activa. Sus movimientos históricos se conservarán.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => archiveAccountById(accountId),
        },
      ],
    );
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <AppText variant="title">Cuentas</AppText>

          <AppText variant="muted">
            Registra bancos, efectivo, criptomonedas, tarjetas y préstamos.
          </AppText>

          {remainingFreeAccounts !== null ? (
            <AppText variant="caption">
              Plan gratis: {remainingFreeAccounts} cuentas disponibles.
            </AppText>
          ) : (
            <AppText variant="caption">Plan Plus: cuentas ilimitadas.</AppText>
          )}
        </View>

        {!isCreating && canCreateMoreAccounts && activeAccounts.length > 0 ? (
          <AppButton onPress={openCreateAccountForm}>Nueva cuenta</AppButton>
        ) : null}
      </View>

      {!canCreateMoreAccounts && !isCreating ? (
        <PlanLimitNotice
          title="Llegaste al límite de cuentas gratis"
          description="El plan gratuito permite hasta 3 cuentas. Activa Plus para crear cuentas ilimitadas."
          onUpgrade={() => router.push(routes.tabs.plans as never)}
        />
      ) : null}

      {isCreating ? (
        <CreateAccountForm
          initialAccount={editingAccount ?? undefined}
          submitLabel={editingAccount ? "Guardar cambios" : "Guardar cuenta"}
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
      ) : null}

      {activeAccounts.length === 0 && !isCreating ? (
        <EmptyState
          title="Aún no tienes cuentas"
          description="Crea tu primera cuenta para empezar a registrar ingresos, egresos y transferencias."
          action={
            canCreateMoreAccounts ? (
              <AppButton onPress={openCreateAccountForm}>
                Crear primera cuenta
              </AppButton>
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
