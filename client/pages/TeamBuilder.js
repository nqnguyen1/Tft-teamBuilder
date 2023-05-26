import React, { useReducer, useEffect } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import ChampionsContainer from "../components/TeamComp/ChampionsContainer";
import CurrentTeamContainer from "../components/TeamComp/CurrentTeamContainer";

export default function TeamBuilder() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { champions, traits } = data;
  const { state: userUnits } = useLocation();
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
    } else if (action.type === "UPDATE") {
      const newState = { ...state, curr: [...action.payload] };
      return newState;
    }
    return { ...state };
  };

  const [currChampState, currChampDispatch] = useReducer(currChampReducer, {
    curr: ["", "", "", "", "", "", "", "", "", ""],
    count: 0,
  });

  useEffect(() => {
    // console.log(currChampState.curr);
    if (userUnits) {
      userUnits.units = userUnits.units.map((x) => {
        return data[x.name];
      });
      if (userUnits.units.length < 10) {
        for (let i = 0; i <= 10 - userUnits.units.length; i++) {
          userUnits.units.push("");
        }
      }
      currChampDispatch({ type: "UPDATE", payload: userUnits.units });
    }
  }, []);
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

  const saveTeamHandler = () => {
    const filterChamp = currChampState.curr.filter((x) => {
      return x ? true : false;
    });

    fetch("/api/team/addTeam", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(filterChamp),
    }).then((data) => {
      navigate("/savecomp");
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CurrentTeamContainer
        removeChamp={removeChampHandler}
        champions={currChampState.curr}
      ></CurrentTeamContainer>
      <button
        // style={{ width: "50px", height: "50px" }}
        onClick={saveTeamHandler}
      >
        SAVE TEAM
      </button>
      <ChampionsContainer
        addChamp={addChampHandler}
        currChamps={currChampState.curr}
        champions={champions}
      ></ChampionsContainer>
    </div>
  );
}

export async function loader({ request, params }) {
  const response = await fetch("/api/team/set8Data");
  const data = await response.json();
  console.log(data);
  return data;
}
