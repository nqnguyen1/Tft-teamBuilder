const fs = require("fs");
const path = require("path");
const teamController = {};
const Team = require("../models/team");
const User = require("../models/user");

teamController.getSetData = async (req, res, next) => {
  const location = path.resolve("setData.json");
  res.locals.setData = JSON.parse(fs.readFileSync(location));
  next();
};

teamController.getTeam = async (req, res, next) => {
  const currUser = await User.findOne({ username: req.user.username });
  const team = await currUser.populate("team_id");
  res.locals.teams = team.team_id;
  next();
};

teamController.addTeam = async (req, res, next) => {
  const currUser = await User.findOne({ username: req.user.username });
  const newTeam = await Team.create({ comp: [...req.body] });
  currUser.team_id.push(newTeam._id);
  await currUser.save();
  const team = await currUser.populate("team_id");
  res.locals.teams = team.team_id;
  next();
};

teamController.editTeam = async (req, res, next) => {
  const currUser = await User.findOne({ username: req.user.username });
  const beforeUpdatedTeam = await Team.findOneAndUpdate(
    { _id: req.params.id },
    { comp: [...req.body] }
  );

  const team = await currUser.populate("team_id");
  res.locals.teams = team.team_id;
  next();
};

teamController.deleteTeam = async (req, res, next) => {
  const currUser = await User.findOne({ username: req.user.username });
  const currTeam = await Team.findOne({ _id: req.params.id });
  currUser.team_id = currUser.team_id.filter((x) => {
    return JSON.stringify(currTeam._id) !== JSON.stringify(x);
  });

  currUser.save();
  const team = await currUser.populate("team_id");
  res.locals.teams = team.team_id;
  next();
};

module.exports = teamController;
