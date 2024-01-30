/** @format */

import multer from "multer";

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "media/");
   },
   filename: function (req, file, cb) {
      const id = req.params.id;
      return cb(null, id);
   },
});

export const upload = multer({ storage: storage }).single("image");
