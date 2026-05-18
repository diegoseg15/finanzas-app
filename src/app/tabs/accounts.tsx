import { Screen } from "@/components/layout/Screen";
import { AppCard } from "@/components/ui/AppCard";
import { AppText } from "@/components/ui/AppText";

export default function AccountsScreen() {
  return (
    <Screen>
      <AppText variant="title">Cuentas</AppText>

      <AppCard style={{ marginTop: 20 }}>
        <AppText variant="subtitle">Sin cuentas</AppText>
        <AppText variant="muted" style={{ marginTop: 8 }}>
          Aquí aparecerán tus bancos, efectivo, Binance, Metamask y otras
          cuentas.
        </AppText>
      </AppCard>
    </Screen>
  );
}
