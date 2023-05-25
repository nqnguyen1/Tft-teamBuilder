import React from "react";
import styles from "./Champion.module.css";

function getSrc(name) {
  return `http://localhost:3000/assets/champions/${name}.png`;
}

export default function Champion(props) {
  const style = {
    height: `${props.height}px`,
    aspectRatio: `1/1`,
    opacity: `${props.opacity}`,
  };
  const clickHandler = (e) => {
    props.clickHandler(props.champion, e);
  };
  return (
    <img
      onClick={clickHandler}
      style={style}
      className={styles.img}
      src={getSrc(props.champion.apiName)}
    ></img>
  );
}
