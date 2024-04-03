import express from "express";
import {
  checkFolderIfExists,
  emptyFiles,
  getAllLinesFromFiles,
  getFilesNameFromDir,
  serializeCSVToObject,
  serializeCSVsToObjects,
  serializeLanguagesDataToObjects,
} from "./lib/lib";
import { WORKDATADIR } from "./lib/constants";
import cors from "cors";
import { Productivity } from "./entities/productivity.entity";
import { myDataSource } from "./typeorm.config";
import { Languages } from "./entities/language.entity";

const app = express();

checkFolderIfExists(WORKDATADIR);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/getData", async (req, res) => {
  const files = await getFilesNameFromDir(WORKDATADIR, []);
  const lines = await getAllLinesFromFiles(files);
  res.send({ data: lines });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

async function testing() {
  const files = await getFilesNameFromDir(WORKDATADIR, ["lvim.csv"]);
  const lines = serializeCSVsToObjects(await getAllLinesFromFiles(files), ",");

  // await myDataSource.initialize();

  lines.forEach(async (line) => {
    const newProductivityRow = new Productivity();

    newProductivityRow.year = line.year;
    newProductivityRow.month = line.month;
    newProductivityRow.day = line.day;
    newProductivityRow.hour = line.hour;
    newProductivityRow.minute = line.minute;
    newProductivityRow.seconds = line.second;
    newProductivityRow.totalProductivityInSeconds = line.productivitySeconds;
    newProductivityRow.totalTimeInVim = line.timeSpentInLvim;
    newProductivityRow.totalTimeSpentThinkingOrSearching = line.timeSpentThinkingOrSearching;
    newProductivityRow.projectPath = line.projectPath;
    newProductivityRow.commitMsg = line.commitMsg;

    await myDataSource.getRepository("productivity").save(newProductivityRow);
    serializeLanguagesDataToObjects(line.languagesAndThereProductivity, "_").forEach(
      async (line) => {
        const newLanguagesRow = new Languages();
        newLanguagesRow.language = line.language;
        newLanguagesRow.productivityInSeconds = line.productivity;
        newLanguagesRow.productivity = newProductivityRow;

        await myDataSource.getRepository("languages").save(newLanguagesRow);
      },
    );
  });


  if (lines.length > 0) {
    emptyFiles(files);
  }
}

testing();
