/** @format */

import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/", (req, res) => {
   const files_list = fs.readdirSync("media", (err) => console.log(err));
   res.send(files_list);
});

router.post("/:file_name", async (req, res) => {
   //to delete an image
   const file_name = req.params.file_name;
});

export default router;
