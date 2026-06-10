import { Check, Crown, Gift } from "lucide-react-native";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { storeProducts } from "@/constants/storeProducts";
import {
  buyPlusLifetime,
  syncGooglePlayEntitlements,
} from "@/services/google-play-billing.service";
import {
  getLegacyPlusUntil,
  hasPlusAccess,
  isLegacyTester,
} from "@/services/subscription.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";

export default function PlansScreen() {
  const { t } = useTranslation();

  const insets = useSafeAreaInsets();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const subscription = useSubscriptionStore((state) => state.subscription);
  const hasPlus = hasPlusAccess(subscription);

  const legacyTester = isLegacyTester(subscription);

  const legacyPlusUntil = getLegacyPlusUntil(subscription.legacyTesterSince);

  const plusProduct = storeProducts.find(
    (product) => product.id === "plus_lifetime",
  );

  const handleBuyPlus = async () => {
    try {
      await buyPlusLifetime();
    } catch {
      Alert.alert(
        t("plans.purchase.errorTitle"),
        t("plans.purchase.errorDescription"),
      );
    }
  };

  useEffect(() => {
    void syncGooglePlayEntitlements();
  }, []);

  return (
    <ScrollView
      style={[
        styles.screen,
        {
          backgroundColor: themeColors.background,
        },
      ]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.container,
        {
          paddingTop: insets.top + 18,
          paddingBottom: insets.bottom + 36,
        },
      ]}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.heroIcon,
            {
              backgroundColor: themeColors.accentSoft,
              borderColor: themeColors.border,
            },
          ]}
        >
          <Crown size={28} color={themeColors.primary} />
        </View>

        <View style={styles.headerCopy}>
          <AppText variant="title" i18nKey="plans.v2.title" />

          <AppText variant="muted" i18nKey="plans.v2.description" />
        </View>
      </View>

      {legacyTester ? (
        <AppCard
          style={[
            styles.legacyCard,
            {
              backgroundColor: themeColors.card,
              borderColor: themeColors.primary,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <View
              style={[
                styles.smallIcon,
                {
                  backgroundColor: themeColors.accentSoft,
                },
              ]}
            >
              <Gift size={20} color={themeColors.primary} />
            </View>

            <View style={styles.cardHeaderCopy}>
              <AppText variant="subtitle" i18nKey="plans.v2.legacy.title" />

              <AppText variant="muted" i18nKey="plans.v2.legacy.description" />
            </View>
          </View>

          <AppText variant="caption" i18nKey="plans.v2.legacy.benefit" />

          {legacyPlusUntil ? (
            <AppText
              variant="caption"
              i18nKey="plans.v2.legacy.temporaryUntil"
              i18nValues={{
                date: new Date(legacyPlusUntil).toLocaleDateString(),
              }}
            />
          ) : null}
        </AppCard>
      ) : null}

      <AppCard style={styles.planCard}>
        <View style={styles.planTop}>
          <View style={styles.planCopy}>
            <AppText variant="subtitle" i18nKey="plans.freePlan.name" />

            <AppText variant="muted" i18nKey="plans.freePlan.description" />
          </View>

          <AppText variant="subtitle">$0</AppText>
        </View>

        <View style={styles.featureList}>
          <PlanFeature i18nKeyName="plans.freePlan.features.accounts" />
          <PlanFeature i18nKeyName="plans.freePlan.features.movements" />
          <PlanFeature i18nKeyName="plans.freePlan.features.basicReminders" />
          <PlanFeature i18nKeyName="plans.freePlan.features.baseCategories" />
          <PlanFeature i18nKeyName="plans.freePlan.features.theme" />
        </View>

        {!hasPlus ? (
          <AppText variant="caption" i18nKey="plans.currentPlan" />
        ) : null}
      </AppCard>

      {plusProduct ? (
        <AppCard
          style={[
            styles.planCard,
            styles.plusCard,
            {
              backgroundColor: themeColors.card,
              borderColor: themeColors.primary,
            },
          ]}
        >
          <View style={styles.planTop}>
            <View style={styles.planCopy}>
              <View style={styles.inlineTitle}>
                <AppText variant="subtitle" i18nKey={plusProduct.nameI18nKey} />

                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: themeColors.primary,
                    },
                  ]}
                >
                  <AppText
                    style={styles.badgeText}
                    i18nKey="plans.v2.oneTimePayment"
                  />
                </View>
              </View>

              <AppText
                variant="muted"
                i18nKey={plusProduct.descriptionI18nKey}
              />
            </View>

            <View style={styles.priceBox}>
              {legacyTester && plusProduct.legacyPriceLabel ? (
                <>
                  <AppText variant="caption" style={styles.previousPrice}>
                    {plusProduct.priceLabel}
                  </AppText>

                  <AppText variant="subtitle">
                    {plusProduct.legacyPriceLabel}
                  </AppText>
                </>
              ) : (
                <AppText variant="subtitle">{plusProduct.priceLabel}</AppText>
              )}
            </View>
          </View>

          <View style={styles.featureList}>
            {plusProduct.featuresI18nKeys.map((featureKey) => (
              <PlanFeature key={featureKey} i18nKeyName={featureKey} />
            ))}
          </View>

          <AppButton disabled={hasPlus} onPress={handleBuyPlus}>
            {hasPlus ? t("plans.v2.plusActive") : t("plans.v2.unlockPlus")}
          </AppButton>
        </AppCard>
      ) : null}
    </ScrollView>
  );
}

function PlanFeature({ i18nKeyName }: { i18nKeyName: string }) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <View style={styles.featureItem}>
      <Check size={17} color={themeColors.income} />

      <AppText
        variant="caption"
        style={styles.featureText}
        i18nKey={i18nKeyName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 18,
    paddingHorizontal: 20,
  },

  header: {
    gap: 14,
  },

  screen: {
    flex: 1,
  },

  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  headerCopy: {
    gap: 8,
  },

  legacyCard: {
    gap: 14,
    borderWidth: 1,
  },

  planCard: {
    gap: 18,
  },

  plusCard: {
    borderWidth: 1,
  },

  planTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
  },

  planCopy: {
    flex: 1,
    gap: 6,
  },

  inlineTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },

  badge: {
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    lineHeight: 13,
    fontWeight: "900",
  },

  priceBox: {
    alignItems: "flex-end",
    gap: 2,
  },

  previousPrice: {
    textDecorationLine: "line-through",
    opacity: 0.55,
  },

  featureList: {
    gap: 10,
  },

  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  featureText: {
    flex: 1,
  },

  cardHeader: {
    flexDirection: "row",
    gap: 12,
  },

  smallIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  cardHeaderCopy: {
    flex: 1,
    gap: 3,
  },
});
