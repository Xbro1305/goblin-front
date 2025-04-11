import { Login } from "./Pages/Login/Login";
import { Route, Routes } from "react-router-dom";
import { Signin } from "./Pages/Signin/Signin";
import { Profile } from "./Pages/Profile/Profile";
import { AuthGuard } from "./Components/Auth/Auth-guard";
import { Chat } from "./Pages/P2P/Chat/Chat";

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/" element={<AuthGuard />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/chat/:id" element={<Chat />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};
