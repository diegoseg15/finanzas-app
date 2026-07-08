import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";

import { MovementAttachment } from "@/types/finance.types";

import * as Sharing from "expo-sharing";

const MOVEMENT_ATTACHMENTS_DIRECTORY = `${FileSystem.documentDirectory ?? ""}movement-attachments/`;

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

function createAttachmentId() {
  return `movement_attachment_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 9)}`;
}

function sanitizeFileName(fileName: string) {
  return fileName
    .trim()
    .replace(/[^\w.\-() ]+/g, "_")
    .replace(/\s+/g, "_");
}

function getFileExtension(fileName: string) {
  const extension = fileName.split(".").pop();

  return extension ? `.${extension}` : "";
}

async function ensureAttachmentsDirectoryExists() {
  const directoryInfo = await FileSystem.getInfoAsync(
    MOVEMENT_ATTACHMENTS_DIRECTORY,
  );

  if (!directoryInfo.exists) {
    await FileSystem.makeDirectoryAsync(MOVEMENT_ATTACHMENTS_DIRECTORY, {
      intermediates: true,
    });
  }
}

export async function pickMovementAttachment(): Promise<MovementAttachment | null> {
  const result = await DocumentPicker.getDocumentAsync({
    type: ALLOWED_MIME_TYPES,
    copyToCacheDirectory: true,
    multiple: false,
  });

  if (result.canceled) {
    return null;
  }

  const asset = result.assets[0];

  if (!asset) {
    return null;
  }

  if (asset.mimeType && !ALLOWED_MIME_TYPES.includes(asset.mimeType)) {
    throw new Error("Tipo de archivo no permitido.");
  }

  await ensureAttachmentsDirectoryExists();

  const attachmentId = createAttachmentId();
  const safeName = sanitizeFileName(asset.name || "movement-attachment");
  const extension = getFileExtension(safeName);
  const destinationUri = `${MOVEMENT_ATTACHMENTS_DIRECTORY}${attachmentId}${extension}`;

  await FileSystem.copyAsync({
    from: asset.uri,
    to: destinationUri,
  });

  return {
    id: attachmentId,
    name: safeName,
    mimeType: asset.mimeType ?? "application/octet-stream",
    size: asset.size,
    uri: destinationUri,
    createdAt: new Date().toISOString(),
  };
}

export async function deleteMovementAttachment(
  attachment?: MovementAttachment | null,
) {
  if (!attachment?.uri) {
    return;
  }

  const fileInfo = await FileSystem.getInfoAsync(attachment.uri);

  if (!fileInfo.exists) {
    return;
  }

  await FileSystem.deleteAsync(attachment.uri, {
    idempotent: true,
  });
}

export async function openMovementAttachment(attachment: MovementAttachment) {
  const isSharingAvailable = await Sharing.isAvailableAsync();

  if (!isSharingAvailable) {
    throw new Error("No hay una app disponible para abrir este archivo.");
  }

  await Sharing.shareAsync(attachment.uri, {
    mimeType: attachment.mimeType,
    dialogTitle: attachment.name,
  });
}
