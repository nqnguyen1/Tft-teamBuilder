const express = require("express");
const teamController = require("../controllers/teamController");
const router = express.Router();
const { isLoggedIn } = require("../middleware");

router.get("/set8Data", teamController.getSetData, (req, res, next) => {
  res.json(res.locals.setData);
});

router.get("/getteam", isLoggedIn, teamController.getTeam, (req, res, next) => {
  res.json(res.locals.teams);
});

router.post("/addTeam", teamController.addTeam, (req, res, next) => {
  res.json(res.locals.teams);
});

router.post("/delete/:id", teamController.deleteTeam, (req, res, next) => {
  res.json(res.locals.teams);
});

module.exports = router;
