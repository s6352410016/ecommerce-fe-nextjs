import { OrderDetails, OrderRes } from "@/libs/schemas";
import { Flex, Separator, Text } from "@chakra-ui/react";
import Image from "next/image";

interface OrderItemProps {
  order: Omit<OrderRes, "user">;
  orderDetails: OrderDetails;
}

export function OrderItem({ order, orderDetails }: OrderItemProps) {
  return (
    <>
      <Separator />
      <Flex direction="column" lg={{ flexDirection: "row" }} alignItems="center" justify="space-around" py="6" gapY="4">
        <Flex gapX="4">
          <div className="w-[150px] h-[150px] relative overflow-hidden rounded-sm">
            <Image
              src={`${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/${process.env.NEXT_PUBLIC_AWS_BUCKET_FOLDER}/${orderDetails.product.images[0].imageUrl}`}
              alt={orderDetails.product.name}
              fill
              priority
            />
          </div>
          <Flex minH="full" direction="column" justify="space-between">
            <Flex direction="column">
              <Text textStyle="xl">{orderDetails.product.name}</Text>
              <Text textStyle="lg" color="grey" maxW="500px">
                {orderDetails.product.description.slice(0, 100)}...
              </Text>
            </Flex>
            <Flex gapX="4">
              <Text color="grey">Quantity: {orderDetails.quantity}</Text>
              <Text fontWeight="medium">
                Unit price:
                &nbsp;
                {orderDetails.product.price.toLocaleString("th-TH", {
                  style: "currency",
                  currency: "THB",
                })}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex display="none" md={{ display: "flex" }} direction="column" gapY="1">
          <Text textStyle="lg" color="grey">
            Status
          </Text>
          <Text textStyle="xl" color="orange.400" fontWeight="medium">
            {order.orderStatus.toUpperCase()}
          </Text>
        </Flex>

        <Flex display="none" md={{ display: "flex" }} direction="column" gapY="1">
          <Text textStyle="lg" color="grey">
            Shipping address
          </Text>
          <Text textStyle="xl" color="black" fontWeight="medium">
            {order.shippingAddress}
          </Text>
        </Flex>
      </Flex>
      <Separator />
    </>
  );
}
