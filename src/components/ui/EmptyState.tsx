import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { AppCard } from "./AppCard";
import { AppText } from "./AppText";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <AppCard style={styles.card}>
      <View style={styles.copy}>
        <AppText variant="subtitle">{title}</AppText>
        <AppText variant="muted">{description}</AppText>
      </View>

      {action}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 18,
  },

  copy: {
    gap: 8,
  },
});
