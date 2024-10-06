// src/Pages/Booked.js
import React from "react";
import { useBooking } from "../Context/BookingContext"; // Import the useBooking hook
import { useLocation } from "react-router-dom";

const Booked = () => {
  const { bookings, removeBooking } = useBooking(); // Get bookings and removeBooking function from context
  const location = useLocation();
  const { totalBudget, remainingBudget } = location.state || {}; // Optional: get budget info from navigation state

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Your Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-center">No bookings available.</p>
      ) : (
        <div className="row">
          {bookings.map((booking, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
              <div className="card shadow-sm border-light h-100">
                {" "}
                {/* Added h-100 for full height */}
                <div className="card-body p-4">
                  {" "}
                  {/* Increased padding */}
                  <h4 className="card-title">Venue: {booking.venueName}</h4>
                  <h5 className="card-subtitle mb-2 text-muted">
                    Place: {booking.venuePlace}
                  </h5>
                  <h6 className="card-text">
                    <strong>Amount: ₹{booking.venueAmount}</strong>
                  </h6>
                  <div className="text-center">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeBooking(index)} // Call removeBooking on click
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Booked;
