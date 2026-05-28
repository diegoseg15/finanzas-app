import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { AppCard } from "./AppCard";
import { AppText } from "./AppText";

type I18nValues = Record<string, string | number>;

type EmptyStateProps = {
  title?: string;
  titleI18nKey?: string;
  titleI18nValues?: I18nValues;
  description?: string;
  descriptionI18nKey?: string;
  descriptionI18nValues?: I18nValues;
  action?: ReactNode;
};

export function EmptyState({
  title,
  titleI18nKey,
  titleI18nValues,
  description,
  descriptionI18nKey,
  descriptionI18nValues,
  action,
}: EmptyStateProps) {
  return (
    <AppCard style={styles.card}>
      <View style={styles.copy}>
        <AppText
          variant="subtitle"
          i18nKey={titleI18nKey}
          i18nValues={titleI18nValues}
        >
          {title}
        </AppText>

        <AppText
          variant="muted"
          i18nKey={descriptionI18nKey}
          i18nValues={descriptionI18nValues}
        >
          {description}
        </AppText>
      </View>

      {action}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 18,
  },

  copy: {
    gap: 8,
  },
});
