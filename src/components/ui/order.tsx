"use client";

import { useUserContext } from "@/providers/user-provider";

export function Order() {
  const { user } = useUserContext();

  if(!user){
    return null;
  }

  return (
    <div>order</div>
  );
};
