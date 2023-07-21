require("dotenv").config();
/* eslint no-unused-vars: 0 */
const fs = require("fs");
const path = require("path");
const express = require("express");
const teamRouter = require("./routes/team");
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local");
const session = require("express-session");

const app = express();
const port = 3000;

const mongoURI = "mongodb://127.0.0.1/tftBuilder";

mongoose.connect(mongoURI).then(() => {
  console.log("connected");
});

//middleware
app.use(express.static(path.resolve(__dirname, "../dist")));
app.use(
  cors({
    origin: ["http//localhost:3000", "http://127.0.0.1:5500"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("client"));
app.use(
  session({
    secret: "THISISASECRET",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("THISISASECRET"));
app.use(passport.initialize());
app.use(passport.session());

require("./passportConfig")(passport);

app.use("/api/team", teamRouter);
app.use("/api/user", userRouter);

// app.post("/api/team", controller.createTeam)

app.use(({ code, error }, req, res, next) => {
  res.status(code).json({ error: error.message });
});

module.exports = app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
