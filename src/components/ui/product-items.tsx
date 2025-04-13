"use client";

import Image from "next/image";
import { Product } from "@/libs/schemas";
import { useCartContext } from "@/providers/cart-provider";
import { Button, Flex, Icon } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface ProductItemsProps {
  product: Product;
}

export function ProductItems({ product }: ProductItemsProps) {
  const { addCart } = useCartContext();
  const router = useRouter();

  const handleAddCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    addCart({
      ...product,
      amount: 1,
    });
  };

  return (
    <div 
      onClick={() => router.push(`/product/${product.id}`)}
      className="w-[300px] overflow-hidden cursor-pointer rounded"
    >
      <Flex direction="column" height="250px">
        <div className="h-full relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/${process.env.NEXT_PUBLIC_AWS_BUCKET_FOLDER}/${product.images[0].imageUrl}`}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <Button
          onClick={handleAddCart}
          variant="solid"
          borderRadius={0}
          borderBottomRadius="4px"
        >
          <Icon>
            <FiShoppingCart />
          </Icon>
          Add to cart
        </Button>
      </Flex>
      <p className="font-medium my-2">{product.name}</p>
      <span className="font-medium text-amber-600">
        {product.price.toLocaleString("th-TH", {
          style: "currency",
          currency: "THB",
        })}
      </span>
    </div>
  );
}
