import { Outlet, Navigate, useLocation } from "react-router-dom";

export const AuthGuard = () => {
  const location = useLocation();

  if (
    (!localStorage.getItem("token") && location.pathname !== "/login") ||
    (!localStorage.getItem("token") && location.pathname !== "/signin")
  ) {
    return <Navigate to={`/login`} replace />;
  }

  return <Outlet />;
};
