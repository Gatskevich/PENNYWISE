import React, { createContext, useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../Models/User";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import axios from "axios";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  loginUser: (username: string, password: string) => void;
  registerUser: (email: string, username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  const loadUserData = useCallback(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setToken(storedToken);
      setupAxiosHeaders(storedToken);
    }
  }, []);

  const saveUserData = (user: UserProfile, token: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setUser(user);
    setToken(token);
    setupAxiosHeaders(token);
  };

  const setupAxiosHeaders = (token: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const clearUserData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    loadUserData();
    setIsReady(true);
  }, [loadUserData]);

  const registerUser = useCallback(async (email: string, username: string, password: string) => {
    try {
      const res = await registerAPI(email, username, password);
      if (res?.data) {
        const { token, userName, email } = res.data;
        const userObj: UserProfile = { userName, email };
        saveUserData(userObj, token);
        toast.success("Registration successful!");
        navigate("/search");
      }
    } catch {
      toast.warning("Server error occurred during registration.");
    }
  }, [navigate]);

  const loginUser = useCallback(async (username: string, password: string) => {
    try {
      const res = await loginAPI(username, password);
      if (res?.data) {
        const { token, userName, email } = res.data;
        const userObj: UserProfile = { userName, email };
        saveUserData(userObj, token);
        toast.success("Login successful!");
        navigate("/search");
      }
    } catch {
      toast.warning("Login failed. Please check your credentials.");
    }
  }, [navigate]);

  const logout = useCallback(() => {
    clearUserData();
    navigate("/");
  }, [navigate]);

  const isLoggedIn = () => !!user;

  const contextValue = useMemo(() => ({
    user,
    token,
    loginUser,
    registerUser,
    logout,
    isLoggedIn,
  }), [user, token, loginUser, registerUser, logout]);

  return (
    <UserContext.Provider value={contextValue}>
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
