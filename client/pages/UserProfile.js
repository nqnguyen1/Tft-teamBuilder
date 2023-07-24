import React, { useContext, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import MatchHistory from "../components/MatchHistory/MatchHistory";
import Context from "../store/context";

export default function UserProfile() {
  const matchHistory = useLoaderData(); //this is the data that is sent back from the request made in the loader function
  let { username } = useParams(); // extract username
  const ctx = useContext(Context); // to set loading state
  useEffect(() => {
    ctx.setIsLoading();
  }, [matchHistory]);

  return (
    <>
      <h1>{username}</h1>
      <MatchHistory matchHistory={matchHistory}></MatchHistory>//
    </>
  );
}

export async function loader({ request, params }) {
  const response = await fetch("/api/user/" + params.username);
  if (!response.ok && response.status !== 401) {
    const { error } = await response.json();
    throw new Response(JSON.stringify({ error }), { status: response.status });
  } else {
    const data = await response.json();
    return data;
  }
}
