/** @format */

import express from "express";
import fs from "fs";

const router = express.Router();

// const data_dir = "./uploads/";
const data_dir = "uploads/";

// async function getfileData(filePath) {
// async function getfileData(file_name) {
//    const files_list = fs.readdir(data_dir);
//    const file_path = data_dir + file_name;

//    console.log("file_list", files_list);
//    if (files_list.includes(file_name)) {
//       const data = fs.readFileSync(file_path);
//       const json = await JSON.parse(data);
//       return json;
//    } else {
//       return null;
//    }
// }

async function getfileData(fileName) {
   const filesList = fs.readdirSync(data_dir);
   const filePath = data_dir + fileName;

   if (filesList.includes(fileName)) {
      const data = fs.readFileSync(filePath);
      const json = await JSON.parse(data);
      return json;
   } else {
      return null;
   }
}

//manage status and all that
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
   const result = fs.readdirSync("uploads");
   res.send(result);
});

router.post("/", async (req, res) => {
   const fileName = req.body.filePath;
   const toSend = await getfileData(fileName);
   res.send(toSend);
});

export default router;
