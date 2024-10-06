import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const VendorDetails = () => {
  const { id } = useParams(); // Get event ID from the URL
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVendors, setSelectedVendors] = useState({
    catering: false,
    photographer: false,
    entertainer: false,
    beautician: false,
    transport: false,
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const location = useLocation();
  const { totalBudget, remainingBudget } = location.state || {};
  console.log("totalAmount", totalAmount);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/event/getevent/${id}` // Adjust your API endpoint
      );
      setEventDetails(response.data.result);
      setTotalAmount(response.data.result.venueAmount || 0); // Initialize total with venue amount
    } catch (error) {
      console.error("Error fetching event details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVendorSelection = (vendor) => {
    const isSelected = !selectedVendors[vendor];
    const vendorAmount = eventDetails[`${vendor}Amount`] || 0;

    setSelectedVendors((prev) => ({
      ...prev,
      [vendor]: isSelected,
    }));

    // Update total amount based on selection
    if (isSelected) {
      setTotalAmount((prevTotal) => prevTotal + vendorAmount);
    } else {
      setTotalAmount((prevTotal) => prevTotal - vendorAmount);
    }
  };

  const handleBooking = () => {
    const newRemainingBudget =
      remainingBudget - totalAmount + eventDetails.venueAmount; // Calculate the new remaining budget

    // Navigate to the EventStylistList passing the total and remaining budgets
    navigate("/eventstylist", {
      state: {
        totalAmount,
        totalBudget, // Pass the total budget
        remainingBudget: newRemainingBudget, // Pass the updated remaining budget
        venueName: eventDetails.venueName, // Pass the venue name
        venuePlace: eventDetails.venuePlace, // Pass the venue place
        venueAmount: eventDetails.venueAmount, // Pass the venue amount
        vendorImg: eventDetails.vendorImg,
      },
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!eventDetails) {
    return <div>No event details found.</div>;
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between my-4">
        <h3>Total Budget: ₹{totalBudget}</h3>
        <h3>
          Remaining Budget: ₹
          {remainingBudget - totalAmount + eventDetails.venueAmount}
        </h3>{" "}
        {/* Update remaining budget display */}
      </div>
      <h2 className="text-center mb-4">Vendor Details</h2>
      <div className="card mb-4 shadow-sm">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={eventDetails.venueImg}
              className="img-fluid rounded-start"
              alt={eventDetails.venueName}
              style={{ objectFit: "cover", height: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h4 className="card-title">{eventDetails.venueName}</h4>
              <p className="card-text">
                <strong>Place: </strong> {eventDetails.venuePlace}
              </p>
              <p className="card-text">
                <strong>Price: </strong> ₹{eventDetails.venueAmount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Selection */}
      <h3 className="mb-3">Select Vendors</h3>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="catering"
              checked={selectedVendors.catering}
              onChange={() => handleVendorSelection("catering")}
            />
            <label className="form-check-label" htmlFor="catering">
              Catering - ₹{eventDetails.cateringAmount || 0}
            </label>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="photographer"
              checked={selectedVendors.photographer}
              onChange={() => handleVendorSelection("photographer")}
            />
            <label className="form-check-label" htmlFor="photographer">
              Photographer - ₹{eventDetails.photographerAmount || 0}
            </label>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="entertainer"
              checked={selectedVendors.entertainer}
              onChange={() => handleVendorSelection("entertainer")}
            />
            <label className="form-check-label" htmlFor="entertainer">
              Entertainer - ₹{eventDetails.entertainerAmount || 0}
            </label>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="beautician"
              checked={selectedVendors.beautician}
              onChange={() => handleVendorSelection("beautician")}
            />
            <label className="form-check-label" htmlFor="beautician">
              Beautician - ₹{eventDetails.beauticianAmount || 0}
            </label>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="transport"
              checked={selectedVendors.transport}
              onChange={() => handleVendorSelection("transport")}
            />
            <label className="form-check-label" htmlFor="transport">
              Transport - ₹{eventDetails.transportAmount || 0}
            </label>
          </div>
        </div>
      </div>

      {/* Display Total Amount */}
      <div className="mt-4">
        <h4 className="text-center">Total Amount: ₹{totalAmount}</h4>
      </div>

      {/* Book Button */}
      <div className="text-center">
        <button className="btn btn-success mt-4" onClick={handleBooking}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default VendorDetails;
