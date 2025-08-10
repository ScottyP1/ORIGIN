import { createContext, useState, useEffect } from "react";
import api from "../api/axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access") || null
  );
  const [user, setUser] = useState(null);
  const [allRepos, setAllRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!accessToken;

  const logout = () => {
    setUser(null);
    setAllRepos(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAccessToken(null);
  };

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("access", accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    let cancelled = false;

    const fetchUser = async () => {
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("auth/user/");
        if (cancelled) return;
        setUser(data);

        const connected = data.github_connected;

        if (connected) {
          // await api.get("activity/sync/");
          const { data: repos } = await api.get("repos/all/");
          if (cancelled) return;
          setAllRepos(repos);
        } else {
          setAllRepos([]);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setAllRepos([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchUser();
    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        user,
        setUser,
        allRepos,
        setAllRepos,
        isAuthenticated,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
