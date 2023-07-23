const fs = require("fs");
const path = require("path");
const teamController = {};
const Team = require("../models/team");
const User = require("../models/user");

teamController.getSetData = async (req, res, next) => {
  //return set data from setData that needs to be regenerated every new set
  try {
    const location = path.resolve("./setData/setData.json");
    res.locals.setData = JSON.parse(fs.readFileSync(location));
    next();
  } catch (e) {
    next({
      code: 500,
      error: {
        message: "Unexpected error was encountered on the server",
      },
      internalMessage: {
        from: "teamController.getSetData",
        e,
      },
    });
  }
};

teamController.getTeam = async (req, res, next) => {
  // return all the team under the signed in user, first we find the user then we populate all the team under the user
  try {
    const currUser = await User.findOne({ username: req.user.username });
    const team = await currUser.populate("team_id");
    res.locals.teams = team.team_id;
    next();
  } catch (e) {
    next({
      code: 500,
      error: {
        message: "Unexpected error was encountered on the server",
      },
      internalMessage: {
        from: "teamController.getTeam",
        e,
      },
    });
  }
};

teamController.addTeam = async (req, res, next) => {
  // add team to logged in user list of team
  try {
    const currUser = await User.findOne({ username: req.user.username });
    const newTeam = await Team.create({ comp: [...req.body] });
    currUser.team_id.push(newTeam._id);
    await currUser.save();
    const team = await currUser.populate("team_id");
    res.locals.teams = team.team_id;
    next();
  } catch (e) {
    next({
      code: 500,
      error: {
        message: "Unexpected error was encountered on the server",
      },
      internalMessage: {
        from: "teamController.addTeam",
        e,
      },
    });
  }
};

teamController.editTeam = async (req, res, next) => {
  // edit an existing team (find by the team id sent as the request params)
  try {
    const currUser = await User.findOne({ username: req.user.username });
    const beforeUpdatedTeam = await Team.findOneAndUpdate(
      { _id: req.params.id },
      { comp: [...req.body] }
    );

    const team = await currUser.populate("team_id");
    res.locals.teams = team.team_id;
    next();
  } catch (e) {
    next({
      code: 500,
      error: {
        message: "Unexpected error was encountered on the server",
      },
      internalMessage: {
        from: "teamController.editTeam",
        e,
      },
    });
  }
};

teamController.deleteTeam = async (req, res, next) => {
  // delete an existing team (find by the team id sent as the request params)
  try {
    const currUser = await User.findOne({ username: req.user.username });
    const currTeam = await Team.findOne({ _id: req.params.id });
    currUser.team_id = currUser.team_id.filter((x) => {
      return JSON.stringify(currTeam._id) !== JSON.stringify(x);
    });

    currUser.save();
    const team = await currUser.populate("team_id");
    res.locals.teams = team.team_id;
    next();
  } catch (e) {
    next({
      code: 500,
      error: {
        message: "Unexpected error was encountered on the server",
      },
      internalMessage: {
        from: "teamController.deleteTeam",
        e,
      },
    });
  }
};

module.exports = teamController;
