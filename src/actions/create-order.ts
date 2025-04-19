import { Axios } from "@/libs/axios";
import { Order, OrderRes } from "@/libs/schemas";
import axios from "axios";

export const createOrder = async (
  orders: Order[],
  orderInfo: {
    userId: number;
    shippingAddress: string;
    phone: string;
    email: string;
  }
) => {
  try {
    const { userId, shippingAddress, phone, email } = orderInfo;

    const { data } = await Axios.post<OrderRes>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/stripe/checkout-session`,
      {
        userId,
        shippingAddress,
        phone,
        email,
        product: orders.map((orderItem) => ({
          productId: orderItem.id,
          quantity: orderItem.quantity,
          unitPrice: orderItem.price,
          priceId: orderItem.stripePriceId,
        })),
      }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data || "Something went wrong");
      return null;
    }

    return null;
  }
};
