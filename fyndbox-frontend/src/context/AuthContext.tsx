import { createContext, useContext, useState, ReactNode, FC } from "react";
import { login as loginApi, signup as signupApi } from "../api/authService";

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const isAuthenticated = !!token;

  const login = async (email: string, password: string) => {
    const { access_token } = await loginApi(email, password);
    setToken(access_token);
    localStorage.setItem("token", access_token);
  };

  const signup = async (name: string, email: string, password: string) => {
    const { access_token } = await signupApi(name, email, password);
    setToken(access_token);
    localStorage.setItem("token", access_token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ token, login, signup, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
