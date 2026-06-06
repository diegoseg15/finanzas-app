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
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  amount: {
    fontSize: 54,
    lineHeight: 62,
    fontWeight: "800",
    letterSpacing: -2,
  },

  currencySuffix: {
    fontSize: 34,
    lineHeight: 42,
    fontWeight: "800",
    opacity: 0.45,
  },
});
