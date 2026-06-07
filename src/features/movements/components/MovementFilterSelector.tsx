import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

import { MovementFilter } from "../types/movement-filter.types";

type MovementFilterSelectorProps = {
  value: MovementFilter;
  onChange: (value: MovementFilter) => void;
};

const options: {
  value: MovementFilter;
  labelI18nKey: string;
}[] = [
  {
    value: "all",
    labelI18nKey: "common.total",
  },
  {
    value: "income",
    labelI18nKey: "common.income",
  },
  {
    value: "expense",
    labelI18nKey: "common.expense",
  },
  {
    value: "transfer",
    labelI18nKey: "common.transfer",
  },
];

export function MovementFilterSelector({
  value,
  onChange,
}: MovementFilterSelectorProps) {
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

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[
              styles.option,
              {
                backgroundColor: active ? themeColors.primary : "transparent",
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
    borderRadius: 22,
    borderWidth: 1,
    padding: 4,
    gap: 2,
  },

  option: {
    flex: 1,
    minHeight: 38,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  optionText: {
    fontWeight: "900",
    fontSize: 11,
  },
});
