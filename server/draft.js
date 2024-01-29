/** @format */
import fs from "fs";

const data_dir = "./uploads/";

async function getfileData(fileName) {
   const filesList = fs.readdirSync(data_dir);
   const filePath = data_dir + fileName;

   if (filesList.includes(fileName)) {
      console.log("fileList includes filneName");
      const data = fs.readFileSync(filePath);
      const json = await JSON.parse(data);
      return json;
   } else {
      return null;
   }
}

// const file_name = req.params.file_name;
// const file_path = data_dir + file_name;

// // const data = await getfileData(file_path)
//    const data = await getfileData(file_name);
//    if (data !== null) {
//        res.send(data);
//    } else {
//       console.log("problem in readFile, data", data);
//    }

async function geter(fileName) {
   const data = await getfileData(fileName);

   if (data !== null) {
      console.log(data);
   } else {
      console.log("problem in readFile, data", data);
   }
}

async function poster(filePath) {
   console.clear();
   const toSend = await getfileData(filePath);

   console.log("toSend", toSend);
   //    res.send(toSend);
}

const fileName = "newYork";
// geter(fileName);

const f = () => {
   let obj = {
      width: 600,
      height: 199,
      folded: false,
   };

   const { width, height, folded } = obj;

   let finalSize = {
      width: obj.width,
      height: obj.height,
   };

   if (!folded) {
      if (height >= 200) {
         finalSize = {
            ...finalSize,
            height: 200,
         };
      }
   } else {
      finalSize = {
         height: 56,
         width: finalSize.width,
      };
   }

   if (width >= 300) {
      finalSize = {
         ...finalSize,
         width: 300,
      };
   }

   console.log("final size", finalSize);
};

function g() {
    const file = JSON.parse(fs.readFileSync("media/images.json"))
console.log(file)

}

g();
