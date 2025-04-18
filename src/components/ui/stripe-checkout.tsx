import { deleteCookie } from "@/actions/cookies";
import { ShippingInfo } from "@/libs/schemas";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { Stripe } from "@stripe/stripe-js";
import { Dispatch, SetStateAction } from "react";

interface StripeCheckOutProps {
  stripePromise: Promise<Stripe | null>;
  fetchClientSecret: () => Promise<string>;
  setShippingInfo: Dispatch<SetStateAction<ShippingInfo | null>>,
}

export function StripeCheckOut({
  stripePromise,
  fetchClientSecret,
  setShippingInfo,
}: StripeCheckOutProps) {
  return (
    <>
      <div className="mt-10" />
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          fetchClientSecret,
          onComplete() {
            setShippingInfo(null);
            deleteCookie();
          },
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </>
  );
}
