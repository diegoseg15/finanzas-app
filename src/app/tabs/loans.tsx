import { ArrowDownLeft, ArrowUpRight } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { formatMoney } from "@/services/money.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useLoanStore } from "@/store/useLoanStore";
import { Loan } from "@/types/loan.types";

export default function LoansScreen() {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const loans = useLoanStore((state) => state.loans);

  const activeLoans = loans.filter((loan) => loan.status === "active");

  const payableLoans = activeLoans.filter((loan) => loan.kind === "payable");
  const receivableLoans = activeLoans.filter(
    (loan) => loan.kind === "receivable",
  );

  return (
    <Screen style={styles.screen}>
      <View style={styles.header}>
        <AppText variant="title">Préstamos</AppText>

        <AppText variant="muted">
          Gestiona deudas por pagar y dinero por cobrar.
        </AppText>
      </View>

      <LoanSection
        title="Por pagar"
        description="Dinero que debes pagar."
        loans={payableLoans}
        emptyText="No tienes préstamos por pagar."
        iconColor={themeColors.expense}
      />

      <LoanSection
        title="Por cobrar"
        description="Dinero que otras personas deben pagarte."
        loans={receivableLoans}
        emptyText="No tienes préstamos por cobrar."
        iconColor={themeColors.income}
      />
    </Screen>
  );
}

type LoanSectionProps = {
  title: string;
  description: string;
  loans: Loan[];
  emptyText: string;
  iconColor: string;
};

function LoanSection({
  title,
  description,
  loans,
  emptyText,
  iconColor,
}: LoanSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <AppText variant="subtitle">{title}</AppText>

        <AppText variant="caption">{loans.length}</AppText>
      </View>

      <AppText variant="muted">{description}</AppText>

      {loans.length > 0 ? (
        <View style={styles.list}>
          {loans.map((loan) => (
            <LoanCard key={loan.id} loan={loan} iconColor={iconColor} />
          ))}
        </View>
      ) : (
        <AppCard style={styles.emptyCard}>
          <AppText variant="muted">{emptyText}</AppText>
        </AppCard>
      )}
    </View>
  );
}

type LoanCardProps = {
  loan: Loan;
  iconColor: string;
};

function LoanCard({ loan, iconColor }: LoanCardProps) {
  const isPayable = loan.kind === "payable";

  return (
    <AppCard style={styles.loanCard}>
      <View
        style={[
          styles.loanIcon,
          {
            backgroundColor: `${iconColor}22`,
            borderColor: `${iconColor}55`,
          },
        ]}
      >
        {isPayable ? (
          <ArrowUpRight size={18} color={iconColor} />
        ) : (
          <ArrowDownLeft size={18} color={iconColor} />
        )}
      </View>

      <View style={styles.loanCopy}>
        <AppText variant="body" numberOfLines={1}>
          {loan.title}
        </AppText>

        <AppText variant="caption" numberOfLines={1}>
          {loan.personOrEntity || "Sin persona asociada"}
        </AppText>
      </View>

      <View style={styles.loanAmountBox}>
        <AppText variant="caption">Pendiente</AppText>

        <AppText
          variant="body"
          style={[
            styles.loanAmount,
            {
              color: iconColor,
            },
          ]}
          numberOfLines={1}
        >
          {formatMoney({
            amount: loan.remainingAmount,
            currencyCode: loan.currency,
          })}
        </AppText>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: 24,
  },

  header: {
    gap: 6,
  },

  section: {
    gap: 12,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  list: {
    gap: 12,
  },

  loanCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  loanIcon: {
    width: 42,
    height: 42,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loanCopy: {
    flex: 1,
    gap: 2,
  },

  loanAmountBox: {
    alignItems: "flex-end",
    gap: 2,
    maxWidth: 130,
  },

  loanAmount: {
    fontWeight: "900",
  },

  emptyCard: {
    gap: 8,
  },
});
