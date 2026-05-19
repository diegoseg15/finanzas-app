import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";

export type ExportFileParams = {
  fileName: string;
  content: string;
  mimeType: string;
  dialogTitle?: string;
};

export type ExportBinaryFileParams = {
  fileName: string;
  bytes: Uint8Array;
  mimeType: string;
  dialogTitle?: string;
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

export async function saveAndShareBinaryFile({
  fileName,
  bytes,
  mimeType,
  dialogTitle = "Compartir archivo",
}: ExportBinaryFileParams) {
  await assertCanShare();

  const file = createCacheFile(fileName);

  file.write(bytes);

  await Sharing.shareAsync(file.uri, {
    mimeType,
    dialogTitle,
    UTI: "org.openxmlformats.spreadsheetml.sheet",
  });

  return file.uri;
}
