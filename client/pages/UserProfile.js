import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import MatchHistory from "../components/MatchHistory/MatchHistory";

export default function UserProfile() {
  const matchHistory = useLoaderData(); //array of 3 elements which contains arrays of 8 object
  let { username } = useParams();

  return (
    <>
      <h1>{username}</h1>
      <MatchHistory matchHistory={matchHistory}></MatchHistory>
    </>
  );
}

export async function loader({ request, params }) {
  const response = await fetch("/api/user/" + params.username);
  const data = await response.json();
  return data;
}
