/** @format */

import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const filesDir = "./uploads";

const createFile = (name, content) => {
   fs.writeFileSync(name, content, (err) => {
      if (err) {
         console.log("error creating the file :", err);
      } else {
         console.log("created successfully");
      }
   });
};

router.get("/", async (req, res) => {});

router.post("/", async (req, res) => {
   // const filePath = path.join(filesDir, req.body.fileName + '.json')
   const filePath = path.join(filesDir, req.body.fileName);
   const fileContent = {
      cards: {},
   };
   const content = await JSON.stringify(fileContent);
   createFile(filePath, content);

   res.send("new file created");
});

export default router;
