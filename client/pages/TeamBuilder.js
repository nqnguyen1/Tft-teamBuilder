import React, { useReducer, useEffect } from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import ChampionsContainer from "../components/TeamComp/ChampionsContainer";
import CurrentTeamContainer from "../components/TeamComp/CurrentTeamContainer";

export default function TeamBuilder() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { champions, traits } = data;
  const { state } = useLocation();
  let userUnits = state?.units ? state.units : false;
  let id = state?.id ? state.id : false;
  console.log(userUnits, id);

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
    if (userUnits) {
      userUnits = userUnits.map((x) => {
        return data[x.name];
      });
      if (userUnits.length < 10) {
        for (let i = 0; i <= 10 - userUnits.length; i++) {
          userUnits.push("");
        }
      }
      currChampDispatch({ type: "UPDATE", payload: userUnits });
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
    const url = id ? `/api/team/edit/${id}` : "/api/team/addTeam";
    const method = id ? "PATCH" : "POST";

    fetch(url, {
      method,
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
  const response = await fetch("/api/team/setData");
  const data = await response.json();
  return data;
}
