import { BellRing } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import {
  getReminderFrequencyOption,
  getReminderTypeOption,
} from "@/constants/reminderTypes";
import { formatMoney } from "@/services/money.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { Reminder } from "@/types/finance.types";

type ReminderCardProps = {
  reminder: Reminder;
  onComplete: () => void;
  onCancel: () => void;
};

export function ReminderCard({
  reminder,
  onComplete,
  onCancel,
}: ReminderCardProps) {
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const account = useAccountStore((state) =>
    state.accounts.find((item) => item.id === reminder.accountId),
  );

  const reminderType = getReminderTypeOption(reminder.type);
  const frequency = getReminderFrequencyOption(reminder.frequency);

  const scheduledDate = new Date(reminder.scheduledAt);

  return (
    <AppCard style={styles.card}>
      <View style={styles.header}>
        <View
          style={[
            styles.iconBox,
            {
              backgroundColor: themeColors.primary,
            },
          ]}
        >
          <BellRing size={20} color="#FFFFFF" />
        </View>

        <View style={styles.titleBox}>
          <AppText variant="body">{reminder.title}</AppText>

          <AppText variant="caption">
            {reminderType
              ? t(`reminders.types.${reminder.type}.label`)
              : t("reminders.card.defaultType", {
                  defaultValue: "Recordatorio",
                })}{" "}
            ·{" "}
            {frequency
              ? t(`reminders.frequencies.${reminder.frequency}.label`)
              : t("reminders.frequencies.once.label")}
          </AppText>
        </View>
      </View>

      {reminder.amount ? (
        <View style={styles.row}>
          <AppText variant="caption" i18nKey="common.amount" />

          <AppText>
            {formatMoney({
              amount: reminder.amount,
              currencyCode: reminder.currency,
            })}
          </AppText>
        </View>
      ) : null}

      <View style={styles.row}>
        <AppText variant="caption" i18nKey="common.date" />

        <AppText variant="caption">
          {scheduledDate.toLocaleDateString()} ·{" "}
          {scheduledDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </AppText>
      </View>

      {account ? (
        <View style={styles.row}>
          <AppText variant="caption" i18nKey="common.account" />
          <AppText variant="caption">{account.name}</AppText>
        </View>
      ) : null}

      {reminder.description ? (
        <AppText variant="muted">{reminder.description}</AppText>
      ) : null}

      <View style={styles.actions}>
        <AppButton
          variant="secondary"
          onPress={onComplete}
          i18nKey="reminders.complete"
        />

        <AppButton variant="ghost" onPress={onCancel} i18nKey="common.cancel" />
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 14,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  titleBox: {
    flex: 1,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  actions: {
    gap: 10,
  },
});
