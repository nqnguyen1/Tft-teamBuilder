import React from "react";

function getSrc(name) {
  return `http://localhost:3000/assets/champions/${name}.png`;
}

export default function SaveChampion(props) {
  //dumb component rendering just the logo of the champ passed down
  const style = {
    height: `${props.height}px`,
    aspectRatio: `1/1`,
  };

  return <img style={style} src={getSrc(props.champion.apiName)}></img>;
}
