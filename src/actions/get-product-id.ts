import { Axios } from "@/libs/axios";
import { Product } from "@/libs/schemas";
import axios from "axios";

export const getProductId = async (id: number) => {
  try{
    const { data } = await Axios.get<Product>(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/product/find/${id}`);
    return data;
  }catch(error){
    if(axios.isAxiosError(error)){
      console.log(error.response?.data || "Something went wrong");
    }
  }
}