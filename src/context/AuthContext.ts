import { createContext, useContext } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role:"user" | "admin";
}

export interface AuthContextType {
  user: User | null;
   token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};