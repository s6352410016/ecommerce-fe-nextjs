import { Cart } from "@/libs/schemas";
import { useCartContext } from "@/providers/cart-provider";
import { useEffect, useState } from "react";

export function useCartAction(cart: Cart) {
  const [amount, setAmount] = useState(cart.amount);
  const { setAmount: setAmountCart, getCartById } = useCartContext();
  const [totalPrice, setTotalPrice] = useState(0);

  const addAmount = (count: number) => {
    setAmount(count);
  }

  useEffect(() => {
    if (amount) {
      setAmountCart(cart.id, amount);
    }

    const cartData = getCartById(cart.id);
    if (cartData && cartData.amount) {
      setTotalPrice(cartData.price * cartData.amount);
    }
  }, [amount]);

  return {
    amount,
    addAmount,
    totalPrice,
  }
}
