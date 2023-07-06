const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const { viewRouter } = require("./routes");

require("dotenv").config();

const { MONGODB_ADDRESS } = process.env;

const app = express();

app.use("/", express.static(path.join(__dirname, "./views/public")));
app.use("/", viewRouter);

mongoose.connect(MONGODB_ADDRESS);

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

module.exports = app;
