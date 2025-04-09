import { Axios } from "@/libs/axios";
import { Categories } from "@/libs/schemas";
import axios from "axios";
import { cookies } from "next/headers";

export const getCategories = async () => {
  try {
    const cookie = await cookies();
    const accessToken = cookie.get("accessToken")?.value;
    if (accessToken) {
      const { data } = await Axios.get<Categories[]>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/category/find`,
        {
          headers: {
            Cookie: `accessToken=${accessToken}`,
          },
        }
      );

      return data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data || "Something went wrong");
    }
  }
};
