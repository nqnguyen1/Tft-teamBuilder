import React from "react";
import Champion from "./Champion";
import styles from "./CurrentTeamContainer.module.css";

export default function CurrentTeamContainer(props) {
  const championJSX = props.champions.map((x, index) => {
    if (x) {
      return (
        <Champion
          clickHandler={props.removeChamp}
          key={x.name}
          height="150"
          champion={x}
        ></Champion>
      );
    } else {
      return <div key={index} className={styles.box}></div>;
    }
  });
  return <div className={styles.container}>{championJSX}</div>;
}
