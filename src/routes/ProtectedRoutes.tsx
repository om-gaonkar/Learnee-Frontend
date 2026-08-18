import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import Loading from "../components/ui/Loading";

export default function ProtectedRoute({
  allowedRoles,
}: {
  allowedRoles: ("user" | "admin")[];
}) {
  const { isAuthenticated, loading, user } = useAuthContext();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
