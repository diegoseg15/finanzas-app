import { Delete } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

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

type MovementNumericKeyboardProps = {
  onKeyPress: (key: CalculatorKey) => void;
};

const keyRows: CalculatorKey[][] = [
  ["C", "%", "÷", "×"],
  ["7", "8", "9", "-"],
  ["4", "5", "6", "+"],
  ["1", "2", "3", "="],
  [".", "0", "back"],
];

const operatorKeys: CalculatorKey[] = ["+", "-", "×", "÷", "="];

export function MovementNumericKeyboard({
  onKeyPress,
}: MovementNumericKeyboardProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <View style={styles.keyboard}>
      {keyRows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => {
            const isOperator = operatorKeys.includes(key);
            const isUtility = key === "C" || key === "%";
            const isZero = key === "0";

            return (
              <Pressable
                key={key}
                onPress={() => onKeyPress(key)}
                style={({ pressed }) => [
                  styles.key,
                  isZero ? styles.zeroKey : null,
                  {
                    backgroundColor: isOperator
                      ? themeColors.primary
                      : isUtility
                        ? themeColors.cardSoft
                        : pressed
                          ? themeColors.cardSoft
                          : "transparent",
                    opacity: pressed ? 0.78 : 1,
                  },
                ]}
              >
                {key === "back" ? (
                  <Delete size={24} color={themeColors.text} />
                ) : (
                  <AppText
                    style={[
                      styles.keyText,
                      {
                        color: isOperator ? "#FFFFFF" : themeColors.text,
                      },
                    ]}
                  >
                    {key}
                  </AppText>
                )}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    gap: 8,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  key: {
    flex: 1,
    height: 54,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  zeroKey: {
    flex: 2.08,
  },

  keyText: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800",
  },
});
