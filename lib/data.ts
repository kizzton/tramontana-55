import fs from "fs";
import path from "path";
import Papa from "papaparse";

export async function getExpenses() {
  const filePath = path.join(process.cwd(), "data/movimientos.csv");

  const file = fs.readFileSync(filePath, "utf8");

  const result = Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
  });

  return result.data.map((row: any) => ({
    ...row,
    Coste: Number(
      String(row.Coste)
        .replace(/\./g, "")
        .replace(",", ".")
    ),
  }));
}