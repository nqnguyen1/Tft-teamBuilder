import React from "react";
import styles from "./Player.module.css";

function getSrc(path) {
  return `http://localhost:3000/assets/${path}.png`;
}

export default function Player(props) {
  const { name, placement, traits, units } = props.playerInfo;
  const traitsJSX = traits.reduce((acc, curr) => {
    if (curr.tier_current > 0) {
      const result = curr.name.replace(/^.*_/, "");
      acc.push(<div key={curr.name}>{result}</div>);
    }
    return acc;
  }, []);

  const unitsJSX = units.map((unit) => {
    return (
      <img
        className={styles.img}
        key={unit.name}
        src={getSrc(unit.path)}
        alt={unit.name}
      ></img>
    );
  });
  return (
    <div className={styles.container}>
      <div className={styles.rightContainer}>
        <div>{name}</div>
        <div>PLACEMENT</div>
        <h3>{placement}</h3>
      </div>
      <div>{unitsJSX}</div>
      <div className={styles.traitsContainer}>{traitsJSX}</div>
    </div>
  );
}
