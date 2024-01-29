/** @format */
import fs from "fs";
import getPort from "get-port";

const getPackageJson = () => {
   const packageJsonFileData = fs.readFileSync("package.json");
   const packagejson = JSON.parse(packageJsonFileData);
   return packagejson;
};

const main = async () => {
   const packagejson = getPackageJson();
   const port = await getPort();
   if (port) {
      const newData = {
         ...packagejson,
         config: {
            ...packagejson.config,
            serverPath: port,
         },
      };

      const newPackageJson = JSON.stringify(newData);

      fs.writeFileSync("package.json", newPackageJson, (err) => {
         if (err) {
            console.log(err);
            return;
         }
      });
   } else {
      console.log("erro handling this");
   }
};

main();
