import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

export default function Home() {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) return null;

  return (
    <Navigate to={isAuthenticated ? "/user/profile" : "/auth/login"} replace />
  );
}
