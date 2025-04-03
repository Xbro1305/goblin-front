import React from "react";
import { Router } from "./Router";
import { Header } from "./Components/Header/Header";

export const App = () => {
  return (
    <div className="app">
      {window.location.pathname !== "/login" &&
        window.location.pathname !== "/signin" && <Header />}
      <Router />
    </div>
  );
};
