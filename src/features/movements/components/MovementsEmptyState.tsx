import { AppButton } from "@/components/ui/AppButton";
import { EmptyState } from "@/components/ui/EmptyState";

type MovementsEmptyStateProps = {
  hasActiveAccounts: boolean;
  hasTimelineItems: boolean;
  isCreating: boolean;
  onCreateMovement: () => void;
};

export function MovementsEmptyState({
  hasActiveAccounts,
  hasTimelineItems,
  isCreating,
  onCreateMovement,
}: MovementsEmptyStateProps) {
  if (!hasActiveAccounts) {
    return (
      <EmptyState
        titleI18nKey="movements.firstCreateAccountTitle"
        descriptionI18nKey="movements.firstCreateAccountDescription"
      />
    );
  }

  if (!hasTimelineItems && !isCreating) {
    return (
      <EmptyState
        titleI18nKey="movements.emptyTitle"
        descriptionI18nKey="movements.emptyDescription"
        action={
          <AppButton
            onPress={onCreateMovement}
            i18nKey="movements.registerMovement"
          />
        }
      />
    );
  }

  return null;
}
