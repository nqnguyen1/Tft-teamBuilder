const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/login", userController.login, (req, res, next) => {
  res.json(res.locals.isValid);
});

router.post("/signup", userController.signup);

router.get("/:username", userController.getUser);

module.exports = router;
