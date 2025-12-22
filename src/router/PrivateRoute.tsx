import { Navigate, Outlet } from "react-router-dom";
import { auth } from "@/lib/auth";

const PrivateRoute = () => {
  if (!auth.isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
