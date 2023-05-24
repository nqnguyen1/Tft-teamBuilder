import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Player from "./Player";
import AdditionalPlayer from "./AdditionalPlayer";
import styles from "./Match.module.css";

export default function Match(props) {
  let { username } = useParams();
  const [showMorePlayer, setShowMorePlayer] = useState(false);

  const matchInfo = props.matchInfo;
  matchInfo.sort((a, b) => {
    return a.placement - b.placement;
  });

  const mainPlayer = matchInfo.find(
    (x) => x.name.toLowerCase() === username.toLowerCase()
  );

  const clickHandler = (e) => {
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
            ? `${styles.active} ${styles.dropdown}`
            : `${styles.inactive} ${styles.dropdown}`
        }
      >
        <AdditionalPlayer matchInfo={matchInfo}></AdditionalPlayer>
      </div>
    </div>
  );
}
