"use client";

import { deleteCookie, deleteCookieCart, getCookieCart } from "@/actions/cookies";
import { useCartContext } from "@/providers/cart-provider";
import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FaRegCircleXmark } from "react-icons/fa6";

export function CheckOut() {
  const { deleteCart } = useCartContext();

  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  const router = useRouter();

  const handleButtunClick = async () => {
    await deleteCookieCart();

    if(success === "true"){
      // TODO: create order api
      router.push("/order");
      return;
    }

    router.push("/");
  }

  const handleDeleteCookie = async () => {
    await deleteCookie();
    const shouldDeleteCart = await getCookieCart();
    if(shouldDeleteCart){
      deleteCart();
    }
  }

  useEffect(() => {
    handleDeleteCookie();
  }, []);

  return (
    <Flex
      minH="vh"
      w="full"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gapY="4"
    >
      {success === "true" ? (
        <>
          <Icon size="inherit" color="green.400">
            <CiCircleCheck size={100} />
          </Icon>
          <Heading size="3xl" color="gray.700">
            Thank you for your order
          </Heading>
          <Button 
            onClick={handleButtunClick}
            variant="solid" 
            mt="3"
          >Go to your order
          </Button>
        </>
      ) : (
        <>
          <Icon size="inherit" color="red.500">
            <FaRegCircleXmark size={80} />
          </Icon>
          <Heading size="3xl" color="gray.700">
            Checkout failed
          </Heading>
          <Button 
            onClick={handleButtunClick}
            variant="solid" 
            mt="3" 
            colorPalette="red"
          >
            Back to shop
          </Button>
        </>
      )}
    </Flex>
  );
}
