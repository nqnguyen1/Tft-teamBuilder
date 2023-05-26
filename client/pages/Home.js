import React from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";

export default function Home() {
  const navigate = useNavigate();
  function loginHandler(e) {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          navigate("/savecomp");
        } else {
          alert("WRONG USERNAME OR PASSWORD");
        }
      });
  }
  function signupHandler(e) {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({ username, password }),
    }).then((data) => {
      {
        navigate("/savecomp");
      }
    });
  }
  return (
    <>
      <h1>My Home Page</h1>
      <form
        onSubmit={loginHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          border: " 2px rgb(150,74,146) solid",
          alignItems: "center",
        }}
      >
        <h2>Login</h2>
        <label htmlFor="loginUsername">username</label>
        <input id="loginUsername" type="text"></input>
        <label htmlFor="loginPassword">password</label>
        <input id="loginPassword" type="password"></input>
        <button type="submit">Log In</button>
      </form>
      <form
        onSubmit={signupHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          border: " 2px rgb(150,74,146) solid",
          alignItems: "center",
          marginTop: "3rem",
        }}
      >
        <h2>Sign up</h2>
        <label htmlFor="signupUsername">username</label>
        <input id="signupUsername" type="text" name="username"></input>
        <label htmlFor="signupPassword">password</label>
        <input id="signupPassword" type="password" name="password"></input>
        <button type="submit">Sign up</button>
      </form>
    </>
  );
}
