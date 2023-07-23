const path = require("path");
const fs = require("fs");
const Jimp = require("jimp");

const location = path.resolve("tft-champion.json");
const champions = JSON.parse(fs.readFileSync(location)).data;

for (let champ in champions) {
  let { sprite, x, y, w, h } = champions[champ].image;
  if (champions[champ].name === "Ryze") {
    x = 192;
    y = 96;
    sprite = "tft-champion1.png";
  }
  const spiteImage = path.resolve(sprite);
  const file = `client/assets/champions/${champions[champ].id}.png`;
  Jimp.read(spiteImage).then((image) => {
    const extractedImage = image.clone().crop(x, y, w, h);
    return extractedImage.write(file);
  });
}
