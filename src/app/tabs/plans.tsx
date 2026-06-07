import { Check, Crown, Gift, Palette, ShieldCheck } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { storeProducts } from "@/constants/storeProducts";
import {
  getLegacyPlusUntil,
  hasPlusAccess,
  isLegacyTester,
} from "@/services/subscription.service";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { ProductEntitlement } from "@/types/subscription.types";

export default function PlansScreen() {
  const { t } = useTranslation();

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const subscription = useSubscriptionStore((state) => state.subscription);
  const hasPlus = hasPlusAccess(subscription);
  const legacyTester = isLegacyTester(subscription);

  const legacyPlusUntil = getLegacyPlusUntil(subscription.legacyTesterSince);

  const plusProduct = storeProducts.find(
    (product) => product.id === "plus_lifetime",
  );

  const cardPacks = storeProducts.filter(
    (product) => product.type === "card_pack",
  );

  const handleBuyProduct = (productId: ProductEntitlement) => {
    console.log("Buy product:", productId);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.heroIcon,
            {
              backgroundColor: themeColors.accentSoft,
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

          <AppButton
            disabled={hasPlus}
            onPress={() => handleBuyProduct("plus_lifetime")}
          >
            {hasPlus ? t("plans.v2.plusActive") : t("plans.v2.unlockPlus")}
          </AppButton>
        </AppCard>
      ) : null}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeaderCopy}>
            <AppText variant="subtitle" i18nKey="plans.v2.cardDesigns.title" />

            <AppText
              variant="muted"
              i18nKey="plans.v2.cardDesigns.description"
            />
          </View>

          <Palette size={22} color={themeColors.textMuted} />
        </View>

        <View style={styles.packGrid}>
          {cardPacks.map((product) => {
            const includedWithPlus = hasPlus;

            return (
              <AppCard key={product.id} style={styles.packCard}>
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.smallIcon,
                      {
                        backgroundColor: themeColors.cardSoft,
                      },
                    ]}
                  >
                    <ShieldCheck size={18} color={themeColors.primary} />
                  </View>

                  <View style={styles.cardHeaderCopy}>
                    <AppText variant="body" i18nKey={product.nameI18nKey} />

                    <AppText variant="caption">
                      {includedWithPlus
                        ? t("plans.v2.includedWithPlus")
                        : product.priceLabel}
                    </AppText>
                  </View>
                </View>

                <AppText variant="muted" i18nKey={product.descriptionI18nKey} />

                <AppButton
                  variant={includedWithPlus ? "secondary" : "ghost"}
                  disabled={includedWithPlus}
                  onPress={() => handleBuyProduct(product.id)}
                >
                  {includedWithPlus
                    ? t("plans.v2.included")
                    : t("plans.v2.buyPack")}
                </AppButton>
              </AppCard>
            );
          })}
        </View>
      </View>

      <AppCard style={styles.futureCard}>
        <AppText variant="subtitle" i18nKey="plans.v2.pro.title" />

        <AppText variant="muted" i18nKey="plans.v2.pro.description" />
      </AppCard>
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
    padding: 20,
    paddingBottom: 36,
  },

  header: {
    gap: 14,
  },

  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 22,
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

  section: {
    gap: 12,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
  },

  sectionHeaderCopy: {
    flex: 1,
    gap: 6,
  },

  packGrid: {
    gap: 12,
  },

  packCard: {
    gap: 14,
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

  futureCard: {
    gap: 8,
  },
});
