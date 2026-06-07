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

function hexToWordArray(hex: string) {
  return CryptoJS.enc.Hex.parse(hex);
}

function wordArrayToHex(wordArray: CryptoJS.lib.WordArray) {
  return wordArray.toString(CryptoJS.enc.Hex);
}

async function createRandomHex(bytesLength: number) {
  const randomBytes = await Crypto.getRandomBytesAsync(bytesLength);

  return bytesToHex(randomBytes);
}

async function createEncryptionKey() {
  return createRandomHex(32);
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

  const key = hexToWordArray(encryptionKey);
  const ivHex = await createRandomHex(16);
  const iv = hexToWordArray(ivHex);

  const encrypted = CryptoJS.AES.encrypt(value, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const cipherText = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

  return `${ENCRYPTED_PREFIX}${ivHex}:${cipherText}`;
}

export async function decryptStorageValue(value: string) {
  if (!isEncryptedValue(value)) {
    return value;
  }

  const encryptionKey = await getStorageEncryptionKey();

  const encryptedPayload = value.replace(ENCRYPTED_PREFIX, "");
  const [ivHex, cipherText] = encryptedPayload.split(":");

  if (!ivHex || !cipherText) {
    throw new Error("Invalid encrypted storage value.");
  }

  const key = hexToWordArray(encryptionKey);
  const iv = hexToWordArray(ivHex);

  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherText),
  });

  const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const decryptedValue = decrypted.toString(CryptoJS.enc.Utf8);

  if (!decryptedValue) {
    throw new Error("Unable to decrypt storage value.");
  }

  return decryptedValue;
}

export async function clearStorageEncryptionKey() {
  cachedEncryptionKey = null;

  await SecureStore.deleteItemAsync(ENCRYPTION_KEY_NAME);
}
