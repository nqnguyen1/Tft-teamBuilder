import React from "react";
import Match from "./Match";
export default function MatchHistory(props) {
  const matchJSX = props.matchHistory.map((match, index) => (
    <Match key={index} matchInfo={match}></Match>
  ));
  return <>{matchJSX}</>;
}
