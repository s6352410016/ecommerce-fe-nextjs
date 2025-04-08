"use client";

import { useUser } from "@/hooks/use-user";
import { UserContextType } from "@/libs/schemas";
import { createContext, useContext } from "react";

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading, refreshUser } = useUser();

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context){
    throw new Error("Usercontext must be used within user provider");
  }
   
  return context;
};
