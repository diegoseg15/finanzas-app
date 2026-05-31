import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);

const MODE = process.argv[2] ?? "check";

const VALID_MODES = ["check", "unused", "audit"];

if (!VALID_MODES.includes(MODE)) {
  console.error(`Modo inválido: ${MODE}`);
  console.error(`Usa uno de estos: ${VALID_MODES.join(", ")}`);
  process.exit(1);
}

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

const MANUAL_IGNORED_UNUSED_PREFIXES = [
  "categories.",
  "tags.",

  "accounts.types.",
  "reminders.types.",
  "reminders.frequencies.",
  "onboarding.options.",
  "reports.periods.",
  "reports.movementKinds.",
  "settings.themeModes.",

  "plans.freePlan.features.",
  "plans.plusPlan.features.",
];

const MANUAL_IGNORED_UNUSED_KEYS = ["common.appName"];

const MANUAL_IGNORED_EQUAL_TO_BASE_PREFIXES = [
  // Catálogos que pueden ser iguales o parcialmente iguales según idioma.
  "categories.",
  "tags.",

  // Placeholders numéricos.
  "accounts.form.balancePlaceholder",
  "reminders.form.amountPlaceholder",

  // Precios, nombres de planes y marcas.
  "plans.",
];

const MANUAL_IGNORED_EQUAL_TO_BASE_KEYS = [
  "common.appName",

  // Palabras universales o iguales en varios idiomas.
  "common.error",
  "common.total",
  "common.no",
  "common.note",
  "common.type",
  "common.balance",

  "statistics.labels.top",
  "statistics.labels.balance",

  "settings.theme",
  "settings.themeModes.system",

  "plans.plus",
  "plans.freePlan.price",
  "plans.plusPlan.name",
  "plans.plusPlan.price",
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

function flattenObjectValues(obj, prefix = "") {
  const result = new Map();

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === "object" && !Array.isArray(value)) {
      const nested = flattenObjectValues(value, fullKey);

      for (const [nestedKey, nestedValue] of nested.entries()) {
        result.set(nestedKey, nestedValue);
      }

      continue;
    }

    result.set(fullKey, value);
  }

  return result;
}

function extractUsedKeysFromSource(source) {
  const keys = new Set();

  const patterns = [
    // t("common.save")
    /\bt\(\s*["'`]([^"'`${}]+)["'`]/g,

    // i18nKey="common.save"
    /\b(?:i18nKey|titleI18nKey|descriptionI18nKey|labelI18nKey|placeholderI18nKey|ctaI18nKey)=["']([^"']+)["']/g,

    // i18nKey={"common.save"}
    /\b(?:i18nKey|titleI18nKey|descriptionI18nKey|labelI18nKey|placeholderI18nKey|ctaI18nKey)=\{\s*["'`]([^"'`${}]+)["'`]\s*\}/g,

    // labelI18nKey: "common.save"
    /\b(?:i18nKey|titleI18nKey|descriptionI18nKey|labelI18nKey|placeholderI18nKey|ctaI18nKey)\s*:\s*["'`]([^"'`${}]+)["'`]/g,

    // defaultValue: t("common.save")
    /\bdefaultValue\s*:\s*t\(\s*["'`]([^"'`${}]+)["'`]/g,
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
    // t(`accounts.types.${account.type}.label`)
    /\bt\(\s*`([^`]*\$\{[^`]+)`/g,

    // i18nKey={`accounts.types.${account.type}.label`}
    /\b(?:i18nKey|titleI18nKey|descriptionI18nKey|labelI18nKey|placeholderI18nKey|ctaI18nKey)=\{\s*`([^`]*\$\{[^`]+)`\s*\}/g,

    // labelI18nKey: `accounts.types.${account.type}.label`
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

    const fileKeys = extractUsedKeysFromSource(source);
    const fileDynamicPrefixes = extractDynamicI18nPrefixesFromSource(source);

    for (const key of fileKeys) {
      usedKeys.add(key);
    }

    for (const prefix of fileDynamicPrefixes) {
      dynamicPrefixes.add(prefix);
    }
  }

  return {
    usedKeys,
    dynamicPrefixes,
  };
}

function loadLanguages() {
  return Object.fromEntries(
    LANGUAGE_FILES.map((fileName) => {
      const filePath = path.join(LANGUAGE_DIR, fileName);
      const exportName = path.basename(fileName, ".ts");

      if (!fs.existsSync(filePath)) {
        throw new Error(`No existe el archivo de idioma: ${filePath}`);
      }

      const data = loadTsExportedConst(filePath, exportName);
      const values = flattenObjectValues(data);
      const keys = new Set(values.keys());

      return [exportName, { keys, values }];
    }),
  );
}

function shouldIgnoreUnusedKey(key, dynamicPrefixes) {
  if (MANUAL_IGNORED_UNUSED_KEYS.includes(key)) {
    return true;
  }

  return [...MANUAL_IGNORED_UNUSED_PREFIXES, ...dynamicPrefixes].some(
    (prefix) => key.startsWith(prefix),
  );
}

function shouldIgnoreEqualToBaseKey(key) {
  if (MANUAL_IGNORED_EQUAL_TO_BASE_KEYS.includes(key)) {
    return true;
  }

  return MANUAL_IGNORED_EQUAL_TO_BASE_PREFIXES.some((prefix) => {
    if (prefix.endsWith(".")) {
      return key.startsWith(prefix);
    }

    return key === prefix || key.startsWith(`${prefix}.`);
  });
}

function extractPlaceholders(value) {
  if (typeof value !== "string") {
    return [];
  }

  const placeholders = new Set();
  const pattern = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g;

  let match;

  while ((match = pattern.exec(value)) !== null) {
    placeholders.add(match[1]);
  }

  return [...placeholders].sort();
}

function looksLikeI18nKey(value) {
  if (typeof value !== "string") {
    return false;
  }

  const trimmedValue = value.trim();

  // Evita falsos positivos como:
  // "0.00", "Cargando...", "Loading...", "Exportando..."
  if (
    trimmedValue.includes(" ") ||
    trimmedValue.endsWith("...") ||
    /^\d+([.,]\d+)?$/.test(trimmedValue) ||
    /^[^a-zA-Z]*$/.test(trimmedValue)
  ) {
    return false;
  }

  // Key real esperada: common.save, budgets.status.safe, reports.filters.title
  // Debe tener al menos 2 segmentos con letras y no terminar en punto.
  return /^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z0-9_]+)+$/.test(trimmedValue);
}

function printList(title, items) {
  console.log(`\n${title}`);

  if (items.length === 0) {
    console.log("  ✅ Ninguno");
    return;
  }

  for (const item of items) {
    console.log(`  - ${item}`);
  }
}

function runCheck({ languages, usedKeys }) {
  const baseKeys = languages[BASE_LANGUAGE].keys;
  let hasError = false;

  for (const [language, { keys }] of Object.entries(languages)) {
    const missingComparedToBase = [...baseKeys]
      .filter((key) => !keys.has(key))
      .sort();

    const extraComparedToBase = [...keys]
      .filter((key) => !baseKeys.has(key))
      .sort();

    printList(
      `Faltan en ${language}.ts comparado con ${BASE_LANGUAGE}.ts`,
      missingComparedToBase,
    );

    printList(
      `Sobran en ${language}.ts comparado con ${BASE_LANGUAGE}.ts`,
      extraComparedToBase,
    );

    if (missingComparedToBase.length > 0 || extraComparedToBase.length > 0) {
      hasError = true;
    }
  }

  const missingInBase = [...usedKeys]
    .filter((key) => !baseKeys.has(key))
    .sort();

  printList(
    `Keys usadas en componentes pero faltantes en ${BASE_LANGUAGE}.ts`,
    missingInBase,
  );

  if (missingInBase.length > 0) {
    hasError = true;
  }

  if (hasError) {
    console.log("\n❌ Hay problemas estructurales de i18n.");
    process.exit(1);
  }

  console.log("\n✅ i18n estructuralmente consistente.");
}

function runUnused({ languages, usedKeys, dynamicPrefixes }) {
  const baseKeys = languages[BASE_LANGUAGE].keys;

  const unusedInBase = [...baseKeys]
    .filter((key) => !usedKeys.has(key))
    .filter((key) => !shouldIgnoreUnusedKey(key, dynamicPrefixes))
    .sort();

  printList(
    "Prefijos dinámicos detectados automáticamente",
    [...dynamicPrefixes].sort(),
  );

  printList(
    `Keys de ${BASE_LANGUAGE}.ts que posiblemente no se usan`,
    unusedInBase,
  );

  console.log(
    "\n✅ Revisión de unused terminada. No borres keys automáticamente.",
  );
}

function runAudit({ languages }) {
  const baseValues = languages[BASE_LANGUAGE].values;

  const emptyValues = [];
  const valuesThatLookLikeKeys = [];
  const placeholderProblems = [];
  const equalToBaseValues = [];

  for (const [language, { values }] of Object.entries(languages)) {
    for (const [key, value] of values.entries()) {
      if (typeof value !== "string") {
        continue;
      }

      const trimmedValue = value.trim();

      if (trimmedValue.length === 0) {
        emptyValues.push(`${language}.${key}`);
      }

      if (looksLikeI18nKey(trimmedValue)) {
        valuesThatLookLikeKeys.push(`${language}.${key} = "${trimmedValue}"`);
      }

      const baseValue = baseValues.get(key);

      if (typeof baseValue === "string") {
        const basePlaceholders = extractPlaceholders(baseValue);
        const currentPlaceholders = extractPlaceholders(value);

        if (basePlaceholders.join(",") !== currentPlaceholders.join(",")) {
          placeholderProblems.push(
            `${language}.${key} | es: [${basePlaceholders.join(
              ", ",
            )}] vs ${language}: [${currentPlaceholders.join(", ")}]`,
          );
        }

        if (
          language !== BASE_LANGUAGE &&
          trimmedValue === baseValue.trim() &&
          !shouldIgnoreEqualToBaseKey(key)
        ) {
          equalToBaseValues.push(`${language}.${key} = "${trimmedValue}"`);
        }
      }
    }
  }

  printList("Valores vacíos", emptyValues);
  printList("Valores que parecen keys sin traducir", valuesThatLookLikeKeys);
  printList("Placeholders inconsistentes", placeholderProblems);
  printList(
    `Valores iguales a ${BASE_LANGUAGE}.ts en otros idiomas`,
    equalToBaseValues,
  );

  const hasError =
    emptyValues.length > 0 ||
    valuesThatLookLikeKeys.length > 0 ||
    placeholderProblems.length > 0;

  if (hasError) {
    console.log("\n❌ Hay problemas de calidad básica en i18n.");
    process.exit(1);
  }

  console.log(
    "\n✅ Auditoría básica terminada. Revisa manualmente los textos iguales al español.",
  );
}

const { usedKeys, dynamicPrefixes } = extractUsedKeysAndDynamicPrefixes();
const languages = loadLanguages();

if (MODE === "check") {
  runCheck({ languages, usedKeys, dynamicPrefixes });
}

if (MODE === "unused") {
  runUnused({ languages, usedKeys, dynamicPrefixes });
}

if (MODE === "audit") {
  runAudit({ languages, usedKeys, dynamicPrefixes });
}
