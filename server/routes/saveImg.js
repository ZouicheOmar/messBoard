/** @format */

import express from "express";
import multer, { MulterError } from "multer";
import sizeOf from "image-size";

const router = express.Router();

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "media/");
   },
   filename: function (req, file, cb) {
      const id = req.params.id;
      return cb(null, id);
   },
});

const upload = multer({ storage: storage }).single("image");

router.get("/", (req, res) => {
   res.send("no get request in here");
});

router.post("/:id", async function (req, res) {
   // const filename = await upload(req, res, function (err) {
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
               console.log(
                  "image dimensions",
                  dimension.width,
                  dimension.height
               );

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
