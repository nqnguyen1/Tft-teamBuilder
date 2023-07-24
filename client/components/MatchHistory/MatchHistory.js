import React from "react";
import Match from "./Match";
export default function MatchHistory(props) {
  // container for all matches
  const matchJSX = props.matchHistory.map((match, index) => (
    <Match key={index} matchInfo={match}></Match> //
  ));
  return <>{matchJSX}</>;
}
