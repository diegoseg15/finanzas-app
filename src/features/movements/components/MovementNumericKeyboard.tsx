import { Delete } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

type MovementNumericKeyboardProps = {
  value: string;
  onChange: (value: string) => void;
};

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "back"];

export function MovementNumericKeyboard({
  value,
  onChange,
}: MovementNumericKeyboardProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const handlePress = (key: string) => {
    if (key === "back") {
      onChange(value.slice(0, -1));
      return;
    }

    if (key === "." && value.includes(".")) {
      return;
    }

    if (value === "0" && key !== ".") {
      onChange(key);
      return;
    }

    const nextValue = `${value}${key}`;

    const [, decimals] = nextValue.split(".");

    if (decimals && decimals.length > 2) {
      return;
    }

    onChange(nextValue);
  };

  return (
    <View style={styles.keyboard}>
      {keys.map((key) => (
        <Pressable
          key={key}
          onPress={() => handlePress(key)}
          style={({ pressed }) => [
            styles.key,
            {
              backgroundColor: pressed ? themeColors.cardSoft : "transparent",
            },
          ]}
        >
          {key === "back" ? (
            <Delete size={26} color={themeColors.text} />
          ) : (
            <AppText style={styles.keyText}>{key}</AppText>
          )}
        </Pressable>
      ))}
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
    width: "30.6%",
    height: 64,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },

  keyText: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "700",
  },
});
