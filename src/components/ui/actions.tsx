"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@chakra-ui/react";
import { LuShoppingCart, LuUser } from "react-icons/lu";

export function Actions() {
  const router = useRouter();

  return (
    <>
      <Icon 
        onClick={() => router.push("/cart")}
        size="md"
      >
        <LuShoppingCart className="cursor-pointer" />
      </Icon>
      <Icon size="md">
        <LuUser className="cursor-pointer" />
      </Icon>
    </>
  );
}
