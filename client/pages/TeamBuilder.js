import React from "react";
import { useLoaderData } from "react-router-dom";

export default function TeamBuilder() {
  const set8Data = useLoaderData();
  console.log(set8Data);
  return (
    <>
      <h1>HELLO</h1>
    </>
  );
}

export async function loader({ request, params }) {
  const response = await fetch("/api/set8Data");
  const data = await response.json();
  return data;
}
