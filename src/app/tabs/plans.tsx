import { Check, Crown, Gift, Palette, ShieldCheck } from "lucide-react-native";
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
    /**
     * v2.0 Billing step:
     * aquí conectaremos Google Play Billing.
     *
     * No activar compras localmente en producción sin validar la compra real.
     */
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
          <AppText variant="title">Elige cómo crecer con Orvian</AppText>

          <AppText variant="muted">
            Empieza gratis y desbloquea funciones premium cuando las necesites.
          </AppText>
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
              <AppText variant="subtitle">
                Beneficio para usuarios tempranos
              </AppText>

              <AppText variant="muted">
                Gracias por probar Orvian antes del lanzamiento público.
              </AppText>
            </View>
          </View>

          <AppText variant="caption">
            Tendrás acceso Plus temporal y un descuento especial para conservar
            Plus Lifetime.
          </AppText>

          {legacyPlusUntil ? (
            <AppText variant="caption">
              Acceso temporal estimado hasta:{" "}
              {new Date(legacyPlusUntil).toLocaleDateString()}
            </AppText>
          ) : null}
        </AppCard>
      ) : null}

      <AppCard style={styles.planCard}>
        <View style={styles.planTop}>
          <View style={styles.planCopy}>
            <AppText variant="subtitle">Gratis</AppText>

            <AppText variant="muted">
              Para empezar a controlar tus finanzas personales.
            </AppText>
          </View>

          <AppText variant="subtitle">$0</AppText>
        </View>

        <View style={styles.featureList}>
          <PlanFeature text="Hasta 3 cuentas" />
          <PlanFeature text="Movimientos ilimitados" />
          <PlanFeature text="Recordatorios básicos" />
          <PlanFeature text="Categorías base" />
          <PlanFeature text="Modo claro y oscuro" />
        </View>

        {!hasPlus ? <AppText variant="caption">Tu plan actual</AppText> : null}
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
                <AppText variant="subtitle">{plusProduct.name}</AppText>

                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: themeColors.primary,
                    },
                  ]}
                >
                  <AppText style={styles.badgeText}>Pago único</AppText>
                </View>
              </View>

              <AppText variant="muted">{plusProduct.description}</AppText>
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
            {plusProduct.features.map((feature) => (
              <PlanFeature key={feature} text={feature} />
            ))}
          </View>

          <AppButton
            disabled={hasPlus}
            onPress={() => handleBuyProduct("plus_lifetime")}
          >
            {hasPlus ? "Plus activo" : "Desbloquear Plus"}
          </AppButton>
        </AppCard>
      ) : null}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <AppText variant="subtitle">Diseños de tarjetas</AppText>

            <AppText variant="muted">
              Compra packs individuales o desbloquéalos con Plus.
            </AppText>
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
                    <AppText variant="body">{product.name}</AppText>

                    <AppText variant="caption">
                      {includedWithPlus
                        ? "Incluido con Plus"
                        : product.priceLabel}
                    </AppText>
                  </View>
                </View>

                <AppText variant="muted">{product.description}</AppText>

                <AppButton
                  variant={includedWithPlus ? "secondary" : "ghost"}
                  disabled={includedWithPlus}
                  onPress={() => handleBuyProduct(product.id)}
                >
                  {includedWithPlus ? "Incluido" : "Comprar pack"}
                </AppButton>
              </AppCard>
            );
          })}
        </View>
      </View>

      <AppCard style={styles.futureCard}>
        <AppText variant="subtitle">Próximamente: Orvian Pro</AppText>

        <AppText variant="muted">
          IA financiera, sincronización en la nube, backups y acceso
          multi-dispositivo formarán parte de un plan mensual independiente.
        </AppText>
      </AppCard>
    </ScrollView>
  );
}

function PlanFeature({ text }: { text: string }) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <View style={styles.featureItem}>
      <Check size={17} color={themeColors.income} />

      <AppText variant="caption" style={styles.featureText}>
        {text}
      </AppText>
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
