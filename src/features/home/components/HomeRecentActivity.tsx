import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { routes } from "@/constants/routes";
import { MovementCard } from "@/features/movements/components/MovementCard";
import { Movement, Transfer } from "@/types/finance.types";

import { HomeSectionHeader } from "./HomeSectionHeader";

import { TransferCard } from "@/features/transfers/components/TransferCard";

type HomeRecentActivityProps = {
  movements: Movement[];
  transfers: Transfer[];
  limit?: number;
};

type HomeRecentActivityItem =
  | {
      id: string;
      type: "movement";
      date: string;
      movement: Movement;
    }
  | {
      id: string;
      type: "transfer";
      date: string;
      transfer: Transfer;
    };

export function HomeRecentActivity({
  movements,
  transfers,
  limit = 4,
}: HomeRecentActivityProps) {
  const items: HomeRecentActivityItem[] = [
    ...movements.map((movement) => ({
      id: movement.id,
      type: "movement" as const,
      date: movement.date,
      movement,
    })),
    ...transfers.map((transfer) => ({
      id: transfer.id,
      type: "transfer" as const,
      date: transfer.date,
      transfer,
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  return (
    <>
      <HomeSectionHeader
        titleI18nKey="home.recentActivity"
        actionI18nKey="home.viewAll"
        onActionPress={() => router.push(routes.tabs.movements as never)}
      />

      {items.length > 0 ? (
        <View style={styles.list}>
          {items.map((item) =>
            item.type === "movement" ? (
              <MovementCard
                key={item.id}
                movement={item.movement}
                variant="compact"
              />
            ) : (
              <TransferCard
                key={item.id}
                transfer={item.transfer}
                variant="compact"
              />
            ),
          )}
        </View>
      ) : (
        <AppCard style={styles.emptyCard}>
          <AppText variant="muted" i18nKey="home.noActivity" />
        </AppCard>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
  },

  emptyCard: {
    gap: 8,
  },
});
