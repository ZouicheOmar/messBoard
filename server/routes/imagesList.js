/** @format */

import express from "express";
import fs from "fs";

import { STATIC_SERVE } from "../constants.js";

const router = express.Router();

router.get("/", (req, res) => {
   const files_list = fs.readdirSync(STATIC_SERVE, (err) => console.log(err));
   res.send(files_list);
});

export default router;
