import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { currencies, getCurrencyNameI18nKey } from "@/constants/currencies";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { CurrencyCode } from "@/types/finance.types";
import { useTranslation } from "react-i18next";

export function SettingsCurrencyPicker({ onSelect }: { onSelect: () => void }) {
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const mainCurrency = useAppSettingsStore((state) => state.mainCurrency);
  const setMainCurrency = useAppSettingsStore((state) => state.setMainCurrency);

  return (
    <View style={styles.currencyList}>
      {currencies.map((currency) => {
        const isSelected = currency.code === mainCurrency;

        return (
          <Pressable
            key={currency.code}
            onPress={() => {
              setMainCurrency(currency.code as CurrencyCode);
              onSelect();
            }}
            style={({ pressed }) => [
              styles.currencyOption,
              {
                backgroundColor: isSelected
                  ? themeColors.accentSoft
                  : themeColors.card,
                borderColor: isSelected
                  ? themeColors.primary
                  : themeColors.border,
                opacity: pressed ? 0.78 : 1,
              },
            ]}
          >
            <View style={styles.currencyCopy}>
              <AppText variant="body">
                {currency.code} ·{" "}
                {t(getCurrencyNameI18nKey(currency.code), {
                  defaultValue: currency.name,
                })}
              </AppText>

              <AppText variant="caption">
                {currency.symbol}
                {currency.type === "crypto" ? " · Crypto" : " · Fiat"}
              </AppText>
            </View>

            {isSelected ? (
              <AppText
                variant="caption"
                style={{
                  color: themeColors.primary,
                  fontWeight: "900",
                }}
              >
                Activa
              </AppText>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  currencyList: {
    gap: 10,
  },

  currencyOption: {
    minHeight: 62,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  currencyCopy: {
    flex: 1,
    gap: 3,
  },
});
