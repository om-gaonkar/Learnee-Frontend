import { useEffect, useMemo, useState, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";
import { CheckAuth } from "../api/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await CheckAuth();

        setToken(data.token);
        setUser(data.user); // if your refresh endpoint returns user
        setIsAuthenticated(true);
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      loading,
      setUser,
      setIsAuthenticated,
      logout,
    }),
    [user, token, isAuthenticated, loading],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
