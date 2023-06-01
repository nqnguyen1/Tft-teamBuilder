import React from "react";
import SaveChampion from "./SaveChamp";
import styles from "./Comp.module.css";

export default function Comp(props) {
  const championJSX = props.data.comp.map((x) => {
    return <SaveChampion key={x.name} height="120" champion={x}></SaveChampion>;
  });

  const editHandler = (e) => {
    props.edit(props.data);
  };

  const deleteHandler = (e) => {
    props.delete(props.data._id);
  };
  return (
    <div>
      <div className={styles.container}>
        {championJSX}
        <div className={styles.buttonContainer}>
          <button onClick={editHandler}>Edit</button>
          <button onClick={deleteHandler}>Delete</button>
        </div>
      </div>
    </div>
  );
}
