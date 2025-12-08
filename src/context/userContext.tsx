/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import type { User } from "../types/User";

interface UserContextType {
  user: User | null;
  setUser: (u: User | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
