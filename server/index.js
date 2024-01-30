/** @format */
let port = process.argv[2] || 3000;

import app from "./appConfig.js";

app.listen(port);
