import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
    transport: false, // Include this line if transport is needed
  });
  const [totalAmount, setTotalAmount] = useState(0);

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

    setSelectedVendors({
      ...selectedVendors,
      [vendor]: isSelected,
    });

    // Update total amount based on selection
    if (isSelected) {
      setTotalAmount((prevTotal) => prevTotal + vendorAmount);
    } else {
      setTotalAmount((prevTotal) => prevTotal - vendorAmount);
    }
  };

  const handleBooking = () => {
    // Navigate to the EventStylistList if the user has selected a decoration (event stylist)
    navigate("/eventstylist", { state: { totalAmount } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!eventDetails) {
    return <div>No event details found.</div>;
  }

  return (
    <div className="container">
      <h2>Vendor Details</h2>
      <div className="card mb-6 shadow-sm">
        <div className="row m-2 bg-light">
          <div className="col-md-5">
            <img
              src={eventDetails.venueImg}
              className="card-img img-fluid"
              alt={eventDetails.venueName}
              style={{ height: "200px", width: "200px" }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body d-flex flex-column justify-content-center">
              <h5 className="card-title">
                Venue Name: {eventDetails.venueName}
              </h5>
              <h5 className="card-text">
                Venue Place: {eventDetails.venuePlace}
              </h5>
              <h5 className="card-text">Price: ₹{eventDetails.venueAmount}</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Selection */}
      <h3>Select Vendors</h3>
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

      {/* Display Total Amount */}
      <div className="mt-4">
        <h4>Total Amount: ₹{totalAmount}</h4>
      </div>

      {/* Book Button */}
      <button className="btn btn-success mt-3" onClick={handleBooking}>
        Book Now
      </button>
    </div>
  );
};

export default VendorDetails;
