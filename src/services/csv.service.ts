type CsvValue = string | number | boolean | null | undefined;

export type CsvColumn<TItem> = {
  header: string;
  value: (item: TItem) => CsvValue;
};

function escapeCsvValue(value: CsvValue) {
  if (value === null || value === undefined) {
    return "";
  }

  const stringValue = String(value);

  const shouldEscape =
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n") ||
    stringValue.includes("\r");

  const escapedValue = stringValue.replace(/"/g, '""');

  return shouldEscape ? `"${escapedValue}"` : escapedValue;
}

export function buildCsv<TItem>(params: {
  columns: CsvColumn<TItem>[];
  rows: TItem[];
}) {
  const { columns, rows } = params;

  const headerRow = columns
    .map((column) => escapeCsvValue(column.header))
    .join(",");

  const bodyRows = rows.map((row) =>
    columns.map((column) => escapeCsvValue(column.value(row))).join(","),
  );

  return [headerRow, ...bodyRows].join("\n");
}

export function buildCsvSection<TItem>(params: {
  title: string;
  columns: CsvColumn<TItem>[];
  rows: TItem[];
}) {
  const { title, columns, rows } = params;

  return [
    title,
    buildCsv({
      columns,
      rows,
    }),
  ].join("\n");
}
