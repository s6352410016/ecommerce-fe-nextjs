"use client";

import { useGetOrders } from "@/hooks/use-get-orders";
import { useUserContext } from "@/providers/user-provider";
import { EmptyState, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BsBoxSeamFill } from "react-icons/bs";
import Orders from "./orders";

export function Order() {
  const { user, isLoading } = useUserContext();
  const { orders } = useGetOrders(user?.id);
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.back();
    }
  }, [user, router, isLoading]);

  return (
    <>
      {orders && orders.length > 0 ? (
        <Orders orders={orders} />
      ) : (
        <div className="flex h-full items-center justify-center">
          <EmptyState.Root>
            <EmptyState.Content>
              <EmptyState.Indicator>
                <BsBoxSeamFill />
              </EmptyState.Indicator>
              <VStack textAlign="center">
                <EmptyState.Title>Your orders is empty</EmptyState.Title>
                <EmptyState.Description>
                  Explore our orders
                </EmptyState.Description>
              </VStack>
            </EmptyState.Content>
          </EmptyState.Root>
        </div>
      )}
    </>
  );
}
