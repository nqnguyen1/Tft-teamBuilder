import React from "react";
import Champion from "./Champion";
import styles from "./ChampionsContainer.module.css";

export default function ChampionsContainer(props) {
  const includesChamp = props.currChamps.map((x) => x.name);
  const championJSX = props.champions.map((x) => {
    const opacity = includesChamp.includes(x.name) ? 0.2 : 1;
    return (
      <Champion
        clickHandler={props.addChamp}
        key={x.apiName}
        height="120"
        champion={x}
        opacity={opacity}
      ></Champion>
    );
  });
  return <div className={styles.container}>{championJSX}</div>;
}
