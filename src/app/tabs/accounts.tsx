import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";
import { EmptyState } from "@/components/ui/EmptyState";
import { AccountCard } from "@/features/accounts/components/AccountCard";
import { CreateAccountForm } from "@/features/accounts/components/CreateAccountForm";
import { useAccountStore } from "@/store/useAccountStore";

export default function AccountsScreen() {
  const [isCreating, setIsCreating] = useState(false);

  const accounts = useAccountStore((state) => state.accounts);
  const addAccount = useAccountStore((state) => state.addAccount);

  const activeAccounts = accounts.filter(
    (account) => account.status === "active",
  );

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <AppText variant="title">Cuentas</AppText>
          <AppText variant="muted">
            Registra bancos, efectivo, criptomonedas, tarjetas y préstamos.
          </AppText>
        </View>

        {!isCreating ? (
          <AppButton onPress={() => setIsCreating(true)}>
            Nueva cuenta
          </AppButton>
        ) : null}
      </View>

      {isCreating ? (
        <CreateAccountForm
          onCancel={() => setIsCreating(false)}
          onSubmit={(input) => {
            addAccount(input);
            setIsCreating(false);
          }}
        />
      ) : null}

      {activeAccounts.length === 0 && !isCreating ? (
        <EmptyState
          title="Aún no tienes cuentas"
          description="Crea tu primera cuenta para empezar a registrar ingresos, egresos y transferencias."
          action={
            <AppButton onPress={() => setIsCreating(true)}>
              Crear primera cuenta
            </AppButton>
          }
        />
      ) : null}

      {activeAccounts.length > 0 ? (
        <View style={styles.list}>
          {activeAccounts.map((account) => (
            <AccountCard key={account.id} account={account} />
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
