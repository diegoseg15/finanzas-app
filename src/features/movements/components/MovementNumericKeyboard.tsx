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

const keys: CalculatorKey[] = [
  "C",
  "%",
  "÷",
  "×",
  "7",
  "8",
  "9",
  "-",
  "4",
  "5",
  "6",
  "+",
  "1",
  "2",
  "3",
  "=",
  ".",
  "0",
  "back",
];

const operatorKeys: CalculatorKey[] = ["+", "-", "×", "÷", "="];

export function MovementNumericKeyboard({
  onKeyPress,
}: MovementNumericKeyboardProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <View style={styles.keyboard}>
      {keys.map((key) => {
        const isOperator = operatorKeys.includes(key);
        const isUtility = key === "C" || key === "%";

        return (
          <Pressable
            key={key}
            onPress={() => onKeyPress(key)}
            style={({ pressed }) => [
              styles.key,
              key === "0" ? styles.zeroKey : null,
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
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  key: {
    width: "22.6%",
    height: 58,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  zeroKey: {
    width: "48%",
  },

  keyText: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "800",
  },
});
