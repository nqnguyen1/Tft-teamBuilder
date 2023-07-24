const fs = require("fs");
const userController = {};
const path = require("path");
const User = require("../models/user");
const passport = require("passport");

const fetchAndParse = async (linkToBeFetched) => {
  const res = await fetch(linkToBeFetched);
  return res.json();
};

const getMatchHistory = async (puuid, count) => {
  return fetchAndParse(
    `https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=${count}&api_key=` +
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

// userController.getUser = async (req, res, next) => {   // this grab a cached user data instead of live data to reduce api call request when in development
//   //fakeApiCall
//   const location = path.resolve("./setData/userCache.json");
//   res.locals.matches = JSON.parse(fs.readFileSync(location));
//   next();
// };

userController.getUser = async (req, res, next) => {
  //real live server request

  try {
    const userData = await getUserByName(req.params.username); // grab the user data by their username
    const matchId = await getMatchHistory(userData.puuid, 3); // get latest 3 matches's id based on the user puuid (cannot get matches with jsut user name)
    const matchesData = [];
    for (const id of matchId) {
      // get all player name for each matches and grab their placement/traits/units in each game
      const matchData = await getMatchData(id);
      const playersData = [];
      for (const data of matchData.info.participants) {
        const player = {};
        const account = await getUserByPUUID(data.puuid);
        player.name = account.name;
        player.placement = data.placement;
        player.traits = data.traits;
        player.units = data.units.map((unit) => {
          return {
            name: unit.character_id,
            items: unit.itemNames,
            path: `/champions/${unit.character_id}`,
          };
        });
        playersData.push(player);
      }
      matchesData.push(playersData);
    }

    res.locals.matches = matchesData;

    // const location = path.resolve("userCache.json"); //to cache user data for testing
    // fs.writeFileSync(location, JSON.stringify(matchesData, null, 2));
    next();
  } catch (e) {
    next({
      code: 503,
      error: {
        message:
          "Service Unavailable: The server is currently unable to handle the request due to temporary overloading or maintenance. ",
      },
      internalMessage: {
        from: "userController.getUser",
        e,
      },
    });
  }
};

userController.getChampion = async (req, res, next) => {
  // this route return data for this set champion
  const location = path.resolve("/setData/tft-champion.json");
  res.locals.champions = fs.readFileSync(location);
  next();
};

userController.login = async (req, res, next) => {
  //login route
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      next({
        code: 500,
        error: {
          message: "Something went wrong with logging you in, PLease try again",
        },
      });
    }
    if (!user)
      next({
        code: 401,
        error: {
          message: "Wrong Username or Password",
        },
      });
    else {
      req.logIn(user, (err) => {
        if (err) {
          next({
            code: 500,
            error: {
              message:
                "Something went wrong with logging you in, PLease try again",
            },
          });
        }
        res.json(req.user);
      });
    }
  })(req, res, next);
};

userController.signUp = async (req, res, next) => {
  //signup route
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    req.logIn(user, (err) => {
      if (err) {
        next({
          code: 500,
          error: {
            message:
              "Something went wrong with signing you in, PLease try again",
          },
        });
      }
      res.json(user);
    });
  } catch (e) {
    next({ code: 409, error: { message: "Username Taken" } });
  }
};

userController.signOut = (req, res, next) => {
  //signout route
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json(true);
  });
};

module.exports = userController;
