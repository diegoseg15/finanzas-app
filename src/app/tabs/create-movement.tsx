import { Redirect } from "expo-router";

export default function CreateMovementShortcutScreen() {
  return <Redirect href="/tabs/movements?create=movement" />;
}
