import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";
import AuthContext from "../store/auth-context";
import Home from "./Home";

export default function Root() {
  //https://www.youtube.com/watch?v=0x8Dap2EIVE
  const ctx = useContext(AuthContext);
  return (
    <>
      <MainNav></MainNav>
      <Outlet></Outlet>
    </>
  );
}
