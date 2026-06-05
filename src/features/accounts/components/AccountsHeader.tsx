import { StyleSheet, View } from "react-native";

import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";

type AccountsHeaderProps = {
  isCreating: boolean;
  canCreateMoreAccounts: boolean;
  hasAccounts: boolean;
  onCreatePress: () => void;
};

export function AccountsHeader({
  isCreating,
  canCreateMoreAccounts,
  hasAccounts,
  onCreatePress,
}: AccountsHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerCopy}>
        <AppText variant="title" i18nKey="accounts.title" />

        <AppText variant="muted" i18nKey="accounts.description" />
      </View>

      {!isCreating && canCreateMoreAccounts && hasAccounts ? (
        <AppButton onPress={onCreatePress} i18nKey="accounts.newAccount" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 16,
  },

  headerCopy: {
    gap: 6,
  },
});
