import React, { useReducer } from "react";
import { useLoaderData } from "react-router-dom";
import ChampionsContainer from "../components/TeamComp/ChampionsContainer";
import CurrentTeamContainer from "../components/TeamComp/CurrentTeamContainer";

export default function TeamBuilder() {
  const { champions, traits } = useLoaderData();
  const currChampReducer = (state, action) => {
    if (action.type === "ADD") {
      const newState = { curr: [...state.curr], ...state };
      const index = newState.curr.findIndex((x) => x === "");
      newState.curr[index] = action.payload;
      newState.count++;
      return newState;
    } else if (action.type === "REMOVE") {
      const newState = { curr: [...state.curr], ...state };
      const index = newState.curr.findIndex(
        (x) => x.name === action.payload.name
      );
      newState.curr[index] = "";
      newState.count--;
      return newState;
    }
    return { ...state };
  };
  const [currChampState, currChampDispatch] = useReducer(currChampReducer, {
    curr: ["", "", "", "", "", "", "", "", "", ""],
    count: 0,
  });
  console.log(champions, traits);
  const addChampHandler = (champ, e) => {
    if (
      currChampState.count < 10 &&
      !currChampState.curr.some((x) => x === champ)
    ) {
      currChampDispatch({ type: "ADD", payload: champ });
    }
  };
  const removeChampHandler = (champ, e) => {
    currChampDispatch({ type: "REMOVE", payload: champ });
  };
  return (
    <>
      <CurrentTeamContainer
        removeChamp={removeChampHandler}
        champions={currChampState.curr}
      ></CurrentTeamContainer>
      <ChampionsContainer
        addChamp={addChampHandler}
        currChamps={currChampState.curr}
        champions={champions}
      ></ChampionsContainer>
    </>
  );
}

export async function loader({ request, params }) {
  const response = await fetch("/api/set8Data");
  const data = await response.json();
  return data;
}
