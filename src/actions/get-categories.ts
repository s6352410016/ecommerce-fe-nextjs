import { Axios } from "@/libs/axios";
import { Categories } from "@/libs/schemas";
import axios from "axios";

export const getCategories = async () => {
  "use cache";
  try {
    const { data } = await Axios.get<Categories[]>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/category/find`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data || "Something went wrong");
    }
  }
};
