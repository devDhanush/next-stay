import "./App.css";
import ReactDOM from "react-dom";
import Login from "./components/Login";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import PGList from "./components/PGList";
import React from "react";

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Login />,
      children: [
        // { path: "login", element: <Navigate to="/login" /> },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "places",
          element: <PGList />,
        },
      ],
    },
    { path: "*", element: <>Not found</> },
  ]);
  console.log("Element", element);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="places" element={<PGList />} />
    </Routes>
  );
}

export default App;
