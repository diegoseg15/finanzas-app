import { router, Tabs } from "expo-router";
import {
  ChartNoAxesColumn,
  Home,
  Plus,
  Settings,
  WalletCards
} from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppFormModal } from "@/components/ui/AppFormModal";
import { colors } from "@/constants/colors";
import { MovementCalculatorForm } from "@/features/movements/components/MovementCalculatorForm";
import { canCreateMovement } from "@/services/subscription.service";
import { useAccountStore } from "@/store/useAccountStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { useMovementStore } from "@/store/useMovementStore";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { useTransferStore } from "@/store/useTransferStore";

export default function TabsLayout() {
  const { t } = useTranslation();

  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 12);

  const [isCreatingMovement, setIsCreatingMovement] = useState(false);

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const mainCurrency = useAppSettingsStore((state) => state.mainCurrency);

  const accounts = useAccountStore((state) => state.accounts);

  const movements = useMovementStore((state) => state.movements);
  const addMovement = useMovementStore((state) => state.addMovement);

  const addTransfer = useTransferStore((state) => state.addTransfer);

  const subscription = useSubscriptionStore((state) => state.subscription);

  const activeAccounts = accounts.filter(
    (account) => account.status === "active",
  );

  const hasActiveAccounts = activeAccounts.length > 0;
  const canCreateTransfer = activeAccounts.length >= 2;

  const canCreateMoreMovements = canCreateMovement(subscription, movements);

  const openMovementModal = () => {
    if (!hasActiveAccounts) {
      router.push("/tabs/accounts" as never);
      return;
    }

    if (!canCreateMoreMovements) {
      router.push("/tabs/plans" as never);
      return;
    }

    setIsCreatingMovement(true);
  };

  const closeMovementModal = () => {
    setIsCreatingMovement(false);
  };

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: themeColors.primary,
          tabBarInactiveTintColor: themeColors.textMuted,
          tabBarStyle: {
            backgroundColor: themeColors.surface,
            borderTopColor: themeColors.border,
            height: 72 + bottomInset,
            paddingTop: 10,
            paddingBottom: bottomInset,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: t("tabs.home"),
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          }}
        />

        <Tabs.Screen
          name="accounts"
          options={{
            title: t("tabs.accounts"),
            tabBarIcon: ({ color, size }) => (
              <WalletCards color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="create-movement"
          options={{
            title: "",
            tabBarButton: () => (
              <Pressable
                onPress={openMovementModal}
                style={styles.createTabWrapper}
              >
                <View
                  style={[
                    styles.createTabButton,
                    {
                      backgroundColor: themeColors.primary,
                    },
                  ]}
                >
                  <Plus size={28} color="#FFFFFF" />
                </View>
              </Pressable>
            ),
          }}
        />

        <Tabs.Screen
          name="movements"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="statistics"
          options={{
            title: t("tabs.statistics"),
            tabBarIcon: ({ color, size }) => (
              <ChartNoAxesColumn color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: t("tabs.settings"),
            tabBarIcon: ({ color, size }) => (
              <Settings color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="budgets"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="reminders"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="plans"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="loans"
          options={{
            href: null,
          }}
        />
      </Tabs>

      <AppFormModal
        visible={
          isCreatingMovement && hasActiveAccounts && canCreateMoreMovements
        }
        showHeader={false}
        onClose={closeMovementModal}
      >
        <MovementCalculatorForm
          currency={mainCurrency}
          accounts={activeAccounts}
          initialMode="expense"
          canCreateTransfer={canCreateTransfer}
          onCancel={closeMovementModal}
          onSubmitMovement={(input) => {
            addMovement(input);
            closeMovementModal();
          }}
          onSubmitTransfer={(input) => {
            addTransfer(input);
            closeMovementModal();
          }}
        />
      </AppFormModal>
    </>
  );
}

const styles = StyleSheet.create({
  createTabWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  createTabButton: {
    width: 58,
    height: 58,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
});
