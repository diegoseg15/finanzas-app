import { router, useLocalSearchParams } from "expo-router";
import { Archive, Pencil } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppCard } from "@/components/ui/AppCard";
import { AppFormModal } from "@/components/ui/AppFormModal";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { CreateAccountForm } from "@/features/accounts/components/CreateAccountForm";
import { DebitAccountCard } from "@/features/accounts/components/DebitAccountCard";
import { formatMoney } from "@/services/money.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

export default function AccountDetailScreen() {
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);
  const editAccount = useAccountStore((state) => state.editAccount);

  const params = useLocalSearchParams<{ accountId: string }>();
  const accountId = params.accountId;

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const account = useAccountStore((state) =>
    state.accounts.find((item) => item.id === accountId),
  );

  const archiveAccountById = useAccountStore(
    (state) => state.archiveAccountById,
  );

  if (!account) {
    return (
      <Screen style={styles.screen}>
        <AppCard style={styles.emptyCard}>
          <AppText variant="subtitle">Cuenta no encontrada</AppText>

          <AppText variant="muted">
            Esta cuenta ya no existe o fue eliminada.
          </AppText>
        </AppCard>
      </Screen>
    );
  }

  const mainBalance = account.balances[0];

  const handleArchive = () => {
    Alert.alert(t("accounts.deleteTitle"), t("accounts.deleteDescription"), [
      {
        text: t("common.cancel"),
        style: "cancel",
      },
      {
        text: t("common.delete"),
        style: "destructive",
        onPress: () => {
          archiveAccountById(account.id);
          router.back();
        },
      },
    ]);
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.header}>
        <AppText variant="title">{account.name}</AppText>

        <AppText variant="muted">
          Administra la información y configuración de esta cuenta.
        </AppText>
      </View>

      <DebitAccountCard account={account} compact />

      <AppFormModal
        visible={isEditing}
        showHeader={false}
        onClose={() => setIsEditing(false)}
      >
        <CreateAccountForm
          initialAccount={account}
          submitLabelI18nKey="accounts.saveChanges"
          onCancel={() => setIsEditing(false)}
          onSubmit={(input) => {
            editAccount(account.id, {
              name: input.name,
              type: input.type,
              includeInTotalBalance: input.includeInTotalBalance,
              institutionName: input.institutionName,
              isPinned: input.isPinned,
              cardDesign: input.cardDesign,
            });

            setIsEditing(false);
          }}
        />
      </AppFormModal>

      <AppCard style={styles.infoCard}>
        <View style={styles.infoRow}>
          <AppText variant="caption">Tipo</AppText>

          <AppText
            variant="body"
            i18nKey={`accounts.types.${account.type}.label`}
          />
        </View>

        <View style={styles.infoRow}>
          <AppText variant="caption">Institución</AppText>

          <AppText variant="body">
            {account.institutionName || "No definida"}
          </AppText>
        </View>

        <View style={styles.infoRow}>
          <AppText variant="caption">Moneda principal</AppText>

          <AppText variant="body">{account.mainCurrency}</AppText>
        </View>

        <View style={styles.infoRow}>
          <AppText variant="caption">Saldo actual</AppText>

          <AppText variant="body">
            {formatMoney({
              amount: mainBalance?.amount ?? 0,
              currencyCode: mainBalance?.currency ?? account.mainCurrency,
            })}
          </AppText>
        </View>

        <View style={styles.infoRow}>
          <AppText variant="caption">Total estimado</AppText>

          <AppText variant="body">
            {account.includeInTotalBalance ? "Incluida" : "Separada"}
          </AppText>
        </View>

        <View style={styles.infoRow}>
          <AppText variant="caption">Importancia</AppText>

          <AppText variant="body">
            {account.isPinned ? "Fijada" : "Normal"}
          </AppText>
        </View>
      </AppCard>

      <AppCard style={styles.actionsCard}>
        <AppText variant="subtitle">Acciones</AppText>

        <View style={styles.actions}>
          <Pressable
            onPress={() => setIsEditing(true)}
            style={({ pressed }) => [
              styles.actionButton,
              {
                backgroundColor: themeColors.cardSoft,
                borderColor: themeColors.border,
                opacity: pressed ? 0.75 : 1,
              },
            ]}
          >
            <Pencil size={18} color={themeColors.text} />

            <AppText variant="body">Editar cuenta</AppText>
          </Pressable>

          <Pressable
            onPress={handleArchive}
            style={({ pressed }) => [
              styles.actionButton,
              {
                backgroundColor: themeColors.cardSoft,
                borderColor: themeColors.border,
                opacity: pressed ? 0.75 : 1,
              },
            ]}
          >
            <Archive size={18} color={themeColors.expense} />

            <AppText variant="body" style={{ color: themeColors.expense }}>
              Archivar cuenta
            </AppText>
          </Pressable>
        </View>
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: 22,
  },

  header: {
    gap: 6,
  },

  emptyCard: {
    gap: 8,
  },

  infoCard: {
    gap: 14,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
  },

  actionsCard: {
    gap: 14,
  },

  actions: {
    gap: 10,
  },

  actionButton: {
    minHeight: 52,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
