const express = require("express");
const teamController = require("../controllers/teamController");
const router = express.Router();
const { isLoggedIn } = require("../middleware");

router.get(
  // this route returns  data from setData.json and is called whenever a user go to /builder page
  "/setData",
  isLoggedIn,
  teamController.getSetData,
  (req, res, next) => {
    res.json(res.locals.setData);
  }
);

router.post(
  //this route let a user add a team (inside of the request body) to the database (create)
  "/addTeam",
  isLoggedIn,
  teamController.addTeam,
  (req, res, next) => {
    res.json(res.locals.teams);
  }
);

router.get("/getteam", isLoggedIn, teamController.getTeam, (req, res, next) => {
  // this route returns all the team associated with the logged in user  (read)
  res.json(res.locals.teams);
});

router.patch("/edit/:id", teamController.editTeam, (req, res, next) => {
  // this route let a user edit an existing team (the team is find through it id passed in through the reques params) (update)
  res.json(res.locals.teams);
});

router.delete("/delete/:id", teamController.deleteTeam, (req, res, next) => {
  // this route let a user delete an existing team (the team is find through it id passed in through the reques params) (delete)
  res.json(res.locals.teams);
});

module.exports = router;
