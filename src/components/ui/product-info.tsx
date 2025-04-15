"use client";

import { setCookie } from "@/actions/cookies";
import { Axios } from "@/libs/axios";
import { Product } from "@/libs/schemas";
import { useModalActionsContext } from "@/providers/modal-actions-provider";
import { useUserContext } from "@/providers/user-provider";
import {
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  NumberInput,
  Separator,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { SlRefresh } from "react-icons/sl";
import { TbTruckDelivery } from "react-icons/tb";

interface ProductInfoProps {
  product?: Product;
}

export default function ProductInfo({
  product,
}: ProductInfoProps) {
  const { user } = useUserContext();
  const { setOpenAuthModal } = useModalActionsContext();

  const router = useRouter();
  const [amount, setAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      if(!user){
        setOpenAuthModal(true);
        return;
      }

      setCookie();

      if(product){
        setIsLoading(true);
        const { data } = await Axios.post<{url: string}>(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/stripe/checkout-session`, {
          price: product.stripePriceId,
          quantity: amount,
        });

        setAmount(1);
        router.push(data.url);
      }
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.log(error.response?.data || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Flex flexDirection="column" gapY="5">
      <Heading size="2xl">{product?.name}</Heading>
      <Text textStyle="xl">
        {product?.price.toLocaleString("th-TH", {
          style: "currency",
          currency: "THB",
        })}
      </Text>
      <Text textStyle="sm">{product?.description}</Text>
      <Separator />
      <Flex gapX="4">
        <NumberInput.Root
          value={amount.toString()}
          onValueChange={(e) => setAmount(e.valueAsNumber)}
          unstyled
          spinOnPress={false}
          min={1}
          max={product?.stockQuantity}
        >
          <HStack gap="2">
            <NumberInput.DecrementTrigger asChild>
              <IconButton variant="outline" size="sm">
                <LuMinus />
              </IconButton>
            </NumberInput.DecrementTrigger>
            <NumberInput.ValueText
              textAlign="center"
              fontSize="lg"
              minW="3ch"
            />
            <NumberInput.IncrementTrigger asChild>
              <IconButton variant="outline" size="sm">
                <LuPlus />
              </IconButton>
            </NumberInput.IncrementTrigger>
          </HStack>
        </NumberInput.Root>
        <Button 
          onClick={handleCheckout}
          disabled={isLoading}
          variant="solid"
        >
          Buy now
        </Button>
      </Flex>
      <div>
        <div className="rounded-sm flex items-center justify-start gap-x-4 p-3 border border-solid">
          <Icon size="2xl">
            <TbTruckDelivery />
          </Icon>
          <Flex flexDirection="column" justifyContent="center">
            <Heading size="lg">Free Delivery</Heading>
            <Text textStyle="sm" textDecoration="underline">
              Enter your postal code for Delivery Availability
            </Text>
          </Flex>
        </div>
        <div className="rounded-sm flex items-center justify-start gap-x-4 p-3 border border-solid">
          <Icon size="xl">
            <SlRefresh />
          </Icon>
          <Flex flexDirection="column" justifyContent="center">
            <Heading size="lg">Return Delivery</Heading>
            <Text textStyle="sm" textDecoration="underline">
              Free 30 Days Delivery Returns. Details
            </Text>
          </Flex>
        </div>
      </div>
    </Flex>
  );
}
