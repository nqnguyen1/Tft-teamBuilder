const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/login", userController.login, (req, res) => {
  res.json(res.locals.isValid);
});

router.post("/signup", userController.signup);

router.get("/getChampion", userController.getChampion, (req, res) => {
  res.send(res.locals.champions);
});

router.get("/:username", userController.getUser, (req, res) => {
  res.json(res.locals.matches);
});

module.exports = router;
