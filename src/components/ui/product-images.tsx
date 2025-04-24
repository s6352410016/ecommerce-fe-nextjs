"use client";

import { ProductImage } from "@/libs/schemas";
import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
  productImages?: ProductImage[];
}

export function ProductImages({ productImages }: ProductImagesProps) {
  const [showProductImage, setShowProductImage] = useState(productImages?.[0].imageUrl);

  return (
    <Flex gapX="8">
      <Flex flexDirection="column" gapY="4">
        {productImages?.map((productImgs) => (
          <div 
            onClick={() => setShowProductImage(productImgs.imageUrl)}
            key={productImgs.id}
            className={`w-[170px] h-[140px] relative rounded overflow-hidden cursor-pointer ${productImgs.imageUrl === showProductImage ? "border-2 border-black" : ""}`}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/${process.env.NEXT_PUBLIC_AWS_BUCKET_FOLDER}/${productImgs.imageUrl}`}
              alt={productImgs.imageUrl}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-cover object-center"
            />
          </div>
        ))}
      </Flex>
      <div className="hidden md:flex w-[500px] h-[600px] relative rounded overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/${process.env.NEXT_PUBLIC_AWS_BUCKET_FOLDER}/${showProductImage}`}
          alt={(productImages)?.[0].imageUrl || "productImage"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-cover object-center"
        />
      </div>
    </Flex>
  );
}
