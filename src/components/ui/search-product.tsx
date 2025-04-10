"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { Input, InputGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useRouter } from "next/navigation";

export function SearchProduct() {
  const router = useRouter();

  const [query, setQuery] = useState("");

  const debounceValue = useDebounce<string>(query, 500);

  useEffect(() => {
    router.push(`/?productName=${debounceValue}`);
  }, [debounceValue]);

  return (
    <InputGroup className="hidden sm:flex" endElement={<LuSearch />}>
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        size="md"
        placeholder="Search products"
      />
    </InputGroup>
  );
}
