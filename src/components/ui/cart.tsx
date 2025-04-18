"use client";

import { useCartContext } from "@/providers/cart-provider";
import {
  Breadcrumb,
  Button,
  EmptyState,
  Flex,
  Heading,
  Separator,
  VStack,
} from "@chakra-ui/react";
import { LiaSlashSolid } from "react-icons/lia";
import { LuShoppingCart } from "react-icons/lu";
import { CartItem } from "./cart-item";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useUserContext } from "@/providers/user-provider";
import { useModalActionsContext } from "@/providers/modal-actions-provider";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie, setCookieCart } from "@/actions/cookies";
import { toaster } from "./toaster";
import { useOrderAction } from "@/hooks/use-order-action";
import { Order } from "@/libs/schemas";

export function Cart() {
  const router = useRouter();

  const { user } = useUserContext();
  const { setOpenAuthModal } = useModalActionsContext();

  const { getCart, deleteCart } = useCartContext();
  const cart = getCart();

  const { saveOrders } = useOrderAction();

  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = useMemo(() => {
    return cart
      .reduce(
        (prevValue, cartItem) => cartItem.price * cartItem.amount + prevValue,
        0
      )
      .toLocaleString("th-TH", {
        style: "currency",
        currency: "THB",
      });
  }, [cart]);

  const handleCheckOut = async () => {
    if (!user) {
      setOpenAuthModal(true);
      return;
    }

    try {
      if (cart.length !== 0) {
        await setCookie();
        await setCookieCart();
        setIsLoading(true);

        const productOrders: Order[] = cart.map((cartItem) => ({
          ...cartItem,
          quantity: cartItem.amount,
        }));
        const success = saveOrders(productOrders);
        if (!success) {
          toaster.create({
            description: "you cannot add product already exist in your order",
            type: "error",
          });
          return;
        }

        router.push("/create-order");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

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
            <Breadcrumb.CurrentLink>Cart</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <Flex
        marginTop="10"
        alignItems="center"
        justifyContent="space-between"
        height="70px"
        shadow="sm"
        rounded="md"
        px="10"
      >
        <p className="font-medium w-[200px] flex items-center justify-start">
          Product
        </p>
        <p className="font-medium w-[100px] flex items-center justify-start">
          Price
        </p>
        <p className="font-medium">Quantity</p>
        <p className="font-medium w-[100px] flex items-center justify-start">
          Subtotal
        </p>
      </Flex>
      {cart.length !== 0 ? (
        cart.map((cartItem) => <CartItem cart={cartItem} key={cartItem.id} />)
      ) : (
        <EmptyState.Root>
          <EmptyState.Content>
            <EmptyState.Indicator>
              <LuShoppingCart />
            </EmptyState.Indicator>
            <VStack textAlign="center">
              <EmptyState.Title>Your cart is empty</EmptyState.Title>
              <EmptyState.Description>
                Explore our products and add items to your cart
              </EmptyState.Description>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      )}
      <Flex marginTop="10" alignItems="center" justifyContent="space-between">
        <Button asChild variant="outline" size="xl">
          <Link href="/">Return to shop</Link>
        </Button>
        <Button
          onClick={deleteCart}
          colorPalette="red"
          variant="solid"
          size="xl"
        >
          Remove all products
        </Button>
      </Flex>
      <Flex justifyContent="flex-end" alignItems="center">
        <div className="mt-10 border border-solid border-black w-[350px] p-5 flex flex-col">
          <Heading size="xl">Cart total</Heading>
          <Flex justifyContent="space-between" alignItems="center" my="3">
            <p>Products:</p>
            <p>{cart.length}</p>
          </Flex>
          <Separator />
          <Flex justifyContent="space-between" alignItems="center" my="3">
            <p>Total price:</p>
            <p>{totalPrice}</p>
          </Flex>
          <Separator />
          <Flex justifyContent="space-between" alignItems="center" my="3">
            <p>Shipping:</p>
            <p>free</p>
          </Flex>
          <Separator />
          <Button
            onClick={handleCheckOut}
            disabled={isLoading}
            variant="solid"
            marginLeft="auto"
            marginTop="3"
          >
            Check out
          </Button>
        </div>
      </Flex>
    </div>
  );
}
