import { StyleSheet, View } from "react-native";

import { MovementCard } from "@/features/movements/components/MovementCard";
import { TransferCard } from "@/features/transfers/components/TransferCard";
import { Movement, Transfer } from "@/types/finance.types";

type TimelineItem =
  | {
      id: string;
      type: "movement";
      date: string;
      data: Movement;
    }
  | {
      id: string;
      type: "transfer";
      date: string;
      data: Transfer;
    };

type MovementsTimelineListProps = {
  items: TimelineItem[];
  onEditMovement: (movement: Movement) => void;
  onEditTransfer: (transfer: Transfer) => void;
  onDeleteMovement: (movementId: string) => void;
  onDeleteTransfer: (transferId: string) => void;
};

export function MovementsTimelineList({
  items,
  onEditMovement,
  onEditTransfer,
  onDeleteMovement,
  onDeleteTransfer,
}: MovementsTimelineListProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.list}>
      {items.map((item) =>
        item.type === "movement" ? (
          <MovementCard
            key={item.id}
            movement={item.data}
            onEdit={() => onEditMovement(item.data)}
            onDelete={() => onDeleteMovement(item.data.id)}
          />
        ) : (
          <TransferCard
            key={item.id}
            transfer={item.data}
            onEdit={() => onEditTransfer(item.data)}
            onDelete={() => onDeleteTransfer(item.data.id)}
          />
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 14,
  },
});
