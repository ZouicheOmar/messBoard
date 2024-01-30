/** @format */

import express from "express";
import multer from "multer";
import sizeOf from "image-size";

const router = express.Router();

import { upload } from "../multerConfig.js";

router.post("/:id", async function (req, res) {
   await upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
         console.log(err);
         res.send("problem");
      } else if (err) {
         console.log("other type of error", err);
         res.send("problem");
      } else {
         const id = req.params.id;
         const image_path = "media/" + id;

         let width;
         let height;

         sizeOf(image_path, (err, dimension) => {
            if (err) {
               console.log("error reading image size", err);
            } else {
               width = dimension.width;
               height = dimension.height;

               res.send({
                  message: "image saved",
                  id: id,
                  dimension: {
                     width: width,
                     height: height,
                  },
               });
            }

            return;
         });

         return;
      }
   });
});

export default router;
