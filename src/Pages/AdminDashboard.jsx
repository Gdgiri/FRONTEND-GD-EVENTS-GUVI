// src/Pages/AdminDashboard.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useBooking } from "../Context/BookingContext"; // Import useBooking to access bookings
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { bookings } = useBooking(); // Get the bookings array from the context

  const handleAddEvent = () => {
    setTimeout(() => {
      navigate("/createevent");
    }, 1000);
  };

  return (
    <div className="container mt-5 pt-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <p className="text-center text-muted">
        Welcome to the Admin Dashboard. Here you can manage your bookings and
        events.
      </p>
      <p className="text-center text-muted">
        Use the "Add Event" button to create new events and keep track of all
        bookings in one place.
      </p>

      <div className="row justify-content-center mb-4">
        {/* Card for Number of Bookings */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm border-light">
            <div className="card-body">
              <h4 className="card-title">Total Bookings</h4>
              <p
                className="card-text"
                style={{ fontSize: "2rem", fontWeight: "bold" }}
              >
                {bookings.length}
              </p>
              <p className="text-muted">
                The total number of bookings currently in the system.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        {/* Button to add new events */}
        <button className="btn btn-primary" onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
