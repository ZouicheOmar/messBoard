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

import { CORS_OPTIONS, ROUTES, STATIC_SERVE } from "./constants.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(STATIC_SERVE));
app.use(Cors(CORS_OPTIONS));

app.use(ROUTES.FILES_LIST, files);
app.use(ROUTES.SELECT_FILE, selectFile);
app.use(ROUTES.SAVE, saveFile);
app.use(ROUTES.CREATE, createNewFile);
app.use(ROUTES.SAVE_IMAGE, saveImg);
app.use(ROUTES.DELETE_IMAGE, deleteImg);
app.use(ROUTES.IMAGES_LIST, imagesList);

export default app;
