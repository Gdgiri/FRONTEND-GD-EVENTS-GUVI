import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm"; // We'll create this component

// Load the Stripe instance
const stripePromise = loadStripe(
  "pk_test_51Q2AnKL5RXJuh51L7c4oKGMncMjhSWYKDLjuVM2VBM2kei6IuPSP1bxOgmTxSGXNbPKI7aK4mbK3QaqhNgGeRHOm003WEil2tS"
);

const StripeProduct = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeProduct;
