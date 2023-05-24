import React from "react";
import { useParams } from "react-router-dom";
import Player from "./Player";

export default function Match(props) {
  let { username } = useParams();
  const matchInfo = props.matchInfo;
  matchInfo.sort((a, b) => {
    return a.placement - b.placement;
  });

  const mainPlayer = matchInfo.find(
    (x) => x.name.toLowerCase() === username.toLowerCase()
  );

  return (
    <div>
      <Player playerInfo={mainPlayer}></Player>
    </div>
  );
}
