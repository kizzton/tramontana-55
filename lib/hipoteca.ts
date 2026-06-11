import fs from "fs";
import path from "path";
import Papa from "papaparse";

export async function getMortgageConfig() {

  const filePath = path.join(
    process.cwd(),
    "data/hipoteca.csv"
  );

  const file = fs.readFileSync(
    filePath,
    "utf8"
  );

  const result = Papa.parse(file, {
    header: true,
    dynamicTyping: true,
  });

  const config: Record<
    string,
    string | number
  > = {};

  result.data.forEach((row: any) => {
    config[row.Concepto] = row.Valor;
  });

  return config;
}