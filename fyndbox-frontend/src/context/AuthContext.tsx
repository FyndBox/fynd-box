import {
  createContext,
  useState,
  ReactNode,
  FC,
  useEffect,
  useRef,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import {
  login as loginApi,
  signup as signupApi,
  updatePassword as updatePasswordApi,
  forgotPassword as forgotPasswordApi,
  resetPassword as resetPasswordApi,
  validateResetToken as validateResetTokenApi,
} from '../api/authService';

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
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updatePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (
    email: string,
    resetToken: string,
    password: string,
  ) => Promise<boolean>;
  validateResetToken: (email: string, resetToken: string) => Promise<boolean>;
  isAuthenticated: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const storedToken = getTokenFromLocalStorage();
    if (storedToken && !isTokenExpired(storedToken)) {
      setToken(storedToken);
      startLogoutTimer();
    } else {
      logout();
    }
    setLoading(false);

    return () => {
      clearLogoutTimer();
    };
  }, []);

  const startLogoutTimer = () => {
    clearLogoutTimer();
    logoutTimerRef.current = setTimeout(() => {
      logout();
    }, 3600000); // 1 hour in milliseconds
  };

  const clearLogoutTimer = () => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  };

  const isTokenExpired = (token: string) => {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp! < currentTime;
  };

  const isAuthenticated = !!token;

  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    setLoading(true);
    try {
      const { access_token } = await loginApi(email, password);
      setToken(access_token);
      setTokenInLocalStorage(access_token);
      startLogoutTimer();
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const { access_token } = await signupApi(name, email, password);
      setToken(access_token);
      setTokenInLocalStorage(access_token);
      startLogoutTimer();
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setTokenInLocalStorage(null);
    clearLogoutTimer();
  };

  const updatePassword = async (
    currentPassword: string,
    newPassword: string,
  ): Promise<boolean> => {
    setError(null);
    setLoading(true);

    try {
      await updatePasswordApi(currentPassword, newPassword);
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    setError(null);
    setLoading(true);

    try {
      await forgotPasswordApi(email);
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (
    email: string,
    resetToken: string,
    newPassword: string,
  ): Promise<boolean> => {
    setError(null);
    setLoading(true);
    try {
      await resetPasswordApi({ email, resetToken, newPassword });
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const validateResetToken = async (
    email: string,
    resetToken: string,
  ): Promise<boolean> => {
    setError(null);
    setLoading(true);
    try {
      await validateResetTokenApi(email, resetToken);
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        signup,
        logout,
        updatePassword,
        forgotPassword,
        resetPassword,
        validateResetToken,
        isAuthenticated,
        error,
        setError,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
