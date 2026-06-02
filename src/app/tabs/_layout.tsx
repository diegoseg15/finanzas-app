import { Tabs } from "expo-router";
import {
  ChartNoAxesColumn,
  CircleDollarSign,
  Home,
  Settings,
  WalletCards,
} from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

export default function TabsLayout() {
  const { t } = useTranslation();

  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 12);

  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.textMuted,
        tabBarStyle: {
          backgroundColor: themeColors.card,
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
        name="movements"
        options={{
          title: t("tabs.movements"),
          tabBarIcon: ({ color, size }) => (
            <CircleDollarSign color={color} size={size} />
          ),
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
    </Tabs>
  );
}
