/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types/User";

interface UserContextType {
  user: User | null;
  setUser: (u: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const sessionUser = localStorage.getItem("user");
    if (!sessionUser) {
      return null;
    } else {
      const sessionUserParse = JSON.parse(sessionUser) as User;
      return sessionUserParse;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUserContext must be used inside UserProvider");
  }
  return ctx;
}
