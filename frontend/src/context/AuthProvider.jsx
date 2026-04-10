import { useEffect, useState } from "react";
import api from "../lib/axios.js";
import { AuthContext } from "./auth-context.js";

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const token = localStorage.getItem("token");

  const getMe = async () => {
    try {
      const res = await api.get("/auth/me");
      setAuthUser(res.data);
    } catch (err) {
      console.error(`Failed to fetch current user`, err.response || err);
      localStorage.removeItem("token");
      setAuthUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setAuthLoading(false);
      return;
    }

    getMe();
  }, []);

  const login = async (formData) => {
    const res = await api.post("/auth/login", formData);
    const { token, user } = res.data;

    localStorage.setItem("token", token);
    setAuthUser(user);

    return res.data;
  };

  const register = async (formData) => {
    const res = await api.post("/auth/register", formData);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        authLoading,
        login,
        register,
        logout,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
