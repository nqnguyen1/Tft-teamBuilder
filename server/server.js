require("dotenv").config();
/* eslint no-unused-vars: 0 */
const path = require("path");
const express = require("express");
const userController = require("./controllers/userController");

const app = express();
const port = 3000;

app.use(express.static(path.resolve(__dirname, "../dist")));
app.use(express.json());

app.get("/api/user/:username", userController.getUser, (req, res, next) => {
  res.json(res.locals.matches);
});

// app.post("/api/team", controller.createTeam)

app.use(({ code, error }, req, res, next) => {
  res.status(code).json({ error: error.message });
});

module.exports = app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
