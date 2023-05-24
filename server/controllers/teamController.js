const fs = require("fs");
const path = require("path");
const teamController = {};

teamController.getSetData = async (req, res, next) => {
  //fakeApiCall
  const location = path.resolve("set8Data.json");
  res.locals.setData = JSON.parse(fs.readFileSync(location));
  next();
};

module.exports = teamController;
