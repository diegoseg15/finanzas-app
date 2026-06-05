import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

import { AccountViewMode } from "../types/account-view-mode.types";

type AccountModeSelectorProps = {
  value: AccountViewMode;
  onChange: (value: AccountViewMode) => void;
};

export function AccountModeSelector({
  value,
  onChange,
}: AccountModeSelectorProps) {
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <View
      style={[
        styles.segmentedControl,
        {
          backgroundColor: themeColors.cardSoft,
          borderColor: themeColors.border,
        },
      ]}
    >
      <AccountModeButton
        label={t("accounts.groups.regular")}
        isActive={value === "regular"}
        onPress={() => onChange("regular")}
      />

      <AccountModeButton
        label={t("accounts.groups.crypto")}
        isActive={value === "crypto"}
        onPress={() => onChange("crypto")}
      />
    </View>
  );
}

type AccountModeButtonProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

function AccountModeButton({
  label,
  isActive,
  onPress,
}: AccountModeButtonProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.segmentedButton,
        {
          backgroundColor: isActive ? themeColors.primary : "transparent",
        },
      ]}
    >
      <AppText
        variant="caption"
        style={[
          styles.segmentedButtonText,
          {
            color: isActive ? "#FFFFFF" : themeColors.textMuted,
          },
        ]}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  segmentedControl: {
    flexDirection: "row",
    borderRadius: 22,
    borderWidth: 1,
    padding: 4,
    gap: 4,
  },

  segmentedButton: {
    flex: 1,
    minHeight: 42,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },

  segmentedButtonText: {
    fontWeight: "900",
  },
});
