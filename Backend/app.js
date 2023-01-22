const express = require("express");
const app = express();
const path = require("path");

//Enviroment config
require("dotenv").config({ path: __dirname + "/Config/config.env" });

app.use(express.json());

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../Frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../Frontend/build/index.html"));
  });
}

module.exports = app;
