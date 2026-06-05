import { WalletCards } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { AppThemeColors, colors } from "@/constants/colors";
import { formatMoney } from "@/services/money.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { Account } from "@/types/finance.types";

import { Eye, EyeOff } from "lucide-react-native";

type DebitAccountCardProps = {
  account: Account;
  compact?: boolean;
  hideBalance?: boolean;
  onPress?: () => void;
};

export function DebitAccountCard({
  account,
  compact = false,
  onPress,
}: DebitAccountCardProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const mainBalance = account.balances[0];
  const cardColor = getDebitAccountCardColor(account, themeColors);

  const institutionName = account.institutionName?.trim();

  const hideBalance = useAppSettingsStore((state) =>
    state.isAccountBalanceHidden(account.id),
  );

  const toggleAccountBalanceVisibility = useAppSettingsStore(
    (state) => state.toggleAccountBalanceVisibility,
  );

  const content = (
    <AppCard
      style={[
        styles.card,
        compact ? styles.compactCard : null,
        {
          backgroundColor: cardColor,
          borderColor: cardColor,
        },
      ]}
    >
      <View style={styles.decorCircle} />

      <View style={styles.header}>
        <View style={styles.chip}>
          <WalletCards size={20} color="#FFFFFF" />
        </View>

        <View style={styles.headerRight}>
          {account.isPinned ? (
            <View style={styles.pinBadge}>
              <AppText style={styles.pinText}>PIN</AppText>
            </View>
          ) : null}

          <AppText style={styles.currency}>{account.mainCurrency}</AppText>
        </View>
      </View>

      <View style={styles.body}>
        <AppText style={styles.accountName} numberOfLines={1}>
          {account.name}
        </AppText>

        <View style={styles.accountMetaRow}>
          <AppText
            style={styles.accountType}
            numberOfLines={1}
            i18nKey={`accounts.types.${account.type}.label`}
          >
            {account.mainCurrency}
          </AppText>

          {institutionName ? (
            <>
              <View style={styles.metaDot} />

              <AppText style={styles.institutionName} numberOfLines={1}>
                {institutionName}
              </AppText>
            </>
          ) : null}
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.balanceBox}>
          <AppText
            style={styles.balanceLabel}
            i18nKey="accounts.card.currentBalance"
          />

          <View style={styles.balanceRow}>
            <AppText style={styles.balance} numberOfLines={1}>
              {formatMoney({
                amount: mainBalance?.amount ?? 0,
                currencyCode: mainBalance?.currency ?? account.mainCurrency,
                hideAmount: hideBalance,
              })}
            </AppText>

            {!onPress ? (
              <Pressable
                onPress={() => toggleAccountBalanceVisibility(account.id)}
                style={styles.cardVisibilityButton}
              >
                {hideBalance ? (
                  <EyeOff size={15} color="#FFFFFF" />
                ) : (
                  <Eye size={15} color="#FFFFFF" />
                )}
              </Pressable>
            ) : null}
          </View>
        </View>

        <AppText style={styles.cardNumber}>
          •••• {account.id.slice(-4).toUpperCase()}
        </AppText>
      </View>
    </AppCard>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.82 : 1,
      })}
    >
      {content}
    </Pressable>
  );
}

function getDebitAccountCardColor(
  account: Account,
  themeColors: AppThemeColors,
) {
  if (account.cardDesign === "blue") {
    return themeColors.accent;
  }

  if (account.cardDesign === "dark") {
    return "#111827";
  }

  if (account.cardDesign === "premium") {
    return themeColors.primary;
  }

  if (account.type === "cash" || account.type === "piggy_bank") {
    return themeColors.accent;
  }

  return account.color || themeColors.primary;
}

const styles = StyleSheet.create({
  card: {
    width: 310,
    height: 190,
    paddingTop: 18,
    paddingBottom: 18,
    paddingHorizontal: 18,
    borderRadius: 28,
    overflow: "hidden",
    justifyContent: "space-between",
  },

  compactCard: {
    width: "100%",
  },

  accountMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.5)",
  },

  decorCircle: {
    position: "absolute",
    right: -42,
    top: -46,
    width: 150,
    height: 150,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.12)",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  chip: {
    width: 44,
    height: 34,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.22)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)",
    alignItems: "center",
    justifyContent: "center",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  pinBadge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.24)",
  },

  pinText: {
    color: "#FFFFFF",
    fontSize: 9,
    lineHeight: 12,
    fontWeight: "900",
    letterSpacing: 0.8,
  },

  currency: {
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900",
    letterSpacing: 1,
  },

  body: {
    gap: 3,
  },

  accountName: {
    color: "#FFFFFF",
    fontSize: 21,
    lineHeight: 27,
    fontWeight: "900",
    letterSpacing: -0.4,
  },

  accountType: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
  },

  institutionName: {
    flex: 1,
    color: "rgba(255,255,255,0.62)",
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "700",
  },

  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  cardVisibilityButton: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },

  footer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 12,
  },

  balanceBox: {
    flex: 1,
    gap: 3,
  },

  balanceLabel: {
    color: "rgba(255,255,255,0.68)",
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "700",
  },

  balance: {
    color: "#FFFFFF",
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "900",
    letterSpacing: -0.5,
  },

  cardNumber: {
    color: "rgba(255,255,255,0.74)",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
});
