"use client";
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserStateContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  return (
    <UserContext.Provider value={{ user, token, setToken, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserState = () => useContext(UserContext);
