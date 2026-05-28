import { ChevronDown, X } from "lucide-react-native";
import { ReactNode, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Modal, Pressable, StyleSheet, View } from "react-native";

import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { AppText } from "./AppText";

type I18nValues = Record<string, string | number>;

export type OptionPickerItem<TValue extends string> = {
  value: TValue;
  label?: string;
  labelI18nKey?: string;
  labelI18nValues?: I18nValues;
  description?: string;
  descriptionI18nKey?: string;
  descriptionI18nValues?: I18nValues;
  rightSlot?: ReactNode;
};

type OptionPickerProps<TValue extends string> = {
  label?: string;
  labelI18nKey?: string;
  labelI18nValues?: I18nValues;
  value: TValue;
  options: OptionPickerItem<TValue>[];
  placeholder?: string;
  placeholderI18nKey?: string;
  placeholderI18nValues?: I18nValues;
  modalSubtitle?: string;
  modalSubtitleI18nKey?: string;
  onChange: (value: TValue) => void;
};

export function OptionPicker<TValue extends string>({
  label,
  labelI18nKey,
  labelI18nValues,
  value,
  options,
  placeholder = "Seleccionar",
  placeholderI18nKey,
  placeholderI18nValues,
  modalSubtitle = "Selecciona una opción",
  modalSubtitleI18nKey,
  onChange,
}: OptionPickerProps<TValue>) {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );

  const resolvedLabel = labelI18nKey ? t(labelI18nKey, labelI18nValues) : label;

  const resolvedPlaceholder = placeholderI18nKey
    ? t(placeholderI18nKey, placeholderI18nValues)
    : placeholder;

  const resolvedModalSubtitle = modalSubtitleI18nKey
    ? t(modalSubtitleI18nKey)
    : modalSubtitle;

  const getOptionLabel = (option: OptionPickerItem<TValue>) => {
    return option.labelI18nKey
      ? t(option.labelI18nKey, option.labelI18nValues)
      : option.label;
  };

  const getOptionDescription = (option: OptionPickerItem<TValue>) => {
    return option.descriptionI18nKey
      ? t(option.descriptionI18nKey, option.descriptionI18nValues)
      : option.description;
  };

  const handleSelect = (nextValue: TValue) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      {resolvedLabel ? (
        <AppText variant="caption">{resolvedLabel}</AppText>
      ) : null}

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
          <AppText>
            {selectedOption
              ? getOptionLabel(selectedOption)
              : resolvedPlaceholder}
          </AppText>

          {selectedOption && getOptionDescription(selectedOption) ? (
            <AppText variant="caption">
              {getOptionDescription(selectedOption)}
            </AppText>
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
                {resolvedLabel ? (
                  <AppText variant="subtitle">{resolvedLabel}</AppText>
                ) : null}

                <AppText variant="caption">{resolvedModalSubtitle}</AppText>
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
                const itemLabel = getOptionLabel(item);
                const itemDescription = getOptionDescription(item);

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
                      <AppText>{itemLabel}</AppText>

                      {itemDescription ? (
                        <AppText variant="caption">{itemDescription}</AppText>
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
