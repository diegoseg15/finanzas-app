import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

export type MovementFormMode = "expense" | "income" | "transfer";

type MovementTypeSelectorProps = {
  value: MovementFormMode;
  canCreateTransfer: boolean;
  onChange: (value: MovementFormMode) => void;
};

const options: {
  value: MovementFormMode;
  labelI18nKey: string;
}[] = [
  { value: "expense", labelI18nKey: "common.expense" },
  { value: "income", labelI18nKey: "common.income" },
  { value: "transfer", labelI18nKey: "common.transfer" },
];

export function MovementTypeSelector({
  value,
  canCreateTransfer,
  onChange,
}: MovementTypeSelectorProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColors.cardSoft,
          borderColor: themeColors.border,
        },
      ]}
    >
      {options.map((option) => {
        const active = option.value === value;
        const disabled = option.value === "transfer" && !canCreateTransfer;

        return (
          <Pressable
            key={option.value}
            disabled={disabled}
            onPress={() => onChange(option.value)}
            style={[
              styles.option,
              {
                backgroundColor: active ? themeColors.primary : "transparent",
                opacity: disabled ? 0.42 : 1,
              },
            ]}
          >
            <AppText
              variant="caption"
              style={[
                styles.optionText,
                {
                  color: active ? "#FFFFFF" : themeColors.textMuted,
                },
              ]}
              i18nKey={option.labelI18nKey}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 999,
    borderWidth: 1,
    padding: 4,
    gap: 4,
  },

  option: {
    flex: 1,
    minHeight: 42,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  optionText: {
    fontWeight: "900",
  },
});
