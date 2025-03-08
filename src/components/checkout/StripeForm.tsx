"use client";
import { useUser } from "@/context/UserContext";
import { grandTotalSelector } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { makePaymentIntent } from "@/services/OrderService";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTotalPrice } from "@/redux/features/checkoutSlice";
import { useRouter } from "next/navigation";

const StripeForm = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const user = useUser();
  const router= useRouter()

  const [transactionId, setTransactionId] = useState("");

  const totalPrice = useAppSelector(useTotalPrice);

  const price = totalPrice ? parseInt((totalPrice * 100).toString()) : 0;



    useEffect(() => {
      const createPaymentIntent = async () => {
        if (price > 0) {
          try {
            const res = await makePaymentIntent({ totalPrice: price });
            console.log(res?.data);
            setClientSecret(res?.data?.clientSecret as string);

          } catch (err) {
            console.error("Error getting client secret:", err);
            setError("Failed to initialize payment. Please try again.");
          }
        }
      };

      createPaymentIntent();
    }, [price, makePaymentIntent]);



  const onSubmit = async (e: any) => {
    e.preventDefault();
    const toastId = toast.loading("Creating...");

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message, { id: toastId });
      console.log("payment error", error);
      setError(error.message || "");
    } else {
      console.log("payment method", paymentMethod);
      toast.success("Payment Successful", { id: toastId });
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.user?.email || "anonymous",
            name: user?.user?.name || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        router.push('/shop')
      }
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl text-center font-semibold text-gray-700">
        Pay Here
      </h1>
      <form onSubmit={onSubmit}>
        <div className="bg-white p-2 rounded-xl my-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 mt-4 "
          >
            Your card details
          </label>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  // color: "#424770",
                  "::placeholder": {
                    color: "##374151 ",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            className="bg-[#316881] py-1 rounded-lg w-20 border-none text-white text-lg mt-6 hover:bg-[#0d4763] "
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
          <p className="text-red-600">{error}</p>
          {transactionId && (
            <p className="text-green-600">
              Your Transaction Id : {transactionId}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default StripeForm;
