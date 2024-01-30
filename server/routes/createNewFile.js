/** @format */

import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

import { ROUTES } from "../constants.js";

const createFile = (name, content) => {
   fs.writeFileSync(name, content, (err) => {
      if (err) {
         console.log("error creating the file :", err);
      } else {
         console.log("created successfully");
      }
   });
};

router.post("/", async (req, res) => {
   const filePath = path.join(ROUTES.UPLOADS, req.body.fileName);
   const fileContent = {
      cards: {},
   };
   const content = JSON.stringify(fileContent);
   createFile(filePath, content);
});

export default router;
