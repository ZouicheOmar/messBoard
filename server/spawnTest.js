/** @format */
import express from "express";
import getPort from "get-port";

const app = express();

app.get("/", (req, res) => {
   res.send("hello");
});

app.get("/serve", (req, res) => {
   res.send("we re still serving");
});

function startServer() {
   getPort()
      .then((res) => {
         app.listen(res, () => {
            process.stdout.write(`${res}`);
         });
      })
      .catch((err) => {
         console.log("in error");
      });
}

startServer();
