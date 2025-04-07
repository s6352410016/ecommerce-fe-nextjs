import { Axios } from "@/libs/axios";
import axios from "axios";

export const signOut = async () => {
  try{
    await Axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signout`);
  }catch(error){
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || "Something went wrong");
    }
  }
}