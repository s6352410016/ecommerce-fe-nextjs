import { Order } from "@/libs/schemas";
import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

interface ProductOrderedProps {
  order: Order;
}

export function ProductOrdered({ order }: ProductOrderedProps) {
  return (
    <Flex alignItems="center" justify="space-between" w="sm">
      <Flex gapX="3" alignItems="center">
        <div className="w-[50px] h-[50px] relative overflow-hidden rounded">
          <Image
            src={`${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}/${process.env.NEXT_PUBLIC_AWS_BUCKET_FOLDER}/${order.images[0].imageUrl}`}
            alt={order.name}
            fill
            sizes=""
            priority
          />
        </div>
        <Text>{order.name}</Text>
      </Flex>
      <Text>
        {order.price.toLocaleString("th-TH", {
          style: "currency",
          currency: "THB",
        })}
      </Text>
    </Flex>
  );
}
