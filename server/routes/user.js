const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const { isLoggedIn } = require("../middleware");

router.post("/login", userController.login); //logging in route

router.post("/signup", userController.signUp); // signup route

router.post("/logout", userController.signOut); // signing out route

router.get("/getChampion", userController.getChampion, (req, res) => {
  // get the list of champions for this set
  res.send(res.locals.champions);
});

router.get("/isLoggedin", isLoggedIn, (req, res) => {
  // this route check if the user is logged in or not (will return 401 status code if they are because of the isLoggedIn middleware, but will return true if they are
  res.json(true);
});

router.get("/:username", isLoggedIn, userController.getUser, (req, res) => {
  // THIS ROUTE MUST BE THE LAST ROUTE TO BE CHECKED BECAUSE OF THE DYNAMIC PARAMETER
  // grab the user 3 latest matches information (3 for now because of riot api limit)
  res.json(res.locals.matches);
});

module.exports = router;
