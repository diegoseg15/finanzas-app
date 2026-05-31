import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);

const APPLY = process.argv.includes("--apply");

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");
const LANGUAGE_DIR = path.join(SRC_DIR, "i18n", "languages");

const LANGUAGE_FILES = [
  "es.ts",
  "en.ts",
  "pt.ts",
  "ja.ts",
  "vi.ts",
  "ru.ts",
  "tr.ts",
  "de.ts",
  "ar.ts",
  "fr.ts",
  "hi.ts",
  "zh.ts",
  "uk.ts",
  "it.ts",
];

const BASE_LANGUAGE = "es";

const SAFE_KEEP_PREFIXES = [
  "common.",

  "accounts.",
  "budgets.",
  "home.",
  "settings.",
  "statistics.",
  "tabs.",

  "categories.",
  "tags.",

  "accounts.types.",
  "reminders.types.",
  "reminders.frequencies.",
  "onboarding.options.",
  "reports.periods.",
  "reports.movementKinds.",
  "settings.themeModes.",

  "plans.",
  "budgets.status.",
];
const SAFE_KEEP_KEYS = [
  "common.appName",

  "accounts.saveAccount",
  "accounts.saveChanges",

  "movements.editMovement",
  "movements.editTransfer",
  "movements.saveMovement",
  "movements.saveTransfer",

  "settings.exportCsv",
  "settings.exportExcel",
  "settings.exporting",

  "onboarding.stepThree.viewPlans",
];

function readFilesRecursive(dir, extensions = [".ts", ".tsx"]) {
  const result = [];

  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (
        fullPath.includes(`${path.sep}node_modules${path.sep}`) ||
        fullPath.includes(`${path.sep}i18n${path.sep}languages${path.sep}`)
      ) {
        continue;
      }

      result.push(...readFilesRecursive(fullPath, extensions));
      continue;
    }

    if (extensions.includes(path.extname(fullPath))) {
      result.push(fullPath);
    }
  }

  return result;
}

function loadTsExportedConst(filePath, exportName) {
  const source = fs.readFileSync(filePath, "utf8");

  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  }).outputText;

  const sandbox = {
    exports: {},
    module: { exports: {} },
    require,
  };

  vm.createContext(sandbox);
  vm.runInContext(transpiled, sandbox, { filename: filePath });

  return sandbox.exports[exportName] ?? sandbox.module.exports[exportName];
}

function extractUsedKeysFromSource(source) {
  const keys = new Set();

  const patterns = [
    /\bt\(\s*["'`]([^"'`${}]+)["'`]/g,

    /\b(?:i18nKey|titleI18nKey|descriptionI18nKey|labelI18nKey|placeholderI18nKey|ctaI18nKey)=["']([^"']+)["']/g,

    /\b(?:i18nKey|titleI18nKey|descriptionI18nKey|labelI18nKey|placeholderI18nKey|ctaI18nKey)=\{\s*["'`]([^"'`${}]+)["'`]\s*\}/g,

    /\b(?:i18nKey|titleI18nKey|descriptionI18nKey|labelI18nKey|placeholderI18nKey|ctaI18nKey)\s*:\s*["'`]([^"'`${}]+)["'`]/g,
  ];

  for (const pattern of patterns) {
    let match;

    while ((match = pattern.exec(source)) !== null) {
      keys.add(match[1]);
    }
  }

  return keys;
}

function normalizeTemplatePrefix(templateContent) {
  const interpolationIndex = templateContent.indexOf("${");

  if (interpolationIndex === -1) {
    return null;
  }

  const prefix = templateContent.slice(0, interpolationIndex);

  if (!prefix || !prefix.includes(".")) {
    return null;
  }

  return prefix.endsWith(".") ? prefix : `${prefix}.`;
}

function extractDynamicI18nPrefixesFromSource(source) {
  const prefixes = new Set();

  const templatePatterns = [
    /\bt\(\s*`([^`]*\$\{[^`]+)`/g,

    /\b(?:i18nKey|titleI18nKey|descriptionI18nKey|labelI18nKey|placeholderI18nKey|ctaI18nKey)=\{\s*`([^`]*\$\{[^`]+)`\s*\}/g,

    /\b(?:i18nKey|titleI18nKey|descriptionI18nKey|labelI18nKey|placeholderI18nKey|ctaI18nKey)\s*:\s*`([^`]*\$\{[^`]+)`/g,
  ];

  for (const pattern of templatePatterns) {
    let match;

    while ((match = pattern.exec(source)) !== null) {
      const prefix = normalizeTemplatePrefix(match[1]);

      if (prefix) {
        prefixes.add(prefix);
      }
    }
  }

  return prefixes;
}

function extractUsedKeysAndDynamicPrefixes() {
  const files = readFilesRecursive(SRC_DIR);
  const usedKeys = new Set();
  const dynamicPrefixes = new Set();

  for (const file of files) {
    const source = fs.readFileSync(file, "utf8");

    for (const key of extractUsedKeysFromSource(source)) {
      usedKeys.add(key);
    }

    for (const prefix of extractDynamicI18nPrefixesFromSource(source)) {
      dynamicPrefixes.add(prefix);
    }
  }

  return {
    usedKeys,
    dynamicPrefixes,
  };
}

function flattenKeys(obj, prefix = "") {
  const result = new Set();

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === "object" && !Array.isArray(value)) {
      for (const nestedKey of flattenKeys(value, fullKey)) {
        result.add(nestedKey);
      }

      continue;
    }

    result.add(fullKey);
  }

  return result;
}

function shouldKeepKey(key, dynamicPrefixes) {
  if (SAFE_KEEP_KEYS.includes(key)) {
    return true;
  }

  return [...SAFE_KEEP_PREFIXES, ...dynamicPrefixes].some((prefix) =>
    key.startsWith(prefix),
  );
}

function deleteKeyFromObject(obj, keyPath) {
  const parts = keyPath.split(".");
  let current = obj;

  for (const part of parts.slice(0, -1)) {
    if (!current || typeof current !== "object") {
      return false;
    }

    current = current[part];
  }

  const lastKey = parts.at(-1);

  if (!current || typeof current !== "object" || !(lastKey in current)) {
    return false;
  }

  delete current[lastKey];

  return true;
}

function removeEmptyObjects(obj) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
    return false;
  }

  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const shouldDelete = removeEmptyObjects(value);

      if (shouldDelete) {
        delete obj[key];
      }
    }
  }

  return Object.keys(obj).length === 0;
}

function formatTsObject(value) {
  return JSON.stringify(value, null, 2)
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/"/g, '"');
}

function writeLanguageFile(fileName, data) {
  const exportName = path.basename(fileName, ".ts");
  const filePath = path.join(LANGUAGE_DIR, fileName);

  const content = `export const ${exportName} = ${formatTsObject(data)} as const;\n`;

  fs.writeFileSync(filePath, content, "utf8");
}

const { usedKeys, dynamicPrefixes } = extractUsedKeysAndDynamicPrefixes();

const baseFilePath = path.join(LANGUAGE_DIR, `${BASE_LANGUAGE}.ts`);
const baseData = loadTsExportedConst(baseFilePath, BASE_LANGUAGE);
const baseKeys = flattenKeys(baseData);

const keysToDelete = [...baseKeys]
  .filter((key) => !usedKeys.has(key))
  .filter((key) => !shouldKeepKey(key, dynamicPrefixes))
  .sort();

console.log("\nKeys que se eliminarían:");
if (keysToDelete.length === 0) {
  console.log("  ✅ Ninguna");
  process.exit(0);
}

for (const key of keysToDelete) {
  console.log(`  - ${key}`);
}

console.log(`\nTotal: ${keysToDelete.length}`);

if (!APPLY) {
  console.log("\nModo revisión. No se modificó ningún archivo.");
  console.log("Para borrar estas keys ejecuta:");
  console.log("pnpm i18n:prune -- --apply");
  process.exit(0);
}

for (const fileName of LANGUAGE_FILES) {
  const exportName = path.basename(fileName, ".ts");
  const filePath = path.join(LANGUAGE_DIR, fileName);
  const data = loadTsExportedConst(filePath, exportName);

  let deletedCount = 0;

  for (const key of keysToDelete) {
    if (deleteKeyFromObject(data, key)) {
      deletedCount += 1;
    }
  }

  removeEmptyObjects(data);
  writeLanguageFile(fileName, data);

  console.log(`${fileName}: ${deletedCount} keys eliminadas`);
}

console.log("\n✅ Limpieza aplicada.");
console.log("Ahora corre:");
console.log("pnpm i18n:check");
console.log("pnpm typecheck");
