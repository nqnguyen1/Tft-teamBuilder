import React from "react";
import { Outlet, Navigate, useLoaderData } from "react-router-dom";
import MainNav from "../components/MainNav";

export default function Root() {
  // this component main purpose is to display the nav bar as well as protecting all routes that needs to be signed in
  const data = useLoaderData();

  return data.message ? (
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
  // check with the backend that the user is logged in before allowing them through to any the children route under this page
  const response = await fetch("/api/user/isLoggedIn");
  if (response.status === 401) {
    return { message: "Please log in" };
  }
  const data = await response.json();
  return data;
}
