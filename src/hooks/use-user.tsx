import { getUser } from "@/actions/get-user";
import { refreshToken } from "@/actions/refresh-token";
import { Profile } from "@/libs/schemas";
import axios from "axios";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getProfile = async () => {
    try {
      setIsLoading(true);

      const { data: user } = await getUser();
      if (user) {
        setUser(user);
      }
    } catch (error) {
      setUser(null);

      if (axios.isAxiosError(error)) {
        console.log(error.response?.data || "Something went wrong");

        if (error.response?.status === 401) {
          try {
            await refreshToken();
    
            const { data: user } = await getUser();
            setUser(user);
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.log(error.response?.data || "Something went wrong");
            }
          }
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return {
    user,
    isLoading,
    refreshUser: getProfile,
  };
};
