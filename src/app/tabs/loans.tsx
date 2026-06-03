import { ArrowDownLeft, ArrowUpRight } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppFormModal } from "@/components/ui/AppFormModal";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { CreateLoanForm } from "@/features/loans/components/CreateLoanForm";
import { RegisterLoanPaymentForm } from "@/features/loans/components/RegisterLoanPaymentForm";
import { formatMoney } from "@/services/money.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useLoanStore } from "@/store/useLoanStore";
import { Loan } from "@/types/loan.types";

export default function LoansScreen() {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedLoanForPayment, setSelectedLoanForPayment] =
    useState<Loan | null>(null);

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const loans = useLoanStore((state) => state.loans);
  const addLoan = useLoanStore((state) => state.addLoan);
  const registerPayment = useLoanStore((state) => state.registerPayment);

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

      <AppButton onPress={() => setIsCreating(true)} i18nKey="loans.newLoan" />

      <AppFormModal
        visible={isCreating}
        showHeader={false}
        onClose={() => setIsCreating(false)}
      >
        <CreateLoanForm
          onCancel={() => setIsCreating(false)}
          onSubmit={(input) => {
            addLoan(input);
            setIsCreating(false);
          }}
        />
      </AppFormModal>

      <AppFormModal
        visible={Boolean(selectedLoanForPayment)}
        showHeader={false}
        onClose={() => setSelectedLoanForPayment(null)}
      >
        {selectedLoanForPayment ? (
          <RegisterLoanPaymentForm
            loan={selectedLoanForPayment}
            onCancel={() => setSelectedLoanForPayment(null)}
            onSubmit={(input) => {
              registerPayment(selectedLoanForPayment.id, input);
              setSelectedLoanForPayment(null);
            }}
          />
        ) : null}
      </AppFormModal>

      <LoanSection
        title="Por pagar"
        description="Dinero que debes pagar."
        loans={payableLoans}
        emptyText="No tienes préstamos por pagar."
        iconColor={themeColors.expense}
        onRegisterPayment={setSelectedLoanForPayment}
      />

      <LoanSection
        title="Por cobrar"
        description="Dinero que otras personas deben pagarte."
        loans={receivableLoans}
        emptyText="No tienes préstamos por cobrar."
        iconColor={themeColors.income}
        onRegisterPayment={setSelectedLoanForPayment}
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
  onRegisterPayment: (loan: Loan) => void;
};

function LoanSection({
  title,
  description,
  loans,
  emptyText,
  iconColor,
  onRegisterPayment,
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
            <LoanCard
              key={loan.id}
              loan={loan}
              iconColor={iconColor}
              onRegisterPayment={onRegisterPayment}
            />
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
  onRegisterPayment: (loan: Loan) => void;
};

function LoanCard({ loan, iconColor, onRegisterPayment }: LoanCardProps) {
  const isPayable = loan.kind === "payable";

  const paidAmount = Math.max(loan.originalAmount - loan.remainingAmount, 0);

  const progress =
    loan.originalAmount > 0 ? Math.min(paidAmount / loan.originalAmount, 1) : 0;

  const progressPercentage = Math.round(progress * 100);

  return (
    <AppCard style={styles.loanCard}>
      <View style={styles.loanTopRow}>
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
      </View>

      <View style={styles.progressBlock}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progressPercentage}%` as `${number}%`,
                backgroundColor: iconColor,
              },
            ]}
          />
        </View>

        <View style={styles.paymentMeta}>
          <AppText variant="caption">
            {formatMoney({
              amount: paidAmount,
              currencyCode: loan.currency,
            })}{" "}
            pagado
          </AppText>

          <AppText variant="caption">{progressPercentage}%</AppText>
        </View>
      </View>

      <AppButton
        variant="secondary"
        onPress={() => onRegisterPayment(loan)}
        i18nKey={isPayable ? "loans.payment.pay" : "loans.payment.collect"}
      />
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
    gap: 14,
  },

  loanTopRow: {
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

  progressBlock: {
    gap: 8,
  },

  progressTrack: {
    height: 8,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "rgba(120,120,120,0.18)",
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
  },

  paymentMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  emptyCard: {
    gap: 8,
  },
});
