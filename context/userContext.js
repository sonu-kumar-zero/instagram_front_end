"use client";
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserStateContext = ({ children }) => {
  const [user, setUser] = useState({
    id: "abc-anc",
    userName: "starksonu12",
    bio: "I am sonu Stark",
    email: "s@1.com",
    followerCount: 1000,
    followingCount: 10,
    imageUrl: null,
    name: "sonu kumar",
    postsCount: 10
  });
  const [token, setToken] = useState("sonukumar");
  return (
    <UserContext.Provider value={{ user, token, setToken, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserState = () => useContext(UserContext);
