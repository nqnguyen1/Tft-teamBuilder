const fs = require("fs");
const path = require("path");
// this file is to generate new set data this link will always return the latest set data
fetch("https://raw.communitydragon.org/latest/cdragon/tft/en_us.json")
  .then((res) => res.json())
  .then((data) => {
    const setObj = {};
    setObj.champions = data.sets[9].champions.map((x) => {
      return { apiName: x.apiName, name: x.name, traits: x.traits };
    });
    const traits = data.sets[9].traits.reduce((acc, curr) => {
      const name = curr.name;
      curr.count = 0;
      acc[name] = curr;
      return acc;
    }, {});
    setObj.traits = traits;
    setObj.champions.forEach((element) => {
      setObj[element.apiName] = element;
    });
    const location = path.resolve("set8Data.json");
    fs.writeFileSync(location, JSON.stringify(setObj, null, 2));
  });
