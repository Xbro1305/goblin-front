import React from "react";
import { Router } from "./Router";
import { Header } from "./Components/Header/Header";

export const App = () => {
  console.log(window.location.pathname);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
        display: "flex",
      }}
    >
      {window.location.pathname !== "/login" &&
        window.location.pathname !== "/signin" && <Header />}
      <Router />
    </div>
  );
};
