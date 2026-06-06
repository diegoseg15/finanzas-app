import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";
import { InlineMessage } from "@/components/ui/InlineMessage";
import { OptionPicker } from "@/components/ui/OptionPicker";
import { getCategoriesByType } from "@/constants/categories";
import { colors } from "@/constants/colors";
import { formatMoney } from "@/services/money.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import {
    Account,
    CreateMovementInput,
    MovementKind,
} from "@/types/finance.types";

import { X } from "lucide-react-native";

type MovementDetailsStepProps = {
  kind: MovementKind;
  amount: number;
  accounts: Account[];
  onBack: () => void;
  onCancel: () => void;
  onSubmit: (input: CreateMovementInput) => void;
};

export function MovementDetailsStep({
  kind,
  amount,
  accounts,
  onBack,
  onCancel,
  onSubmit,
}: MovementDetailsStepProps) {
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const mainCurrency = useAppSettingsStore((state) => state.mainCurrency);

  const [accountId, setAccountId] = useState(accounts[0]?.id ?? "");
  const [categoryId, setCategoryId] = useState("");
  const [note, setNote] = useState("");

  const selectedAccount = useMemo(
    () => accounts.find((account) => account.id === accountId),
    [accounts, accountId],
  );

  const categories = useMemo(() => getCategoriesByType(kind), [kind]);

  const selectedCurrency = selectedAccount?.mainCurrency ?? mainCurrency;

  const canSubmit = Boolean(accountId && categoryId && amount > 0);

  const errorMessage = !accountId
    ? t("movements.form.accountRequired")
    : !categoryId
      ? t("movements.form.categoryRequired")
      : undefined;

  const handleSubmit = () => {
    if (!canSubmit || !selectedAccount) {
      return;
    }

    onSubmit({
      kind,
      amount,
      currency: selectedCurrency,
      accountId,
      categoryId,
      tagIds: [],
      note: note.trim() || undefined,
      status: "confirmed",
      date: new Date().toISOString(),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.closeButton} />

        <AppText
          variant="subtitle"
          i18nKey={
            kind === "income" ? "movements.newIncome" : "movements.newExpense"
          }
        />

        <Pressable onPress={onCancel} style={styles.closeButton}>
          <X size={22} color={themeColors.text} />
        </Pressable>
      </View>
      <View
        style={[
          styles.fixedSummary,
          {
            backgroundColor: themeColors.card,
            borderColor: themeColors.border,
          },
        ]}
      >
        <AppText variant="caption" i18nKey="movements.form.amount" />

        <AppText variant="title">
          {formatMoney({
            amount,
            currencyCode: selectedCurrency,
          })}
        </AppText>
      </View>

      <OptionPicker
        labelI18nKey="movements.form.account"
        placeholderI18nKey="common.select"
        value={accountId}
        options={accounts.map((account) => ({
          value: account.id,
          label: account.name,
          description: account.institutionName || account.mainCurrency,
        }))}
        onChange={setAccountId}
      />

      <OptionPicker
        labelI18nKey="movements.form.category"
        placeholderI18nKey="common.select"
        value={categoryId}
        options={categories.map((category) => ({
          value: category.id,
          labelI18nKey: category.labelI18nKey,
          description: category.name,
        }))}
        onChange={setCategoryId}
      />

      <View style={styles.field}>
        <AppText variant="caption" i18nKey="common.note" />

        <TextInput
          value={note}
          onChangeText={setNote}
          multiline
          placeholder={t("movements.form.notePlaceholder")}
          placeholderTextColor={themeColors.textMuted}
          style={[
            styles.input,
            styles.textArea,
            {
              backgroundColor: themeColors.cardSoft,
              borderColor: themeColors.border,
              color: themeColors.text,
            },
          ]}
        />
      </View>

      {errorMessage ? (
        <InlineMessage type="error" message={errorMessage} />
      ) : null}

      <View style={styles.actions}>
        <AppButton variant="secondary" onPress={onBack} i18nKey="common.back" />

        <AppButton
          disabled={!canSubmit}
          onPress={handleSubmit}
          i18nKey="movements.saveMovement"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  closeButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  fixedSummary: {
    borderWidth: 1,
    borderRadius: 22,
    alignItems: "center",
    gap: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  field: {
    gap: 8,
  },

  input: {
    minHeight: 54,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "600",
  },

  textArea: {
    minHeight: 78,
    paddingTop: 14,
    textAlignVertical: "top",
  },

  actions: {
    gap: 10,
  },
});
