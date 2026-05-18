import { StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { PremiumBadge } from "@/components/ui/PremiumBadge";

type PlanLimitNoticeProps = {
  title: string;
  description: string;
  onUpgrade: () => void;
};

export function PlanLimitNotice({
  title,
  description,
  onUpgrade,
}: PlanLimitNoticeProps) {
  return (
    <AppCard style={styles.card}>
      <View style={styles.header}>
        <PremiumBadge />
        <AppText variant="subtitle">{title}</AppText>
      </View>

      <AppText variant="muted">{description}</AppText>

      <AppButton onPress={onUpgrade}>Desbloquear con Plus</AppButton>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 16,
  },

  header: {
    gap: 10,
  },
});
