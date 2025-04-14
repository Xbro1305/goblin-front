import { Login } from "./Pages/Login/Login";
import { Route, Routes } from "react-router-dom";
import { Signin } from "./Pages/Signin/Signin";
import { Profile } from "./Pages/Profile/Profile";
import { AuthGuard } from "./Components/Auth/Auth-guard";
import { Chat } from "./Pages/P2P/Chat/Chat";
import { MyOrders } from "./Pages/P2P/MyOrders/MyOrders";
import { Order } from "./Pages/P2P/Order/Order";
import { Trading } from "./Pages/P2P/Trading/Trading";

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/" element={<AuthGuard />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/p2p/my-orders" element={<MyOrders />} />
        <Route path="/p2p/trading" element={<Trading />} />
        <Route path="/chat/:id" element={<Chat />} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};
