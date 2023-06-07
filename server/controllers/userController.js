const fs = require("fs");
const userController = {};
const path = require("path");
const User = require("../models/user");
const passport = require("passport");

const minePUUID =
  "DQDmFZDr207lv8KQGMi1BuboT3-XH0my8gPkHnNzkaxm9XuiN0MCP_PCW1Xyg573l2JEvtBNkOnycw";

const fetchAndParse = async (linkToBeFetched) => {
  console.log(linkToBeFetched);
  const res = await fetch(linkToBeFetched);
  return res.json();
};

const getMatchHistory = async (puuid) => {
  return fetchAndParse(
    `https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=` +
      process.env.RIOT_API_KEY
  );
};

const getMatchData = async (matchId) => {
  return fetchAndParse(
    `https://americas.api.riotgames.com/tft/match/v1/matches/${matchId}?api_key=${process.env.RIOT_API_KEY}`
  );
};

const getUserByPUUID = async (puuid) => {
  return fetchAndParse(
    `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${puuid}?api_key=` +
      process.env.RIOT_API_KEY
  );
};

const getUserByName = async (name) => {
  return fetchAndParse(
    `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${name}?api_key=` +
      process.env.RIOT_API_KEY
  );
};

userController.getUser = async (req, res, next) => {
  //fakeApiCall
  console.log("IN HERE");
  const location = path.resolve("test.json");
  res.locals.matches = JSON.parse(fs.readFileSync(location));
  next();
};

// userController.getUser = async (req, res, next) => {
//   console.log(process.env.RIOT_API_KEY);
//   //real live serv
//   const userData = await getUserByName(req.params.username);
//   console.log(userData);
//   const matchId = await getMatchHistory(userData.puuid);
//   const matchesData = [];

//   for (const id of matchId) {
//     const matchData = await getMatchData(id);
//     const playersData = [];
//     for (const data of matchData.info.participants) {
//       const player = {};
//       const account = await getUserByPUUID(data.puuid);
//       player.name = account.name;
//       player.placement = data.placement;
//       player.traits = data.traits;
//       player.units = data.units.map((unit) => {
//         return {
//           name: unit.character_id,
//           items: unit.itemNames,
//           path: `/champions/${unit.character_id}`,
//         };
//       });
//       playersData.push(player);
//     }
//     matchesData.push(playersData);
//   }

//   res.locals.matches = matchesData;
//   next();
// };

userController.login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (!user) res.json("no user exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;

        res.json(req.user);
      });
    }
  })(req, res, next);
};

userController.signup = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.create({ username, password });
  req.logIn(user, (err) => {
    if (err) throw err;
    res.json(user);
  });
};

module.exports = userController;
