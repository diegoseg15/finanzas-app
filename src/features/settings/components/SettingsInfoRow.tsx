import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";

export function SettingsInfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <AppText variant="caption">{label}</AppText>
      <AppText variant="body">{value}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  infoRow: {
    gap: 4,
  },
});
