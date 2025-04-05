import { 
  Heading, 
  Link as ChakraLink
} from "@chakra-ui/react";
import { SearchProduct } from "./search-product";
import Link from "next/link";
import { Actions } from "./actions";

export function Header() {
  return (
    <header className="h-full flex items-center gap-x-20">
      <ChakraLink asChild>
        <Link href="/">
          <Heading size="2xl" fontWeight="bold">
            Exclusive
          </Heading>
        </Link>
      </ChakraLink>
      <nav className="hidden lg:flex items-center gap-x-5 w-full">
        <ChakraLink asChild>
          <Link className="text-md" href="/">
            Home
          </Link>
        </ChakraLink>
        <ChakraLink asChild>
          <Link className="text-md" href="/cart">
            Cart
          </Link>
        </ChakraLink>
        <ChakraLink asChild>
          <Link className="text-md" href="/order">
            Order
          </Link>
        </ChakraLink>
      </nav>
      <div className="flex justify-end items-center gap-x-4 w-full">
        <SearchProduct />
        <Actions />
      </div>
    </header>
  );
}
