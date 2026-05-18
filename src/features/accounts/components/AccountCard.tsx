import { WalletCards } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { getAccountTypeOption } from "@/constants/accountTypes";
import { colors } from "@/constants/colors";
import { formatMoney } from "@/services/money.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { Account } from "@/types/finance.types";

type AccountCardProps = {
  account: Account;
  onEdit?: () => void;
};

export function AccountCard({ account, onEdit }: AccountCardProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const accountType = getAccountTypeOption(account.type);
  const mainBalance = account.balances[0];

  return (
    <AppCard style={styles.card}>
      <View style={styles.header}>
        <View
          style={[
            styles.iconBox,
            {
              backgroundColor: account.color,
            },
          ]}
        >
          <WalletCards size={20} color="#FFFFFF" />
        </View>

        <View style={styles.titleBox}>
          <AppText variant="body">{account.name}</AppText>
          <AppText variant="caption">
            {accountType?.label ?? "Cuenta personalizada"}
          </AppText>
        </View>
      </View>

      <View style={styles.balanceBox}>
        <AppText variant="caption">Saldo actual</AppText>
        <AppText variant="subtitle" style={{ color: themeColors.text }}>
          {formatMoney({
            amount: mainBalance?.amount ?? 0,
            currencyCode: mainBalance?.currency ?? account.mainCurrency,
          })}
        </AppText>
      </View>

      <AppText variant="caption">
        {account.includeInTotalBalance
          ? "Incluida en patrimonio total"
          : "Separada del patrimonio total"}
      </AppText>

      {onEdit ? (
        <AppButton variant="ghost" onPress={onEdit} style={styles.editButton}>
          Editar
        </AppButton>
      ) : null}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  titleBox: {
    flex: 1,
  },

  balanceBox: {
    gap: 4,
  },

  editButton: {
    minHeight: 42,
  },
});
