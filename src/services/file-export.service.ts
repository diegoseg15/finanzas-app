import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";

export type ExportFileParams = {
  fileName: string;
  content: string;
  mimeType: string;
  dialogTitle?: string;
};

function getSafeFileName(fileName: string) {
  return fileName
    .trim()
    .replace(/[^\w.-]+/g, "_")
    .replace(/_+/g, "_");
}

export async function saveAndShareTextFile({
  fileName,
  content,
  mimeType,
  dialogTitle = "Compartir archivo",
}: ExportFileParams) {
  const canShare = await Sharing.isAvailableAsync();

  if (!canShare) {
    throw new Error(
      "Compartir archivos no está disponible en este dispositivo.",
    );
  }

  const safeFileName = getSafeFileName(fileName);
  const file = new File(Paths.cache, safeFileName);

  if (file.exists) {
    file.delete();
  }

  file.create();
  file.write(content);

  await Sharing.shareAsync(file.uri, {
    mimeType,
    dialogTitle,
    UTI: "public.comma-separated-values-text",
  });

  return file.uri;
}
