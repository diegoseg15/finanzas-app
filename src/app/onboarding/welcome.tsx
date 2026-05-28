import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

import { Screen } from "@/components/layout/Screen";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { routes } from "@/constants/routes";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

export default function WelcomeScreen() {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <Screen scroll={false} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.brandCircle}>
          <View
            style={[
              styles.brandInnerCircle,
              {
                backgroundColor: themeColors.primary,
              },
            ]}
          />
        </View>

        <View style={styles.copy}>
          <AppText variant="title" i18nKey="onboarding.welcome.title" />

          <AppText
            variant="muted"
            style={styles.description}
            i18nKey="onboarding.welcome.description"
          />
        </View>

        <AppCard style={styles.previewCard}>
          <AppText
            variant="muted"
            i18nKey="onboarding.welcome.balanceCardTitle"
          />

          <AppText variant="title" style={styles.balance}>
            $ 0.00
          </AppText>

          <View style={styles.previewRow}>
            <View style={styles.previewItem}>
              <AppText variant="caption" i18nKey="onboarding.welcome.income" />
              <AppText style={{ color: themeColors.income }}>+$0.00</AppText>
            </View>

            <View style={styles.previewItem}>
              <AppText
                variant="caption"
                i18nKey="onboarding.welcome.expenses"
              />
              <AppText style={{ color: themeColors.expense }}>-$0.00</AppText>
            </View>
          </View>
        </AppCard>
      </View>

      <AppButton
        onPress={() => router.push(routes.onboarding.setup as never)}
        style={styles.button}
      >
        <AppText
          i18nKey="onboarding.welcome.start"
          style={{ color: "#FFFFFF", fontWeight: "700" }}
        />

        <ArrowRight size={16} color="#FFFFFF" />
      </AppButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "space-between",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    gap: 34,
  },

  brandCircle: {
    width: 110,
    height: 110,
    borderRadius: 999,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
  },

  brandInnerCircle: {
    width: 54,
    height: 54,
    borderRadius: 999,
  },

  copy: {
    gap: 14,
  },

  description: {
    maxWidth: 340,
  },

  previewCard: {
    gap: 18,
  },

  balance: {
    marginTop: -6,
  },

  previewRow: {
    flexDirection: "row",
    gap: 12,
  },

  previewItem: {
    flex: 1,
    gap: 4,
  },

  button: {
    marginTop: 20,
  },
});
