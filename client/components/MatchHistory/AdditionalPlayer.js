import React from "react";
import Player from "./Player";

export default function AdditionalPlayer(props) {
  const allPlayerJSX = props.matchInfo.map((x) => {
    return <Player key={x.name} playerInfo={x}></Player>;
  });
  return <div>{allPlayerJSX}</div>;
}
