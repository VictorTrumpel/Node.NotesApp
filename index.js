require("dotenv").config();
const express = require("express");
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");
const router = require("./src/router/router");
const { connectToDb } = require("./src/midellware/connectToDb");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.set("view engine", "njk");
app.use(express.json());
app.use(express.static("views"));
app.use(cookieParser());
app.use(connectToDb);
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
