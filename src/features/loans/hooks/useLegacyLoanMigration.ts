import { useEffect } from "react";

import { migrateLegacyLoanAccounts } from "@/features/loans/services/loan-migration.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useLoanStore } from "@/store/useLoanStore";

export function useLegacyLoanMigration() {
  const accounts = useAccountStore((state) => state.accounts);
  const setAccounts = useAccountStore((state) => state.setAccounts);

  const loans = useLoanStore((state) => state.loans);
  const setLoans = useLoanStore((state) => state.setLoans);

  useEffect(() => {
    const result = migrateLegacyLoanAccounts({
      accounts,
      loans,
    });

    if (!result.hasChanges) {
      return;
    }

    setAccounts(result.accounts);
    setLoans(result.loans);
  }, [accounts, loans, setAccounts, setLoans]);
}
