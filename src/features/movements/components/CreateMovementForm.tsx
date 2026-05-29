import { Trash2, X } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { InlineMessage } from "@/components/ui/InlineMessage";
import { OptionPicker } from "@/components/ui/OptionPicker";
import { getCategoriesByMovementKind } from "@/constants/categories";
import { colors } from "@/constants/colors";
import { tags } from "@/constants/tags";
import { sanitizeMoneyValue } from "@/services/money.service";
import {
  getAccountBalanceByCurrency,
  validatePositiveAmount,
} from "@/services/validation.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import {
  Account,
  CreateMovementInput,
  MovementKind,
} from "@/types/finance.types";

type CreateMovementFormProps = {
  accounts: Account[];
  initialMovement?: {
    kind: MovementKind;
    amount: number;
    accountId: string;
    categoryId: string;
    tagIds: string[];
    note?: string;
  };
  submitLabel?: string;
  submitLabelI18nKey?: string;
  onSubmit: (input: CreateMovementInput) => void;
  onCancel: () => void;
};

export function CreateMovementForm({
  accounts,
  initialMovement,
  submitLabel,
  submitLabelI18nKey,
  onSubmit,
  onCancel,
}: CreateMovementFormProps) {
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const [kind, setKind] = useState<MovementKind>(
    initialMovement?.kind ?? "expense",
  );

  const [amount, setAmount] = useState(
    initialMovement?.amount ? String(initialMovement.amount) : "",
  );

  const [accountId, setAccountId] = useState(
    initialMovement?.accountId ?? accounts[0]?.id ?? "",
  );

  const [categoryId, setCategoryId] = useState(
    initialMovement?.categoryId ?? "",
  );

  const [tagIds, setTagIds] = useState<string[]>(initialMovement?.tagIds ?? []);
  const [selectedTagId, setSelectedTagId] = useState("");

  const [note, setNote] = useState(initialMovement?.note ?? "");

  const movementCategories = useMemo(
    () => getCategoriesByMovementKind(kind),
    [kind],
  );

  const selectedAccount = accounts.find((account) => account.id === accountId);

  const availableTags = useMemo(
    () => tags.filter((tag) => !tagIds.includes(tag.id)),
    [tagIds],
  );

  const selectedTags = useMemo(
    () =>
      tagIds
        .map((tagId) => tags.find((tag) => tag.id === tagId))
        .filter(Boolean),
    [tagIds],
  );

  useEffect(() => {
    if (!accountId && accounts[0]?.id) {
      setAccountId(accounts[0].id);
    }
  }, [accountId, accounts]);

  useEffect(() => {
    const categoryExists = movementCategories.some(
      (category) => category.id === categoryId,
    );

    if (!categoryId || !categoryExists) {
      setCategoryId(movementCategories[0]?.id ?? "");
    }
  }, [categoryId, movementCategories]);

  useEffect(() => {
    if (!selectedTagId && availableTags[0]?.id) {
      setSelectedTagId(availableTags[0].id);
      return;
    }

    if (
      selectedTagId &&
      !availableTags.some((tag) => tag.id === selectedTagId)
    ) {
      setSelectedTagId(availableTags[0]?.id ?? "");
    }
  }, [availableTags, selectedTagId]);

  const parsedAmount = sanitizeMoneyValue(amount);

  const amountValidation = validatePositiveAmount(parsedAmount);

  const selectedAccountBalance = selectedAccount
    ? getAccountBalanceByCurrency(selectedAccount, selectedAccount.mainCurrency)
    : 0;

  const willLeaveNegativeBalance =
    kind === "expense" &&
    selectedAccount &&
    selectedAccountBalance - parsedAmount < 0;

  const errorMessage = !amountValidation.isValid
    ? t("movements.form.amountRequired")
    : !accountId
      ? t("movements.form.accountRequired")
      : !categoryId
        ? t("movements.form.categoryRequired")
        : !selectedAccount
          ? t("movements.form.selectedAccountNotFound", {
              defaultValue: "La cuenta seleccionada no existe.",
            })
          : undefined;

  const warningMessage = willLeaveNegativeBalance
    ? t("movements.form.negativeBalanceWarning", {
        defaultValue: "Este gasto dejará la cuenta con saldo negativo.",
      })
    : undefined;

  const canSubmit = !errorMessage;

  const resolvedSubmitLabelI18nKey =
    submitLabelI18nKey ??
    (initialMovement ? "accounts.saveChanges" : "movements.saveMovement");

  const handleAddTag = (tagId: string) => {
    if (!tagId || tagIds.includes(tagId)) {
      return;
    }

    setTagIds((currentTagIds) => [...currentTagIds, tagId]);

    const nextAvailableTag = availableTags.find((tag) => tag.id !== tagId);
    setSelectedTagId(nextAvailableTag?.id ?? "");
  };

  const handleRemoveTag = (tagId: string) => {
    setTagIds((currentTagIds) =>
      currentTagIds.filter((currentTagId) => currentTagId !== tagId),
    );
  };

  const handleSubmit = () => {
    if (!canSubmit || !selectedAccount) {
      return;
    }

    onSubmit({
      kind,
      amount: parsedAmount,
      currency: selectedAccount.mainCurrency,
      accountId,
      categoryId,
      tagIds,
      note,
      status: "confirmed",
      date: new Date().toISOString(),
    });

    setKind("expense");
    setAmount("");
    setAccountId(accounts[0]?.id ?? "");
    setCategoryId("");
    setTagIds([]);
    setSelectedTagId(tags[0]?.id ?? "");
    setNote("");
  };

  return (
    <AppCard style={styles.form}>
      <View style={styles.header}>
        <View>
          <AppText
            variant="subtitle"
            i18nKey={
              initialMovement
                ? "movements.editMovement"
                : "movements.newMovement"
            }
          />

          <AppText variant="muted" i18nKey="movements.form.createDescription" />
        </View>

        <Pressable onPress={onCancel} style={styles.closeButton}>
          <X size={20} color={themeColors.textMuted} />
        </Pressable>
      </View>

      <View style={styles.kindSwitch}>
        <Pressable
          onPress={() => setKind("expense")}
          style={[
            styles.kindButton,
            {
              backgroundColor:
                kind === "expense" ? themeColors.expense : themeColors.cardSoft,
            },
          ]}
        >
          <AppText
            variant="caption"
            i18nKey="movements.expense"
            style={{
              color: kind === "expense" ? "#FFFFFF" : themeColors.text,
            }}
          />
        </Pressable>

        <Pressable
          onPress={() => setKind("income")}
          style={[
            styles.kindButton,
            {
              backgroundColor:
                kind === "income" ? themeColors.income : themeColors.cardSoft,
            },
          ]}
        >
          <AppText
            variant="caption"
            i18nKey="movements.income"
            style={{
              color: kind === "income" ? "#FFFFFF" : themeColors.text,
            }}
          />
        </Pressable>
      </View>

      <View style={styles.field}>
        <AppText variant="caption" i18nKey="movements.form.amount" />

        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={themeColors.textMuted}
          style={[
            styles.input,
            {
              backgroundColor: themeColors.cardSoft,
              borderColor: themeColors.border,
              color: themeColors.text,
            },
          ]}
        />
      </View>

      <OptionPicker
        labelI18nKey="movements.form.account"
        placeholderI18nKey="common.select"
        value={accountId}
        options={accounts.map((account) => ({
          value: account.id,
          label: account.name,
          description: t("movements.form.accountCurrency", {
            currency: account.mainCurrency,
            defaultValue: `Moneda: ${account.mainCurrency}`,
          }),
        }))}
        onChange={setAccountId}
      />

      <OptionPicker
        labelI18nKey="movements.form.category"
        placeholderI18nKey="common.select"
        value={categoryId}
        options={movementCategories.map((category) => ({
          value: category.id,
          labelI18nKey: category.labelI18nKey,
        }))}
        onChange={setCategoryId}
      />

      <View style={styles.field}>
        {availableTags.length > 0 ? (
          <OptionPicker
            labelI18nKey="movements.form.tags"
            placeholderI18nKey="common.select"
            value={selectedTagId}
            options={availableTags.map((tag) => ({
              value: tag.id,
              labelI18nKey: tag.labelI18nKey,
            }))}
            onChange={handleAddTag}
          />
        ) : (
          <AppText variant="caption" i18nKey="movements.form.allTagsSelected" />
        )}

        {selectedTags.length > 0 ? (
          <View style={styles.selectedTags}>
            {selectedTags.map((tag) => {
              if (!tag) {
                return null;
              }

              return (
                <View
                  key={tag.id}
                  style={[
                    styles.selectedTag,
                    {
                      backgroundColor: themeColors.cardSoft,
                      borderColor: themeColors.border,
                    },
                  ]}
                >
                  <AppText variant="caption" i18nKey={tag.labelI18nKey} />

                  <Pressable
                    onPress={() => handleRemoveTag(tag.id)}
                    style={styles.removeTagButton}
                  >
                    <Trash2 size={14} color={themeColors.expense} />
                  </Pressable>
                </View>
              );
            })}
          </View>
        ) : null}
      </View>

      <View style={styles.field}>
        <AppText variant="caption" i18nKey="movements.form.note" />

        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder={t("movements.form.notePlaceholder")}
          placeholderTextColor={themeColors.textMuted}
          multiline
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

      {warningMessage ? (
        <InlineMessage type="warning" message={warningMessage} />
      ) : null}

      {errorMessage ? (
        <InlineMessage type="error" message={errorMessage} />
      ) : null}

      <View style={styles.actions}>
        <AppButton
          variant="secondary"
          onPress={onCancel}
          i18nKey="common.cancel"
        />

        <AppButton
          onPress={handleSubmit}
          disabled={!canSubmit}
          i18nKey={submitLabel ? undefined : resolvedSubmitLabelI18nKey}
        >
          {submitLabel}
        </AppButton>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },

  closeButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  kindSwitch: {
    flexDirection: "row",
    gap: 10,
  },

  kindButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
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
    minHeight: 92,
    paddingTop: 14,
    textAlignVertical: "top",
  },

  selectedTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  selectedTag: {
    minHeight: 38,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingLeft: 14,
    paddingRight: 8,
  },

  removeTagButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  actions: {
    gap: 10,
  },
});
