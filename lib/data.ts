import fs from "fs";
import path from "path";
import Papa from "papaparse";

export async function getExpenses() {
  const filePath = path.join(process.cwd(), "data/gastos.csv");

  const file = fs.readFileSync(filePath, "utf8");

  const result = Papa.parse(file, {
    header: true,
    dynamicTyping: true,
  });

  return result.data;
}