import { colors } from "@/constants/colors";
import { Account } from "@/types/finance.types";

export function getHomeAccountCardColor(account: Account) {
  if (account.color) {
    return account.color;
  }

  switch (account.type) {
    case "cash":
    case "piggy_bank":
      return colors.dark.accent;

    case "credit_card":
    case "loan_payable":
      return colors.dark.expense;

    case "loan_receivable":
      return colors.dark.income;

    case "crypto_wallet":
    case "crypto_exchange":
      return colors.dark.primary;

    case "bank":
    case "custom":
    default:
      return colors.dark.primary;
  }
}
