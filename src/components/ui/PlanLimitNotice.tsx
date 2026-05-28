import { StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { PremiumBadge } from "@/components/ui/PremiumBadge";

type I18nValues = Record<string, string | number>;

type PlanLimitNoticeProps = {
  title?: string;
  titleI18nKey?: string;
  titleI18nValues?: I18nValues;

  description?: string;
  descriptionI18nKey?: string;
  descriptionI18nValues?: I18nValues;

  cta?: string;
  ctaI18nKey?: string;
  ctaI18nValues?: I18nValues;

  onUpgrade: () => void;
};

export function PlanLimitNotice({
  title,
  titleI18nKey,
  titleI18nValues,
  description,
  descriptionI18nKey,
  descriptionI18nValues,
  cta = "Desbloquear con Plus",
  ctaI18nKey,
  ctaI18nValues,
  onUpgrade,
}: PlanLimitNoticeProps) {
  return (
    <AppCard style={styles.card}>
      <View style={styles.header}>
        <PremiumBadge />
        <AppText
          variant="subtitle"
          i18nKey={titleI18nKey}
          i18nValues={titleI18nValues}
        >
          {title}
        </AppText>
      </View>

      <AppText
        variant="muted"
        i18nKey={descriptionI18nKey}
        i18nValues={descriptionI18nValues}
      >
        {description}
      </AppText>

      <AppButton
        onPress={onUpgrade}
        i18nKey={ctaI18nKey}
        i18nValues={ctaI18nValues}
      >
        {cta}
      </AppButton>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 16,
  },

  header: {
    gap: 10,
  },
});
