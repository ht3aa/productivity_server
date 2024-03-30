import fs from "fs";
import { WORKDATADIR } from "./constants";

export async function getAllLinesFromFiles(files: Array<string>): Promise<Array<string>> {
  const lines = await Promise.all(
    files.map((file: string) => {
      return new Promise((resolve) => {
        fs.readFile(WORKDATADIR + file, "utf8", (err, fileData) => {
          if (err) {
            console.error("Error occurred while reading the CSV file:", err);
            return;
          }

          resolve(fileData.trim().split("\n"));
        });
      });
    }),
  );

  return lines.flat() as Array<string>;
}



export async function getFilesNameFromDir(dir: string): Promise<Array<string>> {
  return new Promise((resolve) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
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
