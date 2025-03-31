import { Login } from "./Pages/Login/Login";
import { Route, Routes } from "react-router-dom";
import { Signin } from "./Pages/Signin/Signin";
import { Profile } from "./Pages/Profile/Profile";

export const Router = () => {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
};
