"use client";

import { useCart } from "@/hooks/use-cart";
import { CartContextType } from "@/libs/schemas";
import { createContext, useContext } from "react";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode; }){
  const { cart, addCart } = useCart();

  return (
    <CartContext.Provider value={{ cart, addCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => {
  const context = useContext(CartContext);
  if(!context){
    throw new Error("Cart context must used within cart provider");
  }

  return context;
}