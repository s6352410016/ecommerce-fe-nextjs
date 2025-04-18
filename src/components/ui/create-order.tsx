"use client";

import { useOrderAction } from "@/hooks/use-order-action";
import {
  Breadcrumb,
  Button,
  Field,
  Fieldset,
  Flex,
  Heading,
  Input,
  Separator,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { LiaSlashSolid } from "react-icons/lia";
import { ProductOrdered } from "./product-orderd";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckOutFields } from "@/validations/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "@/providers/user-provider";
import { useModalActionsContext } from "@/providers/modal-actions-provider";
import { loadStripe } from "@stripe/stripe-js";
import { StripeCheckOut } from "./stripe-checkout";
import { createOrder } from "@/actions/create-order";
import { setCookie } from "@/actions/cookies";
import { ShippingInfo } from "@/libs/schemas";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_TEST_SECRET_KEY as string
);

export function CreateOrder() {
  const { user } = useUserContext();
  const { setOpenAuthModal } = useModalActionsContext();

  const { orders, deleteOrders } = useOrderAction();

  const [shippignInfo, setShippingInfo] = useState<ShippingInfo | null>(null);

  const totalPrice = useMemo(() => {
    return orders.reduce(
      (prevValue, orderItem) =>
        orderItem.quantity * orderItem.price + prevValue,
      0
    );
  }, [orders]);

  type CheckOutSchema = z.infer<typeof CheckOutFields>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckOutSchema>({
    resolver: zodResolver(CheckOutFields),
    shouldFocusError: false,
  });

  const handleCheckOut = async (fields: z.infer<typeof CheckOutFields>) => {
    const { shippingAddress, phone, email } = fields;
    if (!user) {
      setOpenAuthModal(true);
      return;
    }

    setShippingInfo({
      userId: user.id,
      shippingAddress,
      phone,
      email,
    });
    setCookie();
  };

  const fetchClientSecret = useCallback(async () => {
    if (shippignInfo) {
      const clientSecret = await createOrder(orders, shippignInfo);
      reset({
        shippingAddress: "",
        phone: "",
        email: "",
      });
      deleteOrders();
      return clientSecret;
    }
    return "";
  }, [orders, shippignInfo]);

  return (
    <>
      {shippignInfo && Object.keys(shippignInfo).length !== 0 ? (
        <StripeCheckOut
          stripePromise={stripePromise}
          fetchClientSecret={fetchClientSecret}
          setShippingInfo={setShippingInfo}
        />
      ) : (
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
                <Breadcrumb.CurrentLink>Checkout</Breadcrumb.CurrentLink>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>

          <Heading size="3xl" mt="10">
            Billing Details
          </Heading>
          <Flex justify="space-between" mt="10">
            <form onSubmit={handleSubmit(handleCheckOut)} className="w-full">
              <Fieldset.Root size="lg" maxW="md">
                <Fieldset.Content>
                  <Field.Root invalid={!!errors.shippingAddress}>
                    <Field.Label>
                      Shipping address: <Field.RequiredIndicator />
                    </Field.Label>
                    <Input {...register("shippingAddress")} />
                    <Field.ErrorText>
                      {errors.shippingAddress?.message}
                    </Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.phone}>
                    <Field.Label>
                      Phone: <Field.RequiredIndicator />
                    </Field.Label>
                    <Input {...register("phone")} />
                    <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.email}>
                    <Field.Label>
                      Email: <Field.RequiredIndicator />
                    </Field.Label>
                    <Input {...register("email")} />
                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                  </Field.Root>
                </Fieldset.Content>
                <Button
                  variant="solid"
                  w="1/3"
                  type="submit"
                >
                  Checkout order
                </Button>
              </Fieldset.Root>
            </form>

            <Flex direction="column" gapY="4">
              {orders.length !== 0 &&
                orders.map((order) => (
                  <ProductOrdered order={order} key={order.id} />
                ))}
              <Flex alignItems="center" justify="space-between" mt="4">
                <Text>Subtotal:</Text>
                <Text>
                  {totalPrice.toLocaleString("th-TH", {
                    style: "currency",
                    currency: "THB",
                  })}
                </Text>
              </Flex>
              <Separator />
              <Flex alignItems="center" justify="space-between">
                <Text>Shipping:</Text>
                <Text>Free</Text>
              </Flex>
              <Separator />
            </Flex>
          </Flex>
        </div>
      )}
    </>
  );
}
