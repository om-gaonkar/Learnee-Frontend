import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import Loading from "../components/ui/Loading";

export default function PublicRoute() {
  const { isAuthenticated, loading } = useAuthContext();
  if (loading) {
    return <Loading />;
  }

  return isAuthenticated ? <Navigate to="/user/profile" replace /> : <Outlet />;
}
