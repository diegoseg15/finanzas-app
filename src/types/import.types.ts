import { CreateMovementInput } from "@/types/finance.types";

export type CsvMovementImportRow = {
  Fecha?: string;
  Tipo?: string;
  Cuenta?: string;
  Categoría?: string;
  Monto?: string;
  Moneda?: string;
  Nota?: string;
};

export type MovementImportPreviewItem = {
  rowIndex: number;
  raw: CsvMovementImportRow;
  input?: CreateMovementInput;
  status: "valid" | "invalid" | "duplicate";
  errors: string[];
  fingerprint?: string;
};

export type MovementImportResult = {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  duplicateRows: number;
  items: MovementImportPreviewItem[];
};
