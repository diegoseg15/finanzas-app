import { router } from "expo-router";
import { Bell } from "lucide-react-native";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { colors } from "@/constants/colors";
import { routes } from "@/constants/routes";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

const appLogo = require("../../../assets/images/icon.png");

export function AppHeader() {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  return (
    <View style={styles.header}>
      <View style={styles.brand}>
        <View
          style={[
            styles.logoWrapper,
            {
              backgroundColor: themeColors.cardSoft,
              borderColor: themeColors.border,
            },
          ]}
        >
          <Image source={appLogo} style={styles.logo} resizeMode="cover" />
        </View>

        <View style={styles.copy}>
          <AppText style={styles.appName}>Orvian</AppText>
          <AppText variant="caption">Finanzas personales</AppText>
        </View>
      </View>

      <Pressable
        onPress={() => router.push(routes.tabs.settings as never)}
        style={({ pressed }) => [
          styles.notificationButton,
          {
            backgroundColor: themeColors.cardSoft,
            borderColor: themeColors.border,
            opacity: pressed ? 0.72 : 1,
          },
        ]}
      >
        <Bell size={22} color={themeColors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },

  brand: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  logoWrapper: {
    width: 46,
    height: 46,
    borderRadius: 17,
    borderWidth: 1,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: "100%",
    height: "100%",
  },

  copy: {
    flex: 1,
    gap: 2,
  },

  appName: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "900",
  },

  notificationButton: {
    width: 46,
    height: 46,
    borderRadius: 17,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
