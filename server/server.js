require("dotenv").config();
/* eslint no-unused-vars: 0 */
const path = require("path");
const express = require("express");
const teamRouter = require("./routes/team");
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

const mongoURI = "mongodb://127.0.0.1/tftBuilder";

mongoose.connect(mongoURI).then(() => {
  console.log("connected");
});

app.use(express.static(path.resolve(__dirname, "../dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("client"));
app.use(cookieParser());

app.use("/api/team", teamRouter);
app.use("/api/user", userRouter);

// app.post("/api/team", controller.createTeam)

app.use(({ code, error }, req, res, next) => {
  res.status(code).json({ error: error.message });
});

module.exports = app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
