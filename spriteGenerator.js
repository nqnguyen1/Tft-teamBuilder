const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const Jimp = require("jimp");

const location = path.resolve("tft-champion.json");
const champions = JSON.parse(fs.readFileSync(location)).data;

// for (let champ in champions) {
//   const { sprite, x, y, w, h } = champions[champ].image;
//   const spiteImage = path.resolve(sprite);
//   const file = `client/assets/champions/${champions[champ].id}.png`;
//   sharp(spiteImage, { raw: { width: 480, height: 144, channels: 4 } })
//     .extract({ left: x, top: y, width: w, height: h })
//     .toFile(file)
//     .then(() => {
//       console.log("Image extracted and saved successfully!");
//     })
//     .catch((err) => {
//       console.error("Error occurred:", err);
//     });
// }

const ryzeX = 192;
const ryzeY = 96;
const ryzeW = 48;
const ryzeSprite = "tft-champion1.png";

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
