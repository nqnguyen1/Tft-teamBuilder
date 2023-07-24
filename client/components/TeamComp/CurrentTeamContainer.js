import React from "react";
import Champion from "./Champion";
import styles from "./CurrentTeamContainer.module.css";

export default function CurrentTeamContainer(props) {
  // this component is the container that display all the selected champions
  const championJSX = props.champions.map((x, index) => {
    if (x) {
      return (
        <Champion
          clickHandler={props.removeChamp}
          key={`${x.name}${index}`}
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
