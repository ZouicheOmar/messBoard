/** @format */

import express from "express";
import fs from "fs";

const router = express.Router();

const configureData = async () => {
   const data = fs.readdirSync("uploads", (err) => console.log(err));
   return data;
};

router.get("/", async (req, res) => {
   const data = await configureData();
   res.send(data);
});

export default router;
