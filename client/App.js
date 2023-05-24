import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import { loader as userLoader } from "./pages/UserProfile";
import TeamBuilder from "./pages/TeamBuilder";
import { loader as teamLoader } from "./pages/TeamBuilder";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/user/:username", element: <UserProfile />, loader: userLoader },
  { path: "/builder", element: <TeamBuilder />, loader: teamLoader },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
