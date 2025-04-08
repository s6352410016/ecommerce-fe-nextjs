import { Axios } from "@/libs/axios";
import { Profile } from "@/libs/schemas";

export const getUser = async () => {
  return Axios.get<Profile>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/profile`
  );
};
