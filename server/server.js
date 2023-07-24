require("dotenv").config(); //
/* eslint no-unused-vars: 0 */
const path = require("path");
const express = require("express");
const teamRouter = require("./routes/team");
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

const app = express();
const port = 3000;

const mongoURI = process.env.MONGO_URI; //grab database uri from .env variable

mongoose // connecting to mongo db
  .connect(mongoURI)
  .then(() => {
    console.log("connected to mongo");
  })
  .catch((e) => {
    console.log("Error connecting to mongo: " + e);
  });

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ MIDDLEWARE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
app.use(express.static(path.resolve(__dirname, "../dist"))); //serving webpack distributed file after built
app.use(
  cors({
    origin: ["http//localhost:3000", "http://127.0.0.1:5500"], // for webpack development server
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("client"));
app.use(
  //setting up session
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(process.env.SESSION_SECRET)); // parsing cookies

//initilaize passport
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ROUTER @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
app.use("/api/team", teamRouter); // router for handling all team related routes
app.use("/api/user", userRouter); // router for handling all user related routes

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ General error handling middleware @@@@@@@@@@@@@@@@@@@@@@@@
app.use(({ code, error, internalMessage }, req, res, next) => {
  if (internalMessage) {
    //
    console.log(internalMessage);
  }
  res.status(code).json({ error: error.message });
});

module.exports = app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
