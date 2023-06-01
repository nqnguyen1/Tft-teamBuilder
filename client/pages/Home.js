import React, { useContext } from "react";
import AuthContext from "../store/auth-context";

export default function Home() {
  const ctx = useContext(AuthContext);
  return (
    <>
      <h1>My Home Page</h1>
      <form
        onSubmit={ctx.onLogIn}
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
        onSubmit={ctx.onSignUp}
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
