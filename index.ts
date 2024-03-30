import express from "express";
import { checkFolderIfExists, getAllLinesFromFiles, getFilesNameFromDir } from "./lib/utils";
import { WORKDATADIR } from "./lib/constants";
import cors from "cors";

const app = express();

checkFolderIfExists(WORKDATADIR);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/getData", async (req, res) => {

  const files = await getFilesNameFromDir(WORKDATADIR);
  const lines = await getAllLinesFromFiles(files);
  res.send({ data: lines });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});



