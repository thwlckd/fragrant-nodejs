const express = require("express");
const path = require("path");

const { viewRouter } = require("./routes");

const app = express();

app.use("/", express.static(path.join(__dirname, "./views/public")));
app.use("/", viewRouter);

module.exports = app;
