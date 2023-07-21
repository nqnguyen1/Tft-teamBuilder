import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import { loader as userLoader } from "./pages/UserProfile";
import TeamBuilder from "./pages/TeamBuilder";
import { loader as teamLoader } from "./pages/TeamBuilder";
import SaveComp from "./pages/SaveComp";
import { loader as compLoader } from "./pages/SaveComp";
import Root, { loader as rootLoader } from "./pages/Root";
import { AuthContextProvider } from "./store/auth-context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/user/:username", element: <UserProfile />, loader: userLoader },
      { path: "/builder", element: <TeamBuilder />, loader: teamLoader },
      { path: "/savecomp", element: <SaveComp />, loader: compLoader },
    ],
    loader: rootLoader,
  },
  { path: "/home", element: <Home /> },
]);

export default function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>
  );
}
