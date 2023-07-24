import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Player from "./Player";
import styles from "./Match.module.css";

export default function Match(props) {
  //individual matches
  let { username } = useParams(); // grab the username in order to find the main player data to display
  const [showMorePlayer, setShowMorePlayer] = useState(false); // state for drop down

  const matchInfo = props.matchInfo;
  matchInfo.sort((a, b) => {
    return a.placement - b.placement;
  });

  const mainPlayer = matchInfo.find(
    (player) => player.name.toLowerCase() === username.toLowerCase()
  );

  const additionalPlayerJSX = matchInfo.map((x, index) => {
    return <Player key={`${x.name}${index}`} playerInfo={x}></Player>;
  });
  const clickHandler = (e) => {
    // drop down menu
    setShowMorePlayer((currState) => !currState);
  };

  return (
    <div className={styles.container}>
      <Player playerInfo={mainPlayer}></Player>
      <button className={styles.button} onClick={clickHandler}>
        {showMorePlayer ? "Show Less" : "Show More"}
      </button>
      <div
        className={
          showMorePlayer
            ? `${styles.active} ${styles.dropdown} `
            : `${styles.inactive} ${styles.dropdown}`
        }
      >
        {/* <AdditionalPlayer matchInfo={matchInfo}></AdditionalPlayer> */}
        {additionalPlayerJSX}
      </div>
    </div>
  );
}
