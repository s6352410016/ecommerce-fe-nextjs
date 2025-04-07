import { Axios } from "@/libs/axios";
import { Profile } from "@/libs/schemas";
import axios from "axios";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<Profile>();
  const [isLoading, setIsLoading] = useState(false);

  const getUser = async () => {
    try {
      setIsLoading(true);
      const { data } = await Axios.get<Profile>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/profile`
      );
      
      if(data){
        setUser(data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data || "Something went wrong");
      }
    }
  };

  const signOut = () => {
    setUser(undefined);
  }

  useEffect(() => {
    getUser();
  }, []);

  return {
    user,
    isLoading,
    refreshUser: getUser,
    signOut,
  }
};
