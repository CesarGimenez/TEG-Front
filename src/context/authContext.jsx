import React, { useState, useEffect, createContext } from "react";
import { getMeApi } from "../api/auth";
import { setToken, getToken, removeToken } from "../api/token";

export const AuthContext = createContext({
  auth:
    {
      token: "",
      user: "",
    } || null,
  login: (access) => null,
  logout: () => null,
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [auth, setAuth] = useState({} || null);

  useEffect(() => {
    (async () => {
      const token = getToken();
      if (token) {
        const data = await getMeApi();
        const { user } = data;
        setAuth({ token, user });
      } else {
        setAuth(null);
      }
    })();
  }, []);
  const login = async (access) => {
    setToken(access);
    const res = await getMeApi();
    const { token, user } = res;
    setAuth({ token, user });
  };
  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
    }
  };
  const valueContext = {
    auth,
    login,
    logout,
  };

  if (auth === undefined) {
    return null;
  }

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
};
