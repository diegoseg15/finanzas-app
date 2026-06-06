import { Search, X } from "lucide-react-native";
import { ReactNode, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from "react-native";

import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { AppText } from "./AppText";

type SearchableModalPickerItem<TValue extends string> = {
  value: TValue;
  label: string;
  description?: string;
  searchText?: string;
  rightSlot?: ReactNode;
};

type SearchableModalPickerProps<TValue extends string> = {
  labelI18nKey: string;
  placeholderI18nKey?: string;
  modalTitleI18nKey?: string;
  searchPlaceholderI18nKey?: string;
  value: TValue;
  options: SearchableModalPickerItem<TValue>[];
  onChange: (value: TValue) => void;
};

export function SearchableModalPicker<TValue extends string>({
  labelI18nKey,
  placeholderI18nKey = "common.select",
  modalTitleI18nKey,
  searchPlaceholderI18nKey = "common.search",
  value,
  options,
  onChange,
}: SearchableModalPickerProps<TValue>) {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return options;
    }

    return options.filter((option) => {
      const searchableText = [
        option.label,
        option.description,
        option.searchText,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [options, query]);

  const handleSelect = (nextValue: TValue) => {
    onChange(nextValue);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <View style={styles.container}>
      <AppText variant="caption" i18nKey={labelI18nKey} />

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
          <AppText>{selectedOption?.label ?? t(placeholderI18nKey)}</AppText>

          {selectedOption?.description ? (
            <AppText variant="caption">{selectedOption.description}</AppText>
          ) : null}
        </View>
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
              <View style={styles.sheetHeaderCopy}>
                <AppText
                  variant="subtitle"
                  i18nKey={modalTitleI18nKey ?? labelI18nKey}
                />

                <AppText variant="caption" i18nKey={labelI18nKey} />
              </View>

              <Pressable
                onPress={() => setIsOpen(false)}
                style={styles.closeButton}
              >
                <X size={20} color={themeColors.textMuted} />
              </Pressable>
            </View>

            <View
              style={[
                styles.searchBox,
                {
                  backgroundColor: themeColors.cardSoft,
                  borderColor: themeColors.border,
                },
              ]}
            >
              <Search size={18} color={themeColors.textMuted} />

              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder={t(searchPlaceholderI18nKey)}
                placeholderTextColor={themeColors.textMuted}
                style={[
                  styles.searchInput,
                  {
                    color: themeColors.text,
                  },
                ]}
              />
            </View>

            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.optionList}
              ListEmptyComponent={
                <View style={styles.empty}>
                  <AppText variant="muted" i18nKey="common.noData" />
                </View>
              }
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
    justifyContent: "center",
  },

  triggerCopy: {
    gap: 3,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "flex-end",
  },

  sheet: {
    maxHeight: "82%",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    padding: 20,
    gap: 16,
  },

  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },

  sheetHeaderCopy: {
    flex: 1,
    gap: 3,
  },

  closeButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  searchBox: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
  },

  optionList: {
    gap: 10,
    paddingBottom: 10,
  },

  option: {
    minHeight: 66,
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

  empty: {
    paddingVertical: 24,
    alignItems: "center",
  },
});
