"use client";

import {
  ButtonGroup,
  EmptyState,
  IconButton,
  Pagination,
  VStack,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight, LuSearchX } from "react-icons/lu";
import { ProductItems } from "./product-items";
import { useProductPagination } from "@/hooks/use-product-pagination";
import { useSearchParams } from "next/navigation";

export function Products() {
  const searchParams = useSearchParams();
  const productName = searchParams.get("productName");

  const { product, setPage } = useProductPagination(
    productName ?? undefined
  );

  if (product) {
    return (
      <div className="flex flex-col gap-y-8 justify-center">
        <div className="pt-10 flex flex-wrap items-center justify-center xl:justify-start gap-8">
          {product.data.length !== 0 ? (
            product.data.map((product) => (
              <ProductItems product={product} key={product.id} />
            ))
          ) : (
            <EmptyState.Root>
              <EmptyState.Content>
                <EmptyState.Indicator>
                  <LuSearchX />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                  <EmptyState.Title>Products not found</EmptyState.Title>
                  <EmptyState.Description>
                    Explore our products
                  </EmptyState.Description>
                </VStack>
              </EmptyState.Content>
            </EmptyState.Root>
          )}
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
