import { toaster } from "@/components/ui/toaster";
import { Cart } from "@/libs/schemas";
import { useEffect, useState } from "react";

export function useCart() {
  const [cart, setCart] = useState<Cart[]>([]);
  const [success, setSuccess] = useState<boolean | null>(null);

  const addCart = (newCart: Cart) => {
    if (newCart) {
      setCart((prevCart) => {
        if (prevCart.every((cartItem) => cartItem.id !== newCart.id)) {
          return [...prevCart, newCart];
        }
        return [...prevCart];
      });
    }
  };

  const addCartToLocalStorage = () => {
    if (cart.length !== 0) {
      const cartLocalStorage = localStorage.getItem("cart");
      if (cartLocalStorage) {
        let cartData: Cart[] = JSON.parse(cartLocalStorage);

        cart.forEach((cartItem) => {
          if (cartData.every((cartObj) => cartObj.id !== cartItem.id)) {
            cartData.push(cartItem);
            localStorage.setItem("cart", JSON.stringify(cartData));
            setSuccess(true);
            return;
          }
          
          setSuccess(false);
        });

        setCart([]);
        return;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      setSuccess(true);
      setCart([]);
    }
  };

  const getCart = () => {
    const cartLocalStorage = localStorage.getItem("cart");
    if(cartLocalStorage){
      const cartData: Cart[] = JSON.parse(cartLocalStorage);
      return cartData
    }
    return [];
  }

  const setAmount = (id: number, amount: number = 1) => {
    const cartLocalStorage = localStorage.getItem("cart");
    if(cartLocalStorage){
      const cartData: Cart[] = JSON.parse(cartLocalStorage);
      const updateCart = cartData.map((cartItem) => {
        if(cartItem.id === id){
          return {
            ...cartItem,
            amount,
          }
        }
        return cartItem;
      });
      localStorage.setItem("cart", JSON.stringify(updateCart));
      setCart((prevCart) => {
        return prevCart.map((cartItem) => {
          if(cartItem.id === id){
            return {
              ...cartItem,
              amount,
            }
          }
          return cartItem;
        })
      });
    }
  }

  const getCartById = (id: number) => {
    const cartLocalStorage = localStorage.getItem("cart");
    if(cartLocalStorage){
      const cartData: Cart[] = JSON.parse(cartLocalStorage);
      return cartData.find((cartItem) => cartItem.id === id) as Cart;
    }
  }

  const deleteCartById = (id: number) => {
    const cartLocalStorage = localStorage.getItem("cart");
    if(cartLocalStorage){
      const cartData: Cart[] = JSON.parse(cartLocalStorage);
      const updateCart = cartData.filter((cartItem) => cartItem.id !== id);
      localStorage.setItem("cart", JSON.stringify(updateCart));
      setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id));
    }
  }

  const deleteCart = () => {
    const cartLocalStorage = localStorage.getItem("cart");
    if(cartLocalStorage){
      localStorage.removeItem("cart");
      setCart([]);
    }
  }

  useEffect(() => {
    addCartToLocalStorage();
  }, [cart]);

  useEffect(() => {
    Promise.resolve().then(() => {
      if (success) {
        toaster.create({
          description: "add product to cart successfully",
          type: "success",
        });
        setSuccess(null);
      } else if(success === false) {
        toaster.create({
          description: "you cannot add product already exist in your cart",
          type: "error",
        });
        setSuccess(null);
      }
    });
  }, [success]);

  return {
    cart,
    addCart,
    getCart,
    setAmount,
    getCartById,
    deleteCartById,
    deleteCart,
  };
}
