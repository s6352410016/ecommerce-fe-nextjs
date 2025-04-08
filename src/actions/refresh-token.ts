import { Axios } from "@/libs/axios";
import axios from "axios";

export const refreshToken = async () => {
  try{
    await Axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/refresh`);
  }catch(error){
    if(axios.isAxiosError(error)){
      console.log(error.response?.data || "Something went wrong");
    }
  }
}