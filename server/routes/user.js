const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const { isLoggedIn } = require("../middleware");

router.post("/login", userController.login, (req, res) => {
  res.json(res.locals.isValid);
});

router.post("/signup", userController.signup);

router.get("/getChampion", userController.getChampion, (req, res) => {
  res.send(res.locals.champions);
});

router.get("/isLoggedin", isLoggedIn, (req, res) => {
  res.json(req.user);
});

router.get("/:username", userController.getUser, (req, res) => {
  res.json(res.locals.matches);
});

module.exports = router;
