/** @format */

import express from "express";
import fs from "fs";

import { STATIC_SERVE } from "../constants.js";
import path from "path";

const router = express.Router();

router.post("/:id", async (req, res) => {
   const { id } = req.params;
   const filePath = path.join(STATIC_SERVE, id);

   fs.unlink(filePath, (err) => {
      if (err) {
         console.log("error deleting file");
         //res.error...
         //res.status
         return;
      } else {
         res.send("deleted succesfully");
      }
   });
});

export default router;
