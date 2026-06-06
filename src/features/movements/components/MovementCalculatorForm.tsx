import { X } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { InlineMessage } from "@/components/ui/InlineMessage";
import { colors } from "@/constants/colors";
import {
  CalculatorOperator,
  clearCalculator,
  initialCalculatorState,
  inputBackspace,
  inputDecimal,
  inputDigit,
  inputEquals,
  inputOperator,
  inputPercentage,
} from "@/features/movements/services/calculator.service";
import { sanitizeMoneyValue } from "@/services/money.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import {
  Account,
  CreateMovementInput,
  CurrencyCode,
  MovementKind,
} from "@/types/finance.types";

import { MovementAmountDisplay } from "./MovementAmountDisplay";
import { MovementDetailsStep } from "./MovementDetailsStep";
import { MovementNumericKeyboard } from "./MovementNumericKeyboard";
import { MovementFormMode, MovementTypeSelector } from "./MovementTypeSelector";

type CalculatorKey =
  | "C"
  | "%"
  | "÷"
  | "×"
  | "7"
  | "8"
  | "9"
  | "-"
  | "4"
  | "5"
  | "6"
  | "+"
  | "1"
  | "2"
  | "3"
  | "="
  | "."
  | "0"
  | "back";

type MovementCalculatorFormProps = {
  currency: CurrencyCode;
  accounts: Account[];
  initialMode?: MovementFormMode;
  onCancel: () => void;
  onSubmitMovement: (input: CreateMovementInput) => void;
};

export function MovementCalculatorForm({
  currency,
  accounts,
  initialMode = "expense",
  onCancel,
  onSubmitMovement,
}: MovementCalculatorFormProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const [mode, setMode] = useState<MovementFormMode>(initialMode);
  const [calculatorState, setCalculatorState] = useState(
    initialCalculatorState,
  );

  const [detailsInput, setDetailsInput] = useState<{
    kind: MovementKind;
    amount: number;
  } | null>(null);

  const amount = calculatorState.displayValue;
  const parsedAmount = sanitizeMoneyValue(amount);

  const amountError =
    !Number.isFinite(parsedAmount) || parsedAmount <= 0
      ? "Ingresa un monto mayor a 0."
      : undefined;

  const canSubmit = !amountError;

  const handleKeyPress = (key: CalculatorKey) => {
    if (/^\d$/.test(key)) {
      setCalculatorState((currentState) => inputDigit(currentState, key));
      return;
    }

    if (key === ".") {
      setCalculatorState((currentState) => inputDecimal(currentState));
      return;
    }

    if (key === "back") {
      setCalculatorState((currentState) => inputBackspace(currentState));
      return;
    }

    if (key === "C") {
      setCalculatorState(clearCalculator());
      return;
    }

    if (key === "%") {
      setCalculatorState((currentState) => inputPercentage(currentState));
      return;
    }

    if (key === "=") {
      setCalculatorState((currentState) => inputEquals(currentState));
      return;
    }

    setCalculatorState((currentState) =>
      inputOperator(currentState, key as CalculatorOperator),
    );
  };

  const handleContinue = () => {
    if (!canSubmit) {
      return;
    }

    if (mode === "transfer") {
      return;
    }

    setDetailsInput({
      kind: mode,
      amount: parsedAmount,
    });
  };

  const calculationPreview =
    calculatorState.operator && calculatorState.storedValue !== null
      ? calculatorState.waitingForOperand
        ? `${calculatorState.storedValue} ${calculatorState.operator}`
        : `${calculatorState.storedValue} ${calculatorState.operator} ${calculatorState.displayValue}`
      : undefined;

  if (detailsInput) {
    return (
      <AppCard style={styles.form}>
        <MovementDetailsStep
          kind={detailsInput.kind}
          amount={detailsInput.amount}
          accounts={accounts}
          onBack={() => setDetailsInput(null)}
          onCancel={onCancel}
          onSubmit={onSubmitMovement}
        />
      </AppCard>
    );
  }

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

      <View style={styles.calculationMeta}>
        {calculationPreview ? (
          <AppText style={styles.calculationText} numberOfLines={1}>
            {calculationPreview}
          </AppText>
        ) : (
          <AppText
            variant="caption"
            style={styles.calculationPlaceholder}
            i18nKey="movements.calculatorAmount"
          />
        )}
      </View>

      <MovementAmountDisplay amount={amount} currency={currency} />

      <View style={styles.quickAmounts}>
        {["10", "50", "100"].map((quickAmount) => (
          <Pressable
            key={quickAmount}
            onPress={() =>
              setCalculatorState({
                ...initialCalculatorState,
                displayValue: quickAmount,
              })
            }
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

      <MovementNumericKeyboard onKeyPress={handleKeyPress} />

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
    gap: 18,
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

  calculationMeta: {
    minHeight: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },

  calculationText: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "800",
    opacity: 0.72,
    textAlign: "center",
  },

  calculationPlaceholder: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
    textAlign: "center",
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
