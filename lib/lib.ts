import fs from "fs";
import { WORKDATADIR } from "./constants";
import { LanguagesAndThereProductivityType, ProductivityDataObjectType } from "./types";
import { myDataSource } from "../typeorm.config";

export async function getAllLinesFromFiles(files: Array<string>): Promise<Array<string>> {
  const lines = await Promise.all(
    files.map((file: string) => {
      return new Promise((resolve) => {
        fs.readFile(WORKDATADIR + file, "utf8", (err, fileData) => {
          if (err) {
            console.error("Error occurred while reading the CSV file:", err);
            return;
          }

          resolve(fileData == "" ? [] : fileData.trim().split("\n"));
        });
      });
    }),
  );

  return lines.flat() as Array<string>;
}

export async function getFilesNameFromDir(
  dir: string,
  except: Array<string>,
): Promise<Array<string>> {
  return new Promise((resolve) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }

      if (except.length > 0) {
        files = files.filter((file) => !except.includes(file));
      }
      resolve(files);
    });
  });
}

export function checkFolderIfExists(folderName: string) {
  if (!fs.existsSync(folderName)) {
    console.log(`Folder ${folderName} does not exist.`);
  }
}

export function serializeCSVToObject(line: string, dim: string) {
  const splittedLine = line.split(dim);

  const obj: ProductivityDataObjectType = {
    year: +splittedLine[0] || 0,
    month: +splittedLine[1] || 0,
    day: +splittedLine[2] || 0,
    hour: +splittedLine[3] || 0,
    minute: +splittedLine[4] || 0,
    second: +splittedLine[5] || 0,
    productivitySeconds: +splittedLine[6] || 0,
    timeSpentInLvim: +splittedLine[7] || 0,
    timeSpentThinkingOrSearching: +splittedLine[8] || 0,
    projectPath: splittedLine[9] || "",
    commitMsg: splittedLine[10] || "",
    languagesAndThereProductivity: splittedLine[11] || "",
  };

  return obj;
}

export function serializeLanguagesDataToObjects(line: string, dim: string) {
  const splittedLine = line.split(dim);

  return splittedLine.map((element) => {
    const [language, productivity] = element.split("=");

    const obj: LanguagesAndThereProductivityType = {
      language: language,
      productivity: +productivity,
    };

    return obj;
  });
}

export function serializeCSVsToObjects(
  lines: Array<string>,
  dim: string,
): Array<ProductivityDataObjectType> {
  const arr: Array<ProductivityDataObjectType> = [];

  for (let i = 0; i < lines.length; i++) {
    arr.push(serializeCSVToObject(lines[i], dim));
  }

  return arr;
}

export async function emptyFiles(files: Array<string>) {
  files.forEach(async (file) => {
    fs.writeFileSync(WORKDATADIR + file, "");
  });
}

export function serializeObjectToCSV(line: ProductivityDataObjectType) {
  return `${line.year},${line.month},${line.day},${line.hour},${line.minute},${line.second},${line.productivitySeconds},${line.projectPath},${line.commitMsg}`;
}

export function serializeObjectsToCSV(arr: Array<ProductivityDataObjectType>) {
  let csv: Array<string> = [];
  arr.forEach((line) => {
    csv.push(serializeObjectToCSV(line));
  });
  return csv;
}
