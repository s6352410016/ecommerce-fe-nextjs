import { Axios } from "@/libs/axios";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useOrderStatus() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState<"PAID" | "UNPAID" | null>(null);

  const checkOrderStatus = async (orderId: string) => {
    try {
      const { data } = await Axios.get<{ status: string }>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/order/status/${orderId}`
      );
      if (data && data.status) {
        setStatus(data.status === "paid" ? "PAID" : "UNPAID");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data || "Something went wrong");
      }
    }
  };

  useEffect(() => {
    const orderId = localStorage.getItem("orderId");
    if (orderId) {
      setOrderId(orderId);
    }
  }, []);

  useEffect(() => {
    if (orderId) {
      checkOrderStatus(orderId);
    }
  }, [orderId]);

  return {
    status,
  }
}
