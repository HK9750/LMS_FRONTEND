import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateOrderMutation } from "@/redux/features/order/orderapi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "../ui/button";

type Props = {
  data: any;
  setOpen: (open: boolean) => void;
};

const CheckoutForm = ({ data, setOpen }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [message, setMessage] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [createOrder, { data: orderData, error: orderError }] =
    useCreateOrderMutation();
  const [loadUser, setLoadUser] = React.useState<boolean>(false);

  // Conditionally load the user
  useLoadUserQuery(undefined, { skip: !loadUser });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.log("Stripe or elements not loaded");
      return;
    }
    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      console.log(error);
      setMessage(error.message || "An unknown error occurred");
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("");
      createOrder({
        courseId: data.course._id,
        paymentInfo: paymentIntent,
      });
    }
  };

  useEffect(() => {
    if (orderData) {
      setOpen(false);
      setLoadUser(true);
      router.push(`/course-access/${data?.course?._id}`);
    } else if (orderError) {
      console.error(orderError);
      setMessage("Failed to create order. Please try again.");
    }
  }, [orderData, orderError, router, data, setOpen]);

  return (
    <form className="bg-background" onSubmit={handleSubmit}>
      <LinkAuthenticationElement />
      <PaymentElement />

      <div className="mt-6 flex justify-center">
        <Button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="w-[30%] bg-primary text-primary-foreground py-3 px-4 rounded-lg"
        >
          <span id="button-text">{isLoading ? "Loading" : "Pay now"}</span>
        </Button>
      </div>

      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className="mt-4 text-sm text-destructive">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
