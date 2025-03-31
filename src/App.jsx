import { Login } from "./Pages/Login/Login";
import { Route, Routes } from "react-router-dom";
import { Signin } from "./Pages/Signin/Signin";

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
};
