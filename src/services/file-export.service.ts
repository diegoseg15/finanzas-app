import { File, Paths } from "expo-file-system";
import * as LegacyFileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

export type ExportFileParams = {
  fileName: string;
  content: string;
  mimeType: string;
  dialogTitle?: string;
};

export type ExportBase64FileParams = {
  fileName: string;
  base64Content: string;
  mimeType: string;
  dialogTitle?: string;
  UTI?: string;
};

function getSafeFileName(fileName: string) {
  return fileName
    .trim()
    .replace(/[^\w.-]+/g, "_")
    .replace(/_+/g, "_");
}

async function assertCanShare() {
  const canShare = await Sharing.isAvailableAsync();

  if (!canShare) {
    throw new Error(
      "Compartir archivos no está disponible en este dispositivo.",
    );
  }
}

function createCacheFile(fileName: string) {
  const safeFileName = getSafeFileName(fileName);
  const file = new File(Paths.cache, safeFileName);

  if (file.exists) {
    file.delete();
  }

  file.create();

  return file;
}

export async function saveAndShareTextFile({
  fileName,
  content,
  mimeType,
  dialogTitle = "Compartir archivo",
}: ExportFileParams) {
  await assertCanShare();

  const file = createCacheFile(fileName);

  file.write(content);

  await Sharing.shareAsync(file.uri, {
    mimeType,
    dialogTitle,
    UTI: "public.comma-separated-values-text",
  });

  return file.uri;
}

export async function saveAndShareBase64File({
  fileName,
  base64Content,
  mimeType,
  dialogTitle = "Compartir archivo",
  UTI,
}: ExportBase64FileParams) {
  await assertCanShare();

  const safeFileName = getSafeFileName(fileName);
  const fileUri = `${LegacyFileSystem.cacheDirectory}${safeFileName}`;

  await LegacyFileSystem.writeAsStringAsync(fileUri, base64Content, {
    encoding: LegacyFileSystem.EncodingType.Base64,
  });

  await Sharing.shareAsync(fileUri, {
    mimeType,
    dialogTitle,
    UTI,
  });

  return fileUri;
}
