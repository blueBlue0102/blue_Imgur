const express = require("express");
const path = require("path");

const app = express();

require("dotenv").config();
require("./routers/index")(app);

app.use(express.static(path.join(__dirname, process.env.IMAGE_STORAGE_PATH)));
app.use(express.static("dist"));
app.set("views", "./views");
app.set("view engine", "ejs");

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
