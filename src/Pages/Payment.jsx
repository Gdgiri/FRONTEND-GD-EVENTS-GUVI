import React from "react";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const grandTotal = location.state?.grandTotal || 0;
  return (
    <div>
      <h2>Payment</h2>
      <h1>Total Amount to Pay: ₹{grandTotal}</h1>
      {/* Proceed with payment processing logic */}
    </div>
  );
};

export default Payment;
