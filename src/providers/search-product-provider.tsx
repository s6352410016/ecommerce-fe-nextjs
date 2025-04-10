"use client";

import React, { createContext, SetStateAction, useContext, useState } from "react";

interface SearchProductContextProps {
  children: React.ReactNode;
}

interface SearchProduct {
  category: string[];
  setCategory: React.Dispatch<SetStateAction<string[]>>;
}

const SearchProductContext = createContext<SearchProduct | undefined>(undefined);

export function SearchProductProvider({ children }: SearchProductContextProps){
  const [category, setCategory] = useState<string[]>([]);

  return (
    <SearchProductContext.Provider value={{ category, setCategory }}>
      {children}
    </SearchProductContext.Provider>
  );
}

export const useSearchProductContext = () => {
  const context = useContext(SearchProductContext);
  if(!context){
    throw new Error("Search product context must be used within search product provider");
  }

  return context;
}