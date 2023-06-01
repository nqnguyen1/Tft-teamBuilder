import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MainNav.module.css";

export default function MainNav() {
  const navigate = useNavigate();
  function navigateHandler(e) {
    e.preventDefault();
    const username = e.target[0].value;
    navigate("/user/" + username);
  }
  return (
    <nav className={styles.container}>
      <ul className={styles.container}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/builder">Build Comp</Link>
        </li>
        <form onSubmit={navigateHandler}>
          <input
            id="leagueName"
            type="text"
            placeholder="Search for summoner"
          ></input>
        </form>
        <li>
          <Link to="/savecomp">Save Comp</Link>
        </li>
      </ul>
    </nav>
  );
}
