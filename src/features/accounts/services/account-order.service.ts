import { Account } from "@/types/finance.types";

export function sortAccountsByImportance(accounts: Account[]) {
  return [...accounts].sort((a, b) => {
    const pinnedDifference =
      Number(b.isPinned ?? false) - Number(a.isPinned ?? false);

    if (pinnedDifference !== 0) {
      return pinnedDifference;
    }

    const orderA = a.displayOrder ?? 0;
    const orderB = b.displayOrder ?? 0;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}
