import React, { useState } from "react";
import { useLoaderData, Link, redirect, useNavigate } from "react-router-dom";
import Comp from "../components/SaveComp/Comp";
import Cookies from "js-cookie";

export default function SaveComp() {
  // this component renders all the save team comp associated with the user account
  const data = useLoaderData(); // saved team comp
  const navigate = useNavigate();
  const [teamComp, setTeamComp] = useState([...data]);

  const editHandler = (data) => {
    // hanlder for when user click edit, redirect to /builder with the team comp and id attached
    const units = data.comp.map((x) => {
      return { ...x, name: x.apiName };
    });
    navigate("/builder", { state: { units, id: data._id } });
  };

  const deleteHandler = (e) => {
    //delete handler
    fetch("/api/team/delete/" + e, {
      method: "DELETE",
    }).then((res) => {
      setTeamComp((prev) => {
        return prev.filter((x) => x._id !== e);
      });
    });
  };

  const comJSX = teamComp.map((x, key) => {
    //generate jsx for each team comp
    return (
      <Comp delete={deleteHandler} edit={editHandler} key={key} data={x}></Comp>
    );
  });

  return (
    <div className="container">
      <h1> Welcome {Cookies.get("user")} !</h1>
      <div>{comJSX}</div>
      <div style={{ fontSize: "5rem", textAlign: "center" }}>
        <Link to="/builder">+</Link>
      </div>
    </div>
  );
}

export async function loader() {
  // grab the team that is saved under the user account -> throw an error if response isnt okay
  const response = await fetch("/api/team/getteam");
  if (!response.ok && response.status !== 401) {
    const { error } = await response.json();
    throw new Response(JSON.stringify({ error }), { status: response.status });
  } else {
    const data = await response.json();
    return data;
  }
}
