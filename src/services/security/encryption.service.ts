import CryptoJS from "crypto-js";
import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";

const ENCRYPTION_KEY_NAME = "orvian-storage-encryption-key";
const ENCRYPTED_PREFIX = "enc:v1:";

let cachedEncryptionKey: string | null = null;

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function createEncryptionKey() {
  const randomBytes = await Crypto.getRandomBytesAsync(32);

  return bytesToHex(randomBytes);
}

export function isEncryptedValue(value: string | null | undefined) {
  return Boolean(value?.startsWith(ENCRYPTED_PREFIX));
}

export async function getStorageEncryptionKey() {
  if (cachedEncryptionKey) {
    return cachedEncryptionKey;
  }

  const existingKey = await SecureStore.getItemAsync(ENCRYPTION_KEY_NAME);

  if (existingKey) {
    cachedEncryptionKey = existingKey;
    return existingKey;
  }

  const newKey = await createEncryptionKey();

  await SecureStore.setItemAsync(ENCRYPTION_KEY_NAME, newKey);

  cachedEncryptionKey = newKey;

  return newKey;
}

export async function encryptStorageValue(value: string) {
  const encryptionKey = await getStorageEncryptionKey();
  const encryptedValue = CryptoJS.AES.encrypt(value, encryptionKey).toString();

  return `${ENCRYPTED_PREFIX}${encryptedValue}`;
}

export async function decryptStorageValue(value: string) {
  if (!isEncryptedValue(value)) {
    return value;
  }

  const encryptionKey = await getStorageEncryptionKey();
  const encryptedPayload = value.replace(ENCRYPTED_PREFIX, "");

  const bytes = CryptoJS.AES.decrypt(encryptedPayload, encryptionKey);
  const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);

  if (!decryptedValue) {
    throw new Error("Unable to decrypt storage value.");
  }

  return decryptedValue;
}

export async function clearStorageEncryptionKey() {
  cachedEncryptionKey = null;

  await SecureStore.deleteItemAsync(ENCRYPTION_KEY_NAME);
}
