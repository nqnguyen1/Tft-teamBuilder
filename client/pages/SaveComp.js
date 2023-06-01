import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import Comp from "../components/SaveComp/Comp";
import Cookies from "js-cookie";

export default function SaveComp() {
  const data = useLoaderData(); // a array of 9 object inside contains id and another array of 9

  const [teamComp, setTeamComp] = useState([...data]);

  const editHandler = (data) => {};

  const deleteHandler = (e) => {
    fetch("/api/team/delete/" + e, {
      method: "POST",
    }).then((res) => {
      setTeamComp((prev) => {
        return prev.filter((x) => x._id !== e);
      });
    });
  };

  const comJSX = teamComp.map((x, key) => {
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
  const response = await fetch("/api/team/getteam");
  console.log(response.status);
  const data = await response.json();
  console.log(data);
  return data;
}
