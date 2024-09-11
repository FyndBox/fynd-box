import { FC, ReactElement } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AuthGuard: FC<{ children: ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthGuard;
