import React from "react";
import { Outlet, Navigate, useLoaderData } from "react-router-dom";
import MainNav from "../components/MainNav";
import AuthContext from "../store/auth-context";
import Home from "./Home";

export default function Root() {
  const data = useLoaderData();

  return data.error ? (
    <Navigate
      to="/home"
      replace={true}
      state={{ error: "Please Log In" }}
    ></Navigate>
  ) : (
    <>
      <MainNav></MainNav>
      <Outlet></Outlet>
    </>
  );
}

export async function loader({ request, params }) {
  const response = await fetch("/api/user/isLoggedIn");
  if (response.status === 401) {
    return { error: "Please log in" };
  }
  const data = await response.json();
  return data;
}
