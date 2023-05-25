import React from "react";
import Champion from "./Champion";
import styles from "./ChampionsContainer.module.css";

export default function ChampionsContainer(props) {
  const includesChamp = props.currChamps.map((x) => x.name);
  console.log(includesChamp);
  const championJSX = props.champions.map((x) => {
    const opacity = includesChamp.includes(x.name) ? 0.2 : 1;
    return (
      <Champion
        clickHandler={props.addChamp}
        key={x.name}
        height="120"
        champion={x}
        opacity={opacity}
      ></Champion>
    );
  });
  return <div className={styles.container}>{championJSX}</div>;
}
