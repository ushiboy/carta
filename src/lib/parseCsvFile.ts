import Papa from "papaparse";

export function parseCsvFile(file: File): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    Papa.parse<string[]>(file, {
      skipEmptyLines: true,
      complete(results) {
        resolve(results.data);
      },
      error(error) {
        reject(error);
      },
    });
  });
}
