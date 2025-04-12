"use client";

import { useCartAction } from "@/hooks/use-cart-action";
import { Cart } from "@/libs/schemas";
import { useCartContext } from "@/providers/cart-provider";
import {
  HStack,
  Icon,
  IconButton,
  NumberInput,
} from "@chakra-ui/react";
import Image from "next/image";
import { FaCircleXmark } from "react-icons/fa6";
import { LuMinus, LuPlus } from "react-icons/lu";

export function CartItem({ cart }: { cart: Cart }) {
  const { amount, addAmount, totalPrice } = useCartAction(cart);
  const { deleteCartById } = useCartContext();

  return (
    <div className="mt-10 flex items-center justify-between h-[70px] shadow-sm rounded-md px-10">
      <div className="flex items-center gap-x-4 relative w-[200px]">
        <div 
          onClick={() => deleteCartById(cart.id)}
          className="absolute -top-3 -left-1 z-40 cursor-pointer"
        >
          <Icon color="red.600">
            <FaCircleXmark />
          </Icon>
        </div>
        <div className="relative w-[50px] h-[50px] rounded overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/${process.env.NEXT_PUBLIC_AWS_BUCKET_FOLDER}/${cart.images[0].imageUrl}`}
            alt={cart.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <p>{cart.name}</p>
      </div>
      <p className="flex items-center justify-start w-[100px]">
        {cart.price.toLocaleString("th-TH", {
          style: "currency",
          currency: "THB",
        })}
      </p>
      <NumberInput.Root
        value={amount?.toString() ?? "1"}
        onValueChange={(e) => {addAmount(e.valueAsNumber)}}
        unstyled
        spinOnPress={false}
        min={1}
        max={cart.stockQuantity}
      >
        <HStack gap="2">
          <NumberInput.DecrementTrigger asChild>
            <IconButton variant="outline" size="sm">
              <LuMinus />
            </IconButton>
          </NumberInput.DecrementTrigger>
          <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />
          <NumberInput.IncrementTrigger asChild>
            <IconButton variant="outline" size="sm">
              <LuPlus />
            </IconButton>
          </NumberInput.IncrementTrigger>
        </HStack>
      </NumberInput.Root>
      <p className="flex items-center justify-start w-[100px]">
        {totalPrice.toLocaleString("th-TH", {
          style: "currency",
          currency: "THB",
        })}
      </p>
    </div>
  );
}
