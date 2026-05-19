import * as DocumentPicker from "expo-document-picker";
import * as LegacyFileSystem from "expo-file-system/legacy";

export type PickedTextDocument = {
  name: string;
  uri: string;
  content: string;
};

export async function pickCsvDocument(): Promise<PickedTextDocument | null> {
  const result = await DocumentPicker.getDocumentAsync({
    type: [
      "text/csv",
      "text/comma-separated-values",
      "application/csv",
      "application/vnd.ms-excel",
    ],
    copyToCacheDirectory: true,
    multiple: false,
  });

  if (result.canceled) {
    return null;
  }

  const file = result.assets[0];

  if (!file) {
    return null;
  }

  const content = await LegacyFileSystem.readAsStringAsync(file.uri, {
    encoding: LegacyFileSystem.EncodingType.UTF8,
  });

  return {
    name: file.name,
    uri: file.uri,
    content,
  };
}
