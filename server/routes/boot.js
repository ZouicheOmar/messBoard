/** @format */

import express from "express";
import fs from "fs";

const router = express.Router();

const dataDir = "./uploads";
const main_file_path = "./uploads/greenboardA";

router.post("/", async (req, res) => {
   const new_cards = req.body;
   const file = JSON.parse(fs.readFileSync(main_file_path));
   const modified_data = { ...file, cards: new_cards };
   const data_to_write = JSON.stringify(modified_data);
   fs.writeFileSync(main_file_path, data_to_write);
   res.send("data recieved 🐱‍👤");
});

export default router;
