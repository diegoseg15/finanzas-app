import { router } from "expo-router";
import { WalletCards } from "lucide-react-native";
import { ScrollView, StyleSheet, View } from "react-native";

import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { routes } from "@/constants/routes";
import { formatMoney } from "@/services/money.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { Account } from "@/types/finance.types";
import { getHomeAccountCardColor } from "../services/account-card-style.service";

import { HomeSectionHeader } from "./HomeSectionHeader";

type HomeAccountsCarouselProps = {
  accounts: Account[];
};

export function HomeAccountsCarousel({ accounts }: HomeAccountsCarouselProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <>
      <View style={styles.accountsSectionIntro}>
        <View
          style={[
            styles.sectionDivider,
            {
              backgroundColor: themeColors.border,
            },
          ]}
        />

        <HomeSectionHeader
          titleI18nKey="home.accounts"
          actionI18nKey="home.viewAll"
          onActionPress={() => router.push(routes.tabs.accounts as never)}
        />
      </View>

      {accounts.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.accountsList}
        >
          {accounts.slice(0, 5).map((account) => {
            const mainBalance = account.balances[0];
            const cardColor = getHomeAccountCardColor(account);

            return (
              <AppCard
                key={account.id}
                style={[
                  styles.accountCard,
                  {
                    backgroundColor: cardColor,
                    borderColor: cardColor,
                  },
                ]}
              >
                <View style={styles.debitCardDecorCircle} />

                <View style={styles.debitCardHeader}>
                  <View style={styles.debitChip}>
                    <WalletCards size={20} color="#FFFFFF" />
                  </View>

                  <AppText style={styles.debitCurrency}>
                    {account.mainCurrency}
                  </AppText>
                </View>

                <View style={styles.debitCardBody}>
                  <AppText style={styles.debitAccountName} numberOfLines={1}>
                    {account.name}
                  </AppText>

                  <AppText
                    style={styles.debitAccountType}
                    numberOfLines={1}
                    i18nKey={`accounts.types.${account.type}.label`}
                  >
                    {account.mainCurrency}
                  </AppText>
                </View>

                <View style={styles.debitCardFooter}>
                  <View style={styles.debitBalanceBox}>
                    <AppText
                      style={styles.debitBalanceLabel}
                      i18nKey="accounts.form.currentBalance"
                    />

                    <AppText style={styles.debitBalance} numberOfLines={1}>
                      {formatMoney({
                        amount: mainBalance?.amount ?? 0,
                        currencyCode:
                          mainBalance?.currency ?? account.mainCurrency,
                      })}
                    </AppText>
                  </View>

                  <AppText style={styles.debitCardNumber}>
                    •••• {account.id.slice(-4).toUpperCase()}
                  </AppText>
                </View>
              </AppCard>
            );
          })}
        </ScrollView>
      ) : (
        <AppCard style={styles.emptyCard}>
          <AppText variant="muted" i18nKey="accounts.emptyDescription" />
        </AppCard>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  accountsSectionIntro: {
    gap: 14,
  },

  sectionDivider: {
    height: 1,
    opacity: 0.55,
    marginVertical: 5,
  },

  accountsList: {
    gap: 14,
    paddingRight: 20,
    paddingBottom: 4,
  },

  accountCard: {
    width: 310,
    height: 190,
    paddingTop: 18,
    paddingBottom: 18,
    paddingHorizontal: 18,
    borderRadius: 28,
    overflow: "hidden",
    justifyContent: "space-between",
  },

  debitCardDecorCircle: {
    position: "absolute",
    right: -42,
    top: -46,
    width: 150,
    height: 150,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.12)",
  },

  debitCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  debitChip: {
    width: 44,
    height: 34,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.22)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)",
    alignItems: "center",
    justifyContent: "center",
  },

  debitCurrency: {
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900",
    letterSpacing: 1,
  },

  debitCardBody: {
    gap: 4,
  },

  debitAccountName: {
    color: "#FFFFFF",
    fontSize: 21,
    lineHeight: 27,
    fontWeight: "900",
    letterSpacing: -0.4,
  },

  debitAccountType: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
  },

  debitCardFooter: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 12,
  },

  debitBalanceBox: {
    flex: 1,
    gap: 3,
  },

  debitBalanceLabel: {
    color: "rgba(255,255,255,0.68)",
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "700",
  },

  debitBalance: {
    color: "#FFFFFF",
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "900",
    letterSpacing: -0.5,
  },

  debitCardNumber: {
    color: "rgba(255,255,255,0.74)",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  emptyCard: {
    gap: 8,
  },
});
