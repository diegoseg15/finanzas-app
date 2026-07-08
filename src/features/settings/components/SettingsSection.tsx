import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";

export function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.section}>
      <AppText variant="subtitle">{title}</AppText>

      <AppCard style={styles.sectionCard}>{children}</AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 10,
  },

  sectionCard: {
    paddingVertical: 6,
    gap: 2,
  },
});
