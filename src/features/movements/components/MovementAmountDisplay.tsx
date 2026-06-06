import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { getCurrencyByCode } from "@/constants/currencies";
import { CurrencyCode } from "@/types/finance.types";

type MovementAmountDisplayProps = {
  amount: string;
  currency: CurrencyCode;
};

export function MovementAmountDisplay({
  amount,
  currency,
}: MovementAmountDisplayProps) {
  const currencyInfo = getCurrencyByCode(currency);
  const symbol = currencyInfo?.symbol ?? currency;
  const symbolPosition = currencyInfo?.symbolPosition ?? "prefix";

  const safeAmount = amount.length > 0 ? amount : "0";

  return (
    <View style={styles.container}>
      {symbolPosition === "prefix" ? (
        <>
          <AppText style={styles.amount}>{symbol}</AppText>
          <AppText style={styles.amount}>{safeAmount}</AppText>
        </>
      ) : (
        <>
          <AppText style={styles.amount}>{safeAmount}</AppText>
          <AppText style={styles.currencySuffix}>{symbol}</AppText>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  amount: {
    fontSize: 72,
    lineHeight: 82,
    fontWeight: "800",
    letterSpacing: -3,
  },

  currencySuffix: {
    fontSize: 42,
    lineHeight: 52,
    fontWeight: "800",
    opacity: 0.45,
  },
});
