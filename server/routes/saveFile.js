/** @format */

import express from "express";
import fs from "fs";

const router = express.Router();

// const data_dir = "./uploads/";
const data_dir = "uploads";
// const files_list = fs.readdirSync(data_dir);

router.get("/", (req, res) => {
   res.send("no get request in here");
});

router.post("/:file_name", async (req, res) => {
   // const files_list = fs.readdirSync(data_dir, (err) => console.log(err));
   const files_list = fs.readdirSync("uploads", (err) => console.log(err));
   const file_name = req.params.file_name;

   console.log(`files_list ${files_list}`);

   if (files_list.includes(file_name)) {
      // const file_path = data_dir + file_name;
      const file_path = `./${data_dir}/${file_name}`;
      const raw_cards = req.body.cards;
      const file = JSON.parse(fs.readFileSync(file_path));
      const raw_data = { ...file, cards: raw_cards };
      const data = JSON.stringify(raw_data);

      fs.writeFileSync(file_path, data, (err) => {
         if (err) {
            console.log(err);
            return;
         }
      });

      res.send("saved 🐱‍👤");
   } else {
      console.log("no such file");
      res.send("error saving file");
      return;
   }
});

export default router;
