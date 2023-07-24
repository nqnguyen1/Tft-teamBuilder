import React, { useReducer, useEffect } from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import ChampionsContainer from "../components/TeamComp/ChampionsContainer";
import CurrentTeamContainer from "../components/TeamComp/CurrentTeamContainer";

export default function TeamBuilder() {
  // this components renders the /builder page
  const data = useLoaderData(); //grabbing data from loader (setData)
  const navigate = useNavigate();
  const { champions, traits } = data; //grabbing champions information as well as traits, currently does not incorporate traits into our app functionality yet
  const { state } = useLocation(); // grabbing data from other pages if this page was redirected to
  let userUnits = state?.units ? state.units : false;
  let id = state?.id ? state.id : false;

  const currChampReducer = (state, action) => {
    // reducer function for useReducer which holds the state of the currently selected units as well as the number of units
    if (action.type === "ADD") {
      // for adding a champion to the list of currently selected champion, this function will copy over the old state, find the first empty index, assign the champion to that empty index, incrememnt the number of units and return the new updated state
      const newState = { curr: [...state.curr], ...state };
      const index = newState.curr.findIndex((x) => x === "");
      newState.curr[index] = action.payload;
      newState.count++;
      return newState;
    } else if (action.type === "REMOVE") {
      //for remove a champion from the list of currently selected champion, this function will copy over the old state, find the index of the champion selected using its name and assign it an empty string then it decrememnt the number of units and return the new updated state

      const newState = { curr: [...state.curr], ...state };
      const index = newState.curr.findIndex(
        (x) => x.name === action.payload.name
      );
      newState.curr[index] = "";
      newState.count--;
      return newState;
    } else if (action.type === "UPDATE") {
      // this reducer function is purely use only whenever this page was redirected to from a different page that has units that needs to be pre-populated
      const newState = { ...state, curr: [...action.payload] };
      return newState;
    }
    return { ...state };
  };

  const [currChampState, currChampDispatch] = useReducer(currChampReducer, {
    //the main state for this component is jsut an object with an array of currently selected champion as well as the count
    curr: ["", "", "", "", "", "", "", "", "", ""],
    count: 0,
  });

  useEffect(() => {
    // this useEffect check if there are units that needs to be pre-populate inside our curr array and does so if there are
    if (userUnits) {
      userUnits = userUnits.map((x) => {
        return data[x.name];
      });
      if (userUnits.length < 10) {
        const extraSpaces = 10 - userUnits.length;
        for (let i = 0; i < extraSpaces; i++) {
          userUnits.push("");
        }
      }
      currChampDispatch({ type: "UPDATE", payload: userUnits });
    }
  }, []);

  const addChampHandler = (champ, e) => {
    // only add champ if the champ isnt already selected AND the count is less than 10
    if (
      currChampState.count < 10 &&
      !currChampState.curr.some((x) => x === champ)
    ) {
      currChampDispatch({ type: "ADD", payload: champ });
    }
  };
  const removeChampHandler = (champ, e) => {
    // remove champ handler
    currChampDispatch({ type: "REMOVE", payload: champ });
  };

  const saveTeamHandler = () => {
    // this save function differentiate between saving a team and edit a team by checking if the id variable exist, it only exists if this page was redirected from the /savecomp page with a team and an id,
    const filterChamp = currChampState.curr.filter((x) => {
      //filter out all the empty spaces placeholder
      return x ? true : false;
    });
    const url = id ? `/api/team/edit/${id}` : "/api/team/addTeam"; //constructing options for the fetch request based on if the id exists
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
  // grab set data from back end and pass it if sucessful or throw an error if not
  const response = await fetch("/api/team/setData");
  if (!response.ok && response.status !== 401) {
    const { error } = await response.json();
    throw new Response(JSON.stringify({ error }), { status: response.status });
  } else {
    const data = await response.json();
    return data;
  }
}
