import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [user, setUser] = useState(null);

  const login = async (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    await fetchUser(newToken); 
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const fetchUser = async (tk = token) => {
    try {
      const res = await api.get("/me/", {
        headers: {
          Authorization: `Token ${tk}`,
        },
      });
      console.log("Fetched user:", res.data);
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user", err);
      logout(); // force logout on error
    }
  };

  useEffect(() => {
    if (token) fetchUser(); // on first load or refresh
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
