import { Order } from "@/libs/schemas";
import { useEffect, useState } from "react";

export function useOrderAction() {
  const [orders, setOrders] = useState<Order[]>(() => {
    if(typeof window === "undefined"){
      return [];
    }

    const ordersLocalStorage = localStorage.getItem("order");
    if(ordersLocalStorage){
      return JSON.parse(ordersLocalStorage);
    }
 
    return [];
  });

  const saveOrders = (order: Order | Order[]): boolean => {
    if (Array.isArray(order) && order.length !== 0) {
      for(const orderItem of order){
        setOrders((prevOrders) => {
          if(prevOrders.every((prevOrderItem) => prevOrderItem.id !== orderItem.id)){
            return [...prevOrders, ...order];
          }
          return [...prevOrders];
        });
      }

      return true;
    }

    if (!Array.isArray(order)) {
      setOrders((prevOrders) => {
        if(prevOrders.every((prevOrderItem) => prevOrderItem.id !== order.id)){
          return [...prevOrders, order];
        }
        return [...prevOrders];
      });

      return true;
    }

    return false;
  };

  const deleteOrders = () => {
    setOrders([]);
    localStorage.removeItem("order");
  };

  useEffect(() => {
    if(orders && orders.length !== 0){
      localStorage.setItem("order", JSON.stringify(orders));
    }
  }, [orders]);

  return {
    orders,
    saveOrders,
    deleteOrders,
  };
}
