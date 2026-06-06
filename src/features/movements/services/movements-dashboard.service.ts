import { Movement, Transfer } from "@/types/finance.types";

import { MovementFilter } from "../types/movement-filter.types";

export type MovementTimelineItem =
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

type BuildMovementTimelineInput = {
  movements: Movement[];
  transfers: Transfer[];
  filter: MovementFilter;
};

export function buildMovementTimeline({
  movements,
  transfers,
  filter,
}: BuildMovementTimelineInput): MovementTimelineItem[] {
  const movementItems = movements
    .filter((movement) => {
      if (filter === "all") {
        return true;
      }

      if (filter === "transfer") {
        return false;
      }

      return movement.kind === filter;
    })
    .map((movement) => ({
      id: movement.id,
      type: "movement" as const,
      date: movement.date,
      data: movement,
    }));

  const transferItems =
    filter === "all" || filter === "transfer"
      ? transfers.map((transfer) => ({
          id: transfer.id,
          type: "transfer" as const,
          date: transfer.date,
          data: transfer,
        }))
      : [];

  return [...movementItems, ...transferItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
