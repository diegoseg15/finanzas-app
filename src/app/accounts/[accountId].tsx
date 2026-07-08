import { router, useLocalSearchParams } from "expo-router";
import { Archive, Pencil } from "lucide-react-native";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppCard } from "@/components/ui/AppCard";
import { AppFormModal } from "@/components/ui/AppFormModal";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { routes } from "@/constants/routes";
import { CreateAccountForm } from "@/features/accounts/components/CreateAccountForm";
import { DebitAccountCard } from "@/features/accounts/components/DebitAccountCard";
import { MovementCard } from "@/features/movements/components/MovementCard";
import { TransferCard } from "@/features/transfers/components/TransferCard";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useMovementStore } from "@/store/useMovementStore";
import { useTransferStore } from "@/store/useTransferStore";
import { Movement, Transfer } from "@/types/finance.types";

export default function AccountDetailScreen() {
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ accountId: string }>();

  const [isEditing, setIsEditing] = useState(false);

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const account = useAccountStore((state) =>
    state.accounts.find((item) => item.id === params.accountId),
  );

  const editAccount = useAccountStore((state) => state.editAccount);
  const archiveAccountById = useAccountStore(
    (state) => state.archiveAccountById,
  );

  const movements = useMovementStore((state) => state.movements);
  const transfers = useTransferStore((state) => state.transfers);

  const recentActivity = useMemo<
    Array<
      | {
          id: string;
          type: "movement";
          date: string;
          movement: Movement;
        }
      | {
          id: string;
          type: "transfer";
          date: string;
          transfer: Transfer;
          isOutgoing: boolean;
        }
    >
  >(() => {
    if (!account) {
      return [];
    }

    const movementItems = movements
      .filter((movement) => movement.accountId === account.id)
      .map((movement) => ({
        id: movement.id,
        type: "movement" as const,
        date: movement.date,
        movement,
      }));

    const transferItems = transfers
      .filter(
        (transfer) =>
          transfer.fromAccountId === account.id ||
          transfer.toAccountId === account.id,
      )
      .map((transfer) => ({
        id: transfer.id,
        type: "transfer" as const,
        date: transfer.date,
        transfer,
        isOutgoing: transfer.fromAccountId === account.id,
      }));

    return [...movementItems, ...transferItems]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4);
  }, [account, movements, transfers]);

  if (!account) {
    return (
      <Screen style={styles.screen}>
        <AppCard style={styles.emptyCard}>
          <AppText variant="subtitle" i18nKey="accounts.detail.notFoundTitle" />

          <AppText
            variant="muted"
            i18nKey="accounts.detail.notFoundDescription"
          />
        </AppCard>
      </Screen>
    );
  }

  const handleArchive = () => {
    Alert.alert(
      t("accounts.detail.archiveTitle"),
      t("accounts.detail.archiveDescription"),
      [
        {
          text: t("common.cancel"),
          style: "cancel",
        },
        {
          text: t("accounts.detail.archiveAction"),
          style: "destructive",
          onPress: () => {
            archiveAccountById(account.id);
            router.back();
          },
        },
      ],
    );
  };

  return (
    <Screen style={styles.screen}>
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
        <View style={styles.cardHeader}>
          <AppText variant="subtitle" i18nKey="accounts.detail.information" />
        </View>

        <InfoRow
          labelI18nKey="accounts.detail.type"
          valueI18nKey={`accounts.types.${account.type}.label`}
        />

        <InfoRow
          labelI18nKey="accounts.detail.institution"
          value={account.institutionName || t("common.notAvailable")}
        />

        <InfoRow
          labelI18nKey="accounts.detail.totalEstimated"
          valueI18nKey={
            account.includeInTotalBalance
              ? "accounts.card.includedInTotal"
              : "accounts.card.excludedFromTotal"
          }
        />

        <InfoRow
          labelI18nKey="accounts.detail.priority"
          valueI18nKey={
            account.isPinned
              ? "accounts.detail.pinned"
              : "accounts.detail.normal"
          }
        />
      </AppCard>

      <AppCard style={styles.activityCard}>
        <View style={styles.cardHeader}>
          <AppText
            variant="subtitle"
            i18nKey="accounts.detail.recentActivity"
          />

          <Pressable
            onPress={() => router.push(routes.tabs.movements as never)}
          >
            <AppText
              variant="caption"
              style={{ color: themeColors.primary }}
              i18nKey="home.viewAll"
            />
          </Pressable>
        </View>

        {recentActivity.length > 0 ? (
          <View style={styles.activityList}>
            {recentActivity.map((item) =>
              item.type === "movement" ? (
                <MovementCard
                  key={item.id}
                  movement={item.movement}
                  variant="compact"
                />
              ) : (
                <TransferCard
                  key={item.id}
                  transfer={item.transfer}
                  variant="compact"
                />
              ),
            )}
          </View>
        ) : (
          <AppText variant="muted" i18nKey="accounts.detail.emptyActivity" />
        )}
      </AppCard>

      <AppCard style={styles.actionsCard}>
        <AppText variant="subtitle" i18nKey="accounts.detail.actions" />

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

            <AppText variant="body" i18nKey="accounts.detail.edit" />
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

            <AppText
              variant="body"
              style={{ color: themeColors.expense }}
              i18nKey="accounts.detail.archive"
            />
          </Pressable>
        </View>
      </AppCard>
    </Screen>
  );
}

type InfoRowProps = {
  labelI18nKey: string;
  value?: string;
  valueI18nKey?: string;
};

function InfoRow({ labelI18nKey, value, valueI18nKey }: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <AppText variant="caption" i18nKey={labelI18nKey} />

      {valueI18nKey ? (
        <AppText variant="body" i18nKey={valueI18nKey} />
      ) : (
        <AppText variant="body">{value}</AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: 18,
  },

  emptyCard: {
    gap: 8,
  },

  infoCard: {
    gap: 14,
  },

  activityCard: {
    gap: 14,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
  },

  activityList: {
    gap: 12,
  },

  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
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
