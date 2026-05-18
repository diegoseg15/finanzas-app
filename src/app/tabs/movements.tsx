import { Screen } from "@/components/layout/Screen";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";

export default function MovementsScreen() {
  return (
    <Screen>
      <AppText variant="title">Movimientos</AppText>

      <AppCard style={{ marginTop: 20 }}>
        <AppText variant="subtitle">Sin movimientos</AppText>
        <AppText variant="muted" style={{ marginTop: 8 }}>
          Aquí registrarás ingresos, egresos y transferencias.
        </AppText>
      </AppCard>
    </Screen>
  );
}
