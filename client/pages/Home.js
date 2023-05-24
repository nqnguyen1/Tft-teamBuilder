import React from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";

export default function Home() {
  const navigate = useNavigate();
  function navigateHandler(e) {
    e.preventDefault();
    const username = e.target[0].value;
    navigate("/user/" + username);
  }
  return (
    <>
      <h1>My Home Page</h1>
      <form onSubmit={navigateHandler}>
        <input type="text"></input>
      </form>
    </>
  );
}
