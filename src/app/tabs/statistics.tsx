import { Screen } from "@/components/layout/Screen";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";

export default function StatisticsScreen() {
  return (
    <Screen>
      <AppText variant="title">Estadísticas</AppText>

      <AppCard style={{ marginTop: 20 }}>
        <AppText variant="subtitle">Resumen financiero</AppText>
        <AppText variant="muted" style={{ marginTop: 8 }}>
          Aquí verás ingresos, gastos, categorías y gastos hormiga.
        </AppText>
      </AppCard>
    </Screen>
  );
}
