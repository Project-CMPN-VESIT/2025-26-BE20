import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../utils/cookie-helper";
import { LONG_LIVE_TOKEN } from "../constants/constants";
import { get } from "react-hook-form";

const PublicRoute = () => {
  const isAuthenticated = Boolean(
    getCookie(LONG_LIVE_TOKEN)
  );

  return isAuthenticated
    ? <Navigate to="/dashboard" replace />
    : <Outlet />;
};

export default PublicRoute;
