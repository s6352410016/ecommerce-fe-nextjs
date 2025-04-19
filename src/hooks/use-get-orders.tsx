import { Axios } from "@/libs/axios";
import { OrderRes } from "@/libs/schemas";
import axios from "axios";
import { useEffect, useState } from "react";

export function useGetOrders(userId?: number) {
  const [orders, setOrders] = useState<Omit<OrderRes, "user">[]>([]);

  const getOrders = async (userId?: number) => {
    try {
      if(userId){
        const { data } = await Axios.get<Omit<OrderRes, "user">[]>(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/order/user/${userId}`
        );
        if(data.length !== 0){
          setOrders(data);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data || "Something went wrong");
      }
    }
  };

  useEffect(() => {
    getOrders(userId);
  }, [userId]);

  return {
    orders,
  }
}
