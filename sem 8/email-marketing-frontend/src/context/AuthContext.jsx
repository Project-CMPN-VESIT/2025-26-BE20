import { createContext, useContext, useEffect, useState } from "react";
import authAxios from "../config/AuthAxios";
import { getCookie } from "../utils/cookie-helper";
import { LONG_LIVE_TOKEN } from "../constants/constants";
import { set } from "react-hook-form";
import { removeCookie } from "../utils/cookie-helper";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(getCookie(LONG_LIVE_TOKEN));

  const logout = () => {
    removeCookie(LONG_LIVE_TOKEN);
    setUser(null);
    setOrg(null);
  };

  const fetchUser = async () => {
    try {
      const res = await authAxios.get("/auth/get-user-details");
      setUser(res.data.data.user);
    } catch (error) {
      setUser(null);
    } 
  };
  
  const fetchOrg = async () => {
    try {
      const res = await authAxios.get("/auth/get-organization-details");
      setOrg(res.data.data.organization);
    } catch (error) {
      setOrg(null);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  }

  const updateOrg = (updatedOrg) => {
    setOrg(updatedOrg);
  }

  useEffect(() => {
    const init = async () => {
      if (!token) {
        setUser(null);
        setOrg(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        await Promise.all([fetchUser(), fetchOrg()]);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [token]);


  return (
    <AuthContext.Provider value={{ user, updateUser, org, updateOrg, loading, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
