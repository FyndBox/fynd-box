import { createContext, useState, ReactNode, FC, useEffect } from 'react';
import { login as loginApi, signup as signupApi } from '../api/authService';

const getTokenFromLocalStorage = (): string | null => {
  try {
    return localStorage.getItem('token');
  } catch (error) {
    console.error('Could not get token from localStorage', error);
    return null;
  }
};

const setTokenInLocalStorage = (token: string | null): void => {
  try {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  } catch (error) {
    console.error('Could not set token in localStorage', error);
  }
};

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getTokenFromLocalStorage();
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const isAuthenticated = !!token;

  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    try {
      const { access_token } = await loginApi(email, password);
      setToken(access_token);
      setTokenInLocalStorage(access_token);
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setError(null);
    try {
      const { access_token } = await signupApi(name, email, password);
      setToken(access_token);
      setTokenInLocalStorage(access_token);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
    }
  };

  const logout = () => {
    setToken(null);
    setTokenInLocalStorage(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, login, signup, logout, isAuthenticated, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
