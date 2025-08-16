import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import "./CheckoutForm.css";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import toast from "react-hot-toast";

const CheckoutForm = ({ totalPrice, closeModal, orderData, user,fetchProduct }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  // console.log(user);
  useEffect(() => {
    const getClientSecret = async () => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-payment-intent`,
        { quantity: orderData?.quantity, medicineId: orderData?.medicineId }
      );
      setClientSecret(data?.clientSecret);
    };
    getClientSecret();
  }, [orderData]);

  const handleSubmit = async (event) => {
    setProcessing(true);
    // Block native form submission.
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError(null);
    }
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });
    if (result?.error) {
      setCardError(result);
      return;
    }
    if (result?.paymentIntent?.status === "succeeded") {
      // save order data in db
      orderData.transactionId = result?.paymentIntent?.id;
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/order`,
          orderData
        );
        if (data?.insertedId) {
          toast.success("Order Placed Successfully!");
        }
        const { data: result } = await axios.patch(
          `${import.meta.env.VITE_API_URL}/update-quantity/${
            orderData.medicineId
          }`,
          { quantityToUpdate: orderData?.quantity, status: "decrease" }
        );
        fetchProduct()
        console.log(result);
      } catch (err) {
        console.log(err);
      } finally {
        setProcessing(false);
        setCardError(null);
        closeModal();
      }
      //update product quantity in db from product collection
    }
    // console.log(result?.error.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {cardError && <p className="text-red-600 mb-2">{cardError}</p>}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-800 cursor-pointer"
          type="submit"
          disabled={!stripe || processing}
        >
          {processing ? (
            <ClipLoader className="mt-1" size={21} />
          ) : (
            `Pay ${totalPrice}$`
          )}
        </button>
        <button
          onClick={closeModal}
          className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 cursor-pointer"
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
