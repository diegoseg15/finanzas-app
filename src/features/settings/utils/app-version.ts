import Constants from "expo-constants";

export function getAppVersion() {
  return (
    Constants.expoConfig?.version ??
    Constants.manifest2?.extra?.expoClient?.version ??
    "1.5.1"
  );
}
