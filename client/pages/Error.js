import React from "react";
import { useRouteError, Link } from "react-router-dom";

export default function Error() {
  // this components renders any time there is any error that is thrown inside of our application
  const error = useRouteError();

  const message = error.data;
  const status = error.status;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <p style={{ margin: "3rem" }}> Code: {status}</p>
      <p>{message}</p>
      <button>
        <Link to="/home">home</Link>
      </button>
    </div>
  );
}
