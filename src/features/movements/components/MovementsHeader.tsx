import { StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";

type MovementsHeaderProps = {
  isCreating: boolean;
  hasActiveAccounts: boolean;
  canCreateMoreMovements: boolean;
  canCreateTransfer: boolean;
  hasTimelineItems: boolean;
  remainingFreeMovements: number | null;
  onCreateMovement: () => void;
  onCreateTransfer: () => void;
};

export function MovementsHeader({
  isCreating,
  hasActiveAccounts,
  canCreateMoreMovements,
  canCreateTransfer,
  hasTimelineItems,
  remainingFreeMovements,
  onCreateMovement,
  onCreateTransfer,
}: MovementsHeaderProps) {
  const shouldShowActions =
    !isCreating &&
    hasActiveAccounts &&
    canCreateMoreMovements &&
    hasTimelineItems;

  return (
    <View style={styles.header}>
      <View style={styles.copy}>
        <AppText variant="title" i18nKey="movements.title" />

        <AppText variant="muted" i18nKey="movements.description" />

        {remainingFreeMovements !== null ? (
          <AppText
            variant="caption"
            i18nKey="movements.freePlanRemaining"
            i18nValues={{ count: remainingFreeMovements }}
          />
        ) : (
          <AppText variant="caption" i18nKey="movements.plusPlanUnlimited" />
        )}
      </View>

      {shouldShowActions ? (
        <View style={styles.actionGrid}>
          <AppButton
            onPress={onCreateMovement}
            i18nKey="movements.newMovement"
          />

          <AppButton
            variant="secondary"
            onPress={onCreateTransfer}
            disabled={!canCreateTransfer}
            i18nKey="movements.newTransfer"
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 18,
  },

  copy: {
    gap: 8,
  },

  actionGrid: {
    gap: 10,
  },
});
