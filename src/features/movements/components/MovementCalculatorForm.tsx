import { X } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { InlineMessage } from "@/components/ui/InlineMessage";
import { colors } from "@/constants/colors";
import { sanitizeMoneyValue } from "@/services/money.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { CurrencyCode } from "@/types/finance.types";

import { MovementAmountDisplay } from "./MovementAmountDisplay";
import { MovementNumericKeyboard } from "./MovementNumericKeyboard";
import { MovementFormMode, MovementTypeSelector } from "./MovementTypeSelector";

type MovementCalculatorFormContinueInput = {
  mode: MovementFormMode;
  amount: number;
};

type MovementCalculatorFormProps = {
  currency: CurrencyCode;
  initialMode?: MovementFormMode;
  onCancel: () => void;
  onContinue: (input: MovementCalculatorFormContinueInput) => void;
};

export function MovementCalculatorForm({
  currency,
  initialMode = "expense",
  onCancel,
  onContinue,
}: MovementCalculatorFormProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const [mode, setMode] = useState<MovementFormMode>(initialMode);
  const [amount, setAmount] = useState("0");

  const parsedAmount = sanitizeMoneyValue(amount);

  const amountError =
    !Number.isFinite(parsedAmount) || parsedAmount <= 0
      ? "Ingresa un monto mayor a 0."
      : undefined;

  const canSubmit = !amountError;

  const handleContinue = () => {
    if (!canSubmit) {
      return;
    }

    onContinue({
      mode,
      amount: parsedAmount,
    });
  };

  return (
    <AppCard style={styles.form}>
      <View style={styles.header}>
        <Pressable onPress={onCancel} style={styles.closeButton}>
          <X size={22} color={themeColors.text} />
        </Pressable>

        <AppText variant="subtitle" i18nKey="movements.newMovement" />

        <View style={styles.closeButton} />
      </View>

      <MovementTypeSelector value={mode} onChange={setMode} />

      <MovementAmountDisplay amount={amount} currency={currency} />

      <View style={styles.quickAmounts}>
        {["10", "50", "100"].map((quickAmount) => (
          <Pressable
            key={quickAmount}
            onPress={() => setAmount(quickAmount)}
            style={({ pressed }) => [
              styles.quickAmountButton,
              {
                backgroundColor: themeColors.cardSoft,
                opacity: pressed ? 0.75 : 1,
              },
            ]}
          >
            <AppText style={styles.quickAmountText}>{quickAmount}</AppText>
          </Pressable>
        ))}
      </View>

      {amountError ? (
        <InlineMessage type="error" message={amountError} />
      ) : null}

      <MovementNumericKeyboard value={amount} onChange={setAmount} />

      <AppButton
        disabled={!canSubmit}
        i18nKey="common.continue"
        onPress={handleContinue}
      />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  closeButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  quickAmounts: {
    flexDirection: "row",
    gap: 10,
  },

  quickAmountButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  quickAmountText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "900",
  },
});
