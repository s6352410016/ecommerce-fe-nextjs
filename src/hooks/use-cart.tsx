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

        return;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      setSuccess(true);
    }
  };

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
  };
}
