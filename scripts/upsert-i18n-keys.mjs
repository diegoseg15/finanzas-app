import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);

const APPLY = process.argv.includes("--apply");

const ROOT = process.cwd();
const LANGUAGE_DIR = path.join(ROOT, "src", "i18n", "languages");
const UPSERT_FILE = path.join(ROOT, "scripts", "i18n-upsert.json");

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

function setNestedValue(target, keyPath, value) {
  const parts = keyPath.split(".");
  let current = target;

  for (const part of parts.slice(0, -1)) {
    if (!current[part] || typeof current[part] !== "object") {
      current[part] = {};
    }

    current = current[part];
  }

  current[parts.at(-1)] = value;
}

function getNestedValue(target, keyPath) {
  const parts = keyPath.split(".");
  let current = target;

  for (const part of parts) {
    if (!current || typeof current !== "object" || !(part in current)) {
      return undefined;
    }

    current = current[part];
  }

  return current;
}

function formatTsObject(value) {
  return JSON.stringify(value, null, 2).replace(/"([^"]+)":/g, "$1:");
}

function writeLanguageFile(fileName, data) {
  const exportName = path.basename(fileName, ".ts");
  const filePath = path.join(LANGUAGE_DIR, fileName);

  const content = `export const ${exportName} = ${formatTsObject(data)} as const;\n`;

  fs.writeFileSync(filePath, content, "utf8");
}

function loadUpsertFile() {
  if (!fs.existsSync(UPSERT_FILE)) {
    throw new Error(`No existe ${UPSERT_FILE}`);
  }

  const raw = fs.readFileSync(UPSERT_FILE, "utf8");
  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed.items)) {
    throw new Error(
      "El archivo i18n-upsert.json debe tener una propiedad items: []",
    );
  }

  return parsed.items;
}

function validateItems(items) {
  const languageCodes = LANGUAGE_FILES.map((file) =>
    path.basename(file, ".ts"),
  );

  for (const item of items) {
    if (!item.key || typeof item.key !== "string") {
      throw new Error("Cada item debe tener key como string.");
    }

    if (!item.values || typeof item.values !== "object") {
      throw new Error(`La key ${item.key} debe tener values.`);
    }

    const missingLanguages = languageCodes.filter(
      (languageCode) => !(languageCode in item.values),
    );

    if (missingLanguages.length > 0) {
      throw new Error(
        `La key ${item.key} no tiene traducción para: ${missingLanguages.join(
          ", ",
        )}`,
      );
    }
  }
}

const items = loadUpsertFile();
validateItems(items);

const languageData = Object.fromEntries(
  LANGUAGE_FILES.map((fileName) => {
    const exportName = path.basename(fileName, ".ts");
    const filePath = path.join(LANGUAGE_DIR, fileName);

    if (!fs.existsSync(filePath)) {
      throw new Error(`No existe el archivo de idioma: ${filePath}`);
    }

    return [exportName, loadTsExportedConst(filePath, exportName)];
  }),
);

console.log("\nCambios detectados:");

for (const item of items) {
  console.log(`\n${item.key}`);

  for (const [languageCode, data] of Object.entries(languageData)) {
    const previousValue = getNestedValue(data, item.key);
    const nextValue = item.values[languageCode];

    const action = previousValue === undefined ? "crear" : "actualizar";

    console.log(`  - ${languageCode}: ${action}`);

    if (APPLY) {
      setNestedValue(data, item.key, nextValue);
    }
  }
}

if (!APPLY) {
  console.log("\nModo revisión. No se modificó ningún archivo.");
  console.log("Para aplicar los cambios ejecuta:");
  console.log("pnpm i18n:upsert -- --apply");
  process.exit(0);
}

for (const fileName of LANGUAGE_FILES) {
  const exportName = path.basename(fileName, ".ts");
  writeLanguageFile(fileName, languageData[exportName]);
}

console.log("\n✅ Traducciones aplicadas.");
console.log("Ahora corre:");
console.log("pnpm i18n:check");
console.log("pnpm i18n:audit");
console.log("pnpm typecheck");
