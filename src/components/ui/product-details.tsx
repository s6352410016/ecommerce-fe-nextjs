"use client";

import { Product } from "@/libs/schemas";
import { Breadcrumb, Flex } from "@chakra-ui/react";
import { LiaSlashSolid } from "react-icons/lia";
import { ProductImages } from "./product-images";
import ProductInfo from "./product-info";
import Link from "next/link";

export function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="mt-10">
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link asChild>
              <Link href="/">Home</Link>
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator>
            <LiaSlashSolid />
          </Breadcrumb.Separator>
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>Product</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <div className="mt-10 flex flex-col items-center lg:flex-row gap-x-10 gap-y-4">
        <ProductImages productImages={product.images} />
        <ProductInfo product={product} />
      </div>
    </div>
  );
}
