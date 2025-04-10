"use client";

import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { ProductItems } from "./product-items";
import { useProductPagination } from "@/hooks/use-product-pagination";
import { useSearchProductContext } from "@/providers/search-product-provider";
import { useSearchParams } from "next/navigation";

export function Products() {
  const searchParams = useSearchParams();
  const productName = searchParams.get("productName");

  const { category: CategoryName } = useSearchProductContext();
  const { product, setPage } = useProductPagination(CategoryName, productName ?? undefined); 

  if (product) {
    return (
      <div className="flex flex-col gap-y-8 justify-center">
        <div className="pt-10 flex flex-wrap items-center justify-center xl:justify-start gap-8">
          {product.data.map((product) => (
            <ProductItems product={product} key={product.id} />
          ))}
        </div>
        <Pagination.Root
          onPageChange={(e) => setPage(e.page)}
          count={product.pagination.totalItems}
          pageSize={product.pagination.pageSize}
          defaultPage={product.pagination.currentPage}
          marginBottom="2rem"
          marginLeft="auto"
        >
          <ButtonGroup variant="outline" size="sm">
            <Pagination.PrevTrigger asChild>
              <IconButton>
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(page) => (
                <IconButton variant={{ base: "outline", _selected: "solid" }}>
                  {page.value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton>
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </div>
    );
  }
}