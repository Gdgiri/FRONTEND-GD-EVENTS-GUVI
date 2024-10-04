import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "./CheckoutForm.css"; // Import CSS for styling

const CheckoutForm = () => {
  const location = useLocation();
  const totalAmount = location.state?.grandTotal; // Get total amount from state
  const navigate = useNavigate(); // To redirect after success

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // For showing a loading spinner

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true); // Start loading

    const cardElement = elements.getElement(CardElement);

    try {
      // Create a payment method using card details
      const { error: cardError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

      if (cardError) {
        setError(cardError.message);
        setLoading(false); // Stop loading
        return;
      }

      // Send the payment method to your server
      const response = await fetch("http://localhost:5000/api/event/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: totalAmount * 100, // Convert amount to paise
        }),
      });

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      setSuccess(true);
      setError(null);

      // Redirect to /data after successful payment

      setTimeout(() => {
        navigate("/booked");
      }, 1500);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false); // Stop loading
  };

  return (
    <div className="checkout-form-container">
      <form onSubmit={handleSubmit} className="checkout-form">
        {error && (
          <div
            className="error-message alert-danger "
            style={{
              padding: "20px",
              fontSize: "18px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            className="success-message alert-success "
            style={{
              padding: "20px",
              fontSize: "18px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            Payment Successful!
          </div>
        )}

        <h2>Payment</h2>
        <CardElement
          options={{
            style: {
              base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSize: "16px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
              },
            },
          }}
        />
        <br />
        <button
          type="submit"
          disabled={!stripe || loading}
          className="pay-button"
        >
          {loading ? "Processing..." : `Pay Now - ₹${totalAmount}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
