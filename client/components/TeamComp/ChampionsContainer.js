import React from "react";
import Champion from "./Champion";
import styles from "./ChampionsContainer.module.css";

export default function ChampionsContainer(props) {
  // this components renders all champions got back from /setData route
  const includesChamp = props.currChamps.map((x) => x.name);
  const championJSX = props.champions.map((x) => {
    const opacity = includesChamp.includes(x.name) ? 0.2 : 1; //dynamic set the opacity of the champion logo by using the list of selected champion
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
