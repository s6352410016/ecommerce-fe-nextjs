"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface ModalActionsContextType {
  openAuthModal: boolean;
  setOpenAuthModal: Dispatch<SetStateAction<boolean>>;
}

const ModalActionsContext = createContext<ModalActionsContextType | undefined>(undefined);

export function ModalActionsProvider({ children }: { children: React.ReactNode }){
  const [openAuthModal, setOpenAuthModal] = useState(false);

  return (
    <ModalActionsContext.Provider value={{ openAuthModal, setOpenAuthModal }}>
      {children}
    </ModalActionsContext.Provider>
  );
}

export const useModalActionsContext = () => {
  const context = useContext(ModalActionsContext);
  if(!context){
    throw new Error("Modal actions context must be used within modal actions provider");
  }

  return context;
}