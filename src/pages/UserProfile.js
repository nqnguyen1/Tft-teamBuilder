import React from "react";
import { useLoaderData } from "react-router-dom";

export default function UserProfile() {
  const user = useLoaderData();
  console.log(user);
  return (
    <>
      <h1>hello</h1>
      <img src=""></img>
    </>
  );
}

export async function loader({ request, params }) {
  const response = await fetch("/api/user/" + params.username);
  const data = await response.json();
  return data;
}
