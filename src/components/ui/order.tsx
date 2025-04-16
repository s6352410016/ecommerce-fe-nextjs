"use client";

import { useUserContext } from "@/providers/user-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Order() {
  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if(!user){
      router.back();
    }
  }, [user, router]);

  return (
    <div>order</div>
  );
};
