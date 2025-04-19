import { OrderRes } from "@/libs/schemas";
import { Breadcrumb } from "@chakra-ui/react";
import Link from "next/link";
import { LiaSlashSolid } from "react-icons/lia";
import { OrderItem } from "./order-item";

interface OrdersProps {
  orders: Omit<OrderRes, "user">[];
}

export default function Orders({ orders }: OrdersProps) {
  return (
    <>
      <div className="my-10">
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
              <Breadcrumb.CurrentLink>Order</Breadcrumb.CurrentLink>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </div>

      {orders.map((order) => {
        return order.orders.map((orderItem) => (
          <OrderItem
            order={order}
            orderDetails={orderItem}
            key={orderItem.id}
          />
        ));
      })}
    </>
  );
}
