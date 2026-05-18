import { X } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { SelectableOption } from "@/components/ui/SelectableOption";
import { getCategoriesByMovementKind } from "@/constants/categories";
import { colors } from "@/constants/colors";
import { tags } from "@/constants/tags";
import { sanitizeMoneyValue } from "@/services/money.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import {
    Account,
    CreateMovementInput,
    MovementKind,
} from "@/types/finance.types";

type CreateMovementFormProps = {
  accounts: Account[];
  onSubmit: (input: CreateMovementInput) => void;
  onCancel: () => void;
};

export function CreateMovementForm({
  accounts,
  onSubmit,
  onCancel,
}: CreateMovementFormProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const [kind, setKind] = useState<MovementKind>("expense");
  const [amount, setAmount] = useState("");
  const [accountId, setAccountId] = useState(accounts[0]?.id ?? "");
  const [categoryId, setCategoryId] = useState("");
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const movementCategories = useMemo(
    () => getCategoriesByMovementKind(kind),
    [kind],
  );

  const selectedAccount = accounts.find((account) => account.id === accountId);

  useEffect(() => {
    setCategoryId(movementCategories[0]?.id ?? "");
  }, [kind, movementCategories]);

  useEffect(() => {
    if (!accountId && accounts[0]?.id) {
      setAccountId(accounts[0].id);
    }
  }, [accountId, accounts]);

  const parsedAmount = sanitizeMoneyValue(amount);

  const canSubmit =
    parsedAmount > 0 &&
    Boolean(accountId) &&
    Boolean(categoryId) &&
    Boolean(selectedAccount);

  const toggleTag = (tagId: string) => {
    setTagIds((currentTagIds) =>
      currentTagIds.includes(tagId)
        ? currentTagIds.filter((currentTagId) => currentTagId !== tagId)
        : [...currentTagIds, tagId],
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
    setNote("");
  };

  return (
    <AppCard style={styles.form}>
      <View style={styles.header}>
        <View>
          <AppText variant="subtitle">Nuevo movimiento</AppText>
          <AppText variant="muted">
            Registra un ingreso o egreso confirmado.
          </AppText>
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
            style={{
              color: kind === "expense" ? "#FFFFFF" : themeColors.text,
            }}
          >
            Egreso
          </AppText>
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
            style={{
              color: kind === "income" ? "#FFFFFF" : themeColors.text,
            }}
          >
            Ingreso
          </AppText>
        </Pressable>
      </View>

      <View style={styles.field}>
        <AppText variant="caption">Monto</AppText>
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

      <View style={styles.field}>
        <AppText variant="caption">Cuenta</AppText>

        <View style={styles.options}>
          {accounts.map((account) => (
            <SelectableOption
              key={account.id}
              title={account.name}
              description={`Moneda: ${account.mainCurrency}`}
              selected={accountId === account.id}
              onPress={() => setAccountId(account.id)}
            />
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <AppText variant="caption">Categoría</AppText>

        <View style={styles.options}>
          {movementCategories.map((category) => (
            <SelectableOption
              key={category.id}
              title={category.name}
              selected={categoryId === category.id}
              onPress={() => setCategoryId(category.id)}
            />
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <AppText variant="caption">Etiquetas</AppText>

        <View style={styles.tagGrid}>
          {tags.map((tag) => {
            const selected = tagIds.includes(tag.id);

            return (
              <Pressable
                key={tag.id}
                onPress={() => toggleTag(tag.id)}
                style={[
                  styles.tagButton,
                  {
                    backgroundColor: selected
                      ? themeColors.primary
                      : themeColors.cardSoft,
                    borderColor: selected
                      ? themeColors.primary
                      : themeColors.border,
                  },
                ]}
              >
                <AppText
                  variant="caption"
                  style={{
                    color: selected ? "#FFFFFF" : themeColors.text,
                  }}
                >
                  {tag.name}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.field}>
        <AppText variant="caption">Nota opcional</AppText>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Ej: Almuerzo, pago de cliente, suscripción..."
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

      <View style={styles.actions}>
        <AppButton variant="secondary" onPress={onCancel}>
          Cancelar
        </AppButton>

        <AppButton onPress={handleSubmit} disabled={!canSubmit}>
          Guardar movimiento
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

  options: {
    gap: 10,
  },

  tagGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tagButton: {
    minHeight: 38,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },

  actions: {
    gap: 10,
  },
});
