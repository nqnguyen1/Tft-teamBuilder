import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Player.module.css";

function getSrc(path) {
  return `http://localhost:3000/assets/${path}.png`;
}

const NOT_REAL_UNITS = ["TFT9_HeimerdingerTurret", "TFT9_THex"]; // list of units to filter out that is not included in the list of real units

export default function Player(props) {
  const navigate = useNavigate(); // to navigate to /builder when a user click on save team
  const { name, placement, traits, units } = props.playerInfo; // grabbing main data to displayfor eachplayer
  const traitsJSX = traits.reduce((acc, curr) => {
    if (curr.tier_current > 0) {
      const result = curr.name.replace(/^.*_/, "");
      acc.push(<div key={curr.name}>{result}</div>);
    }
    return acc;
  }, []);

  const filterUnits = units.filter(
    (unit) => !NOT_REAL_UNITS.includes(unit.name)
  );

  const unitsJSX = filterUnits.map((unit, index) => {
    return (
      <img
        className={styles.img}
        key={`${unit.name}${index}`}
        src={getSrc(unit.path)}
        alt={unit.name}
      ></img>
    );
  });

  const clickHandler = () => {
    navigate("/builder", { state: { units: filterUnits } });
  };
  return (
    <div className={styles.container}>
      <div className={styles.rightContainer}>
        <div>{name}</div>
        <div>PLACEMENT</div>
        <h3>{placement}</h3>
      </div>
      <div>{unitsJSX}</div>
      <div className={styles.traitsContainer}>{traitsJSX}</div>
      <button onClick={clickHandler}>SAVE</button>
    </div>
  );
}
