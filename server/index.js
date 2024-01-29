/** @format */

import express from "express";
import bodyParser from "body-parser";
import Cors from "cors";
import fs from "fs";
import getPort from "get-port";
import boot from "./routes/boot.js";
import selectFile from "./routes/selectFile.js";
import saveFile from "./routes/saveFile.js";
import createNewFile from "./routes/createNewFile.js";
import saveImg from "./routes/saveImg.js";
import deleteImg from "./routes/deleteImg.js";
import imagesList from "./routes/imagesList.js";
import { resolve } from "path";

// const port = process.argv[2];
let port = process.argv[2] || 3000;

//console.log(`got from process ${process.argv[2]}`);

// const port = 3000;
const dataDir = "./uploads";
// const dataDir = process.argv[2] ? "server/uploads" : "uploads"
const corsOption = {
   origin: "*",
   credentials: true,
   optionSuccessStatus: 200,
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("media"));
app.use(Cors(corsOption));

app.use("/boot", boot);
app.use("/select_file", selectFile);
app.use("/save_file", saveFile);
app.use("/createNewFile", createNewFile);
app.use("/saveImage", saveImg);
app.use("/deleteImage", deleteImg);
app.use("/imagesList", imagesList);

app.get("/files", async (req, res) => {
   const data = await configureData();
   res.send(data);
});

const configureData = async () => {
   const data = fs.readdirSync("uploads", (err) => console.log(err));
   return data;
};

const getCurrentDirFiles = () => {
   const files = fs.readdirSync("uploads", (err) => console.log(err));
   const data = JSON.stringify(files);
};

const getPackageJson = () => {
   const packageJsonFileData = fs.readFileSync("package.json");
   const packagejson = JSON.parse(packageJsonFileData);
   return packagejson;
};

const getJsonWithPath = (path) => {
   const packageJsonFileData = fs.readFileSync(path);
   const packageJson = JSON.parse(packageJsonFileData);
};

app.listen(port);
