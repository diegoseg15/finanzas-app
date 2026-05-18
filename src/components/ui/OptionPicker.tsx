import { ChevronDown, X } from "lucide-react-native";
import { ReactNode, useMemo, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, View } from "react-native";

import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { AppText } from "./AppText";

export type OptionPickerItem<TValue extends string> = {
  value: TValue;
  label: string;
  description?: string;
  rightSlot?: ReactNode;
};

type OptionPickerProps<TValue extends string> = {
  label: string;
  value: TValue;
  options: OptionPickerItem<TValue>[];
  placeholder?: string;
  onChange: (value: TValue) => void;
};

export function OptionPicker<TValue extends string>({
  label,
  value,
  options,
  placeholder = "Seleccionar",
  onChange,
}: OptionPickerProps<TValue>) {
  const [isOpen, setIsOpen] = useState(false);

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );

  const handleSelect = (nextValue: TValue) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <AppText variant="caption">{label}</AppText>

      <Pressable
        onPress={() => setIsOpen(true)}
        style={({ pressed }) => [
          styles.trigger,
          {
            backgroundColor: themeColors.cardSoft,
            borderColor: themeColors.border,
            opacity: pressed ? 0.75 : 1,
          },
        ]}
      >
        <View style={styles.triggerCopy}>
          <AppText>{selectedOption?.label ?? placeholder}</AppText>

          {selectedOption?.description ? (
            <AppText variant="caption">{selectedOption.description}</AppText>
          ) : null}
        </View>

        <ChevronDown size={18} color={themeColors.textMuted} />
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.overlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setIsOpen(false)}
          />

          <View
            style={[
              styles.sheet,
              {
                backgroundColor: themeColors.surface,
                borderColor: themeColors.border,
              },
            ]}
          >
            <View style={styles.sheetHeader}>
              <View>
                <AppText variant="subtitle">{label}</AppText>
                <AppText variant="caption">Selecciona una opción</AppText>
              </View>

              <Pressable
                onPress={() => setIsOpen(false)}
                style={styles.closeButton}
              >
                <X size={20} color={themeColors.textMuted} />
              </Pressable>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.optionList}
              renderItem={({ item }) => {
                const selected = item.value === value;

                return (
                  <Pressable
                    onPress={() => handleSelect(item.value)}
                    style={({ pressed }) => [
                      styles.option,
                      {
                        backgroundColor: selected
                          ? themeColors.cardSoft
                          : themeColors.card,
                        borderColor: selected
                          ? themeColors.primary
                          : themeColors.border,
                        opacity: pressed ? 0.75 : 1,
                      },
                    ]}
                  >
                    <View style={styles.optionCopy}>
                      <AppText>{item.label}</AppText>

                      {item.description ? (
                        <AppText variant="caption">{item.description}</AppText>
                      ) : null}
                    </View>

                    {item.rightSlot}
                  </Pressable>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },

  trigger: {
    minHeight: 58,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  triggerCopy: {
    flex: 1,
    gap: 3,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "flex-end",
  },

  sheet: {
    maxHeight: "78%",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    padding: 20,
    gap: 18,
  },

  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },

  closeButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  optionList: {
    gap: 10,
    paddingBottom: 10,
  },

  option: {
    minHeight: 68,
    borderRadius: 20,
    borderWidth: 1,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  optionCopy: {
    flex: 1,
    gap: 4,
  },
});
