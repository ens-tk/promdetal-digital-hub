import { Navigate, Outlet } from "react-router-dom";
import { auth } from "@/lib/auth";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
