/** @format */

import express from "express";
import bodyParser from "body-parser";
import Cors from "cors";

import files from "./routes/files.js";
import selectFile from "./routes/selectFile.js";
import saveFile from "./routes/saveFile.js";
import createNewFile from "./routes/createNewFile.js";
import saveImg from "./routes/saveImg.js";
import deleteImg from "./routes/deleteImg.js";
import imagesList from "./routes/imagesList.js";

let port = process.argv[2] || 3000;

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

app.use("/files", files);
app.use("/select_file", selectFile);
app.use("/save_file", saveFile);
app.use("/createNewFile", createNewFile);
app.use("/saveImage", saveImg);
app.use("/deleteImage", deleteImg);
app.use("/imagesList", imagesList);

app.listen(port);
