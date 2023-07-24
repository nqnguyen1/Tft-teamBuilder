import React, { useState } from "react";
import AuthContext from "../store/context";
import { useNavigate, useLocation, redirect } from "react-router-dom";

export default function Home(props) {
  // this component renders the log in / sign up page
  const navigate = useNavigate();
  const { state: error } = useLocation(); // grabbing the error to display

  const [message, setMessage] = useState(error?.error);

  function logInHandler(e) {
    // logging in handler
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    if (username && password) {
      fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "Application/JSON",
        },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            navigate("/builder");
          } else {
            setMessage(data.error);
          }
        });
    } else {
      setMessage("Please fill out both username and password");
    }
  }

  function signUpHandler(e) {
    // signing up handler
    e.preventDefault();

    const username = e.target[0].value;
    const password = e.target[1].value;
    if (username && password) {
      fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "Application/JSON",
        },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (!data.error) {
            navigate("/builder");
          } else {
            setMessage(data.error);
          }
        });
    } else {
      setMessage("Please fill out both username and password");
    }
  }
  return (
    <>
      <h1>TFT-Builder</h1>
      {message && <div style={{ color: "red" }}>{message}</div>}
      <form
        onSubmit={logInHandler}
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
        onSubmit={signUpHandler}
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
