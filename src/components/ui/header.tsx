"use client";

import { Heading, Link as ChakraLink } from "@chakra-ui/react";
import { SearchProduct } from "./search-product";
import Link from "next/link";
import { Actions } from "./actions";
import { useNavigate } from "@/hooks/use-navigate";
import { useSearchProductContext } from "@/providers/search-product-provider";

export function Header() {
  const routes = useNavigate();
  const { setCategory } = useSearchProductContext();

  return (
    <header className="h-full flex items-center gap-x-20">
      <ChakraLink asChild onClick={() => setCategory(["default"])}>
        <Link href="/">
          <Heading size="2xl" fontWeight="bold">
            Exclusive
          </Heading>
        </Link>
      </ChakraLink>
      <nav className="hidden lg:flex items-center gap-x-5 w-full">
        {routes.map((route) => (
          <ChakraLink asChild key={route.title}>
            <Link className={`text-md ${route.active ? "font-medium" : "font-normal"}`} href={route.href}>
              {route.title}
            </Link>
          </ChakraLink>
        ))}
      </nav>
      <div className="flex justify-end items-center gap-x-4 w-full">
        <SearchProduct />
        <Actions />
      </div>
    </header>
  );
}
