import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MainNav.module.css";
import Context from "../store/context";

export default function MainNav() {
  const navigate = useNavigate();
  const ctx = useContext(Context); // for loading state inside global context

  function navigateHandler(e) {
    // navigating to userProfile page using search button
    e.preventDefault();
    const username = e.target[0].value;
    ctx.setIsLoading();
    navigate("/user/" + username);
  }

  function logOutHandler(e) {
    // logging out
    fetch("/api/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          navigate("/home");
        }
      });
  }
  return (
    <nav className={styles.container}>
      <ul className={styles.container}>
        <li>
          <Link to="/builder">Build Comp</Link>
        </li>

        <li>
          <Link to="/savecomp">Save Comp</Link>
        </li>
        <form onSubmit={navigateHandler}>
          <input
            id="leagueName"
            type="text"
            placeholder="Search for summoner"
          ></input>
          {ctx.loading && <div>Loading</div>}
        </form>
        <li>
          <button onClick={logOutHandler}>Log out</button>
        </li>
      </ul>
    </nav>
  );
}
