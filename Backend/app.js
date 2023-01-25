const express = require("express");
const app = express();
const path = require("path");
const errorMiddleware = require("./Middleware/errorMiddleware");

//Enviroment config
require("dotenv").config({ path: __dirname + "/Config/config.env" });

app.use(express.json());

const QuestionRoute = require("./Routes/QuestionRoute");
const SystemRoute = require("./Routes/SystemRoute");
const ExamRoute = require("./Routes/ExamRoute");
const AdminRoute = require("./Routes/AdminRoute");

app.use("/api/v1", QuestionRoute);
app.use("/api/v1", SystemRoute);
app.use("/api/v1", ExamRoute);
app.use("/api/v1", AdminRoute);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../Frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../Frontend/build/index.html"));
  });
}

//Middlewre for error
app.use(errorMiddleware);

module.exports = app;
