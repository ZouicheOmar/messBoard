/** @format */

import express from "express";
import fs from "fs";

const router = express.Router();
import { ROUTES } from "../constants.js";
import path from "path";

async function getfileData(fileName) {
   const filesList = fs.readdirSync(ROUTES.UPLOADS);
   const filePath = path.join(ROUTES.UPLOADS, fileName);

   if (filesList.includes(fileName)) {
      const data = fs.readFileSync(filePath);
      const json = await JSON.parse(data);
      return json;
   } else {
      return null;
   }
}

router.get("/:file_name", async (req, res) => {
   const fileName = req.params.file_name;
   const data = await getfileData(fileName);

   if (data !== null) {
      res.send(data);
   } else {
      console.log("problem in readFile, data", data);
   }
});

router.get("/", async (req, res) => {
   const result = fs.readdirSync(ROUTES.UPLOADS);
   res.send(result);
});

router.post("/", async (req, res) => {
   const fileName = req.body.filePath;
   const toSend = await getfileData(fileName);
   res.send(toSend);
});

export default router;
