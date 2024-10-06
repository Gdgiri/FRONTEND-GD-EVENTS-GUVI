import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation to get the passed state

const EventStylistList = () => {
  const location = useLocation();
  const [eventStylists, setEventStylists] = useState([]);
  const [selectedServices, setSelectedServices] = useState({});
  const [totalStyleAmount, setTotalStyleAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(
    location.state?.totalAmount || 0
  );
  const { totalBudget, remainingBudget, venueName, venuePlace, venueAmount } =
    location.state || {};
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userPreference, setUserPreference] = useState("");
  const navigate = useNavigate();
  console.log("event", totalBudget);
  console.log("event remain:", remainingBudget);
  console.log("name:", venueName);
  console.log("name:", venuePlace);
  console.log("name:", venueAmount);

  useEffect(() => {
    const fetchEventStylists = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/event/getallstylist"
        );
        setEventStylists(response.data.result);
      } catch (error) {
        setErrorMessage("Failed to fetch event stylists. Please try again.");
        console.error(error);
      }
    };

    fetchEventStylists();
  }, []);

  const handleServiceChange = (stylistId, serviceLabel, servicePrice) => {
    setSelectedServices((prevServices) => {
      const updatedServices = { ...prevServices };
      const key = `${stylistId}-${serviceLabel}`;

      if (updatedServices[key]) {
        delete updatedServices[key];
        setTotalStyleAmount((prev) => prev - servicePrice);
      } else {
        updatedServices[key] = { label: serviceLabel, price: servicePrice };
        setTotalStyleAmount((prev) => prev + servicePrice);
      }

      return updatedServices;
    });
  };

  const handleSubmit = async () => {
    const selectedItems = Object.values(selectedServices);
    if (selectedItems.length === 0) {
      setErrorMessage("Please select at least one service.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const grandTotal = totalAmount + totalStyleAmount;
    const payload = {
      totalStyleAmount,
      selectedItems,
      userPreference,
      
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/event/createstylistselection",
        payload
      );
      navigate(`/payment`, {
        state: {
          grandTotal,
          totalStyleAmount,
          venueName,
          venuePlace,
          venueAmount,
          totalAmount,
          selectedItems,
          userPreference,
        },
      });
    } catch (error) {
      console.error("Error saving selection:", error);
      setErrorMessage("Failed to save selection. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    const grandTotal = totalAmount;
    navigate("/payment", {
      state: { grandTotal, totalAmount },
    });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between my-4">
        <h3>Total Budget: ₹{totalBudget}</h3>
        <h3>Remaining Budget: ₹{remainingBudget - totalStyleAmount}</h3>{" "}
        {/* Update remaining budget display */}
      </div>
      <h2 className="text-center mb-4">Select Your Event Stylist</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {eventStylists.length === 0 ? (
        <p className="text-center">No event stylists available.</p>
      ) : (
        <div className="row">
          {eventStylists.map((stylist) => (
            <div className="col-lg-4 col-md-6 mb-4" key={stylist._id}>
              <div className="card shadow-sm h-100">
                <img
                  src={stylist.imgUrl}
                  alt={stylist.name}
                  className="card-img-top"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">{stylist.name}</h5>
                  <ul className="list-group list-group-flush">
                    {stylist.services.map((service, index) => (
                      <li key={index} className="list-group-item">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            className="form-check-input me-2"
                            onChange={() =>
                              handleServiceChange(
                                stylist._id,
                                service.label,
                                service.price
                              )
                            }
                          />
                          {service.label}: ₹{service.price}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 ">
        <h4>Vendor Total Amount: ₹{location.state?.totalAmount || 0}</h4>
        <h4>Selected Style Services Total: ₹{totalStyleAmount}</h4>
        <h4>Grand Total: ₹{totalAmount + totalStyleAmount}</h4>
      </div>

      {/* User Preferences */}
      <div className="form-group mt-4">
        <label htmlFor="userPreference">Your Preferences:</label>
        <textarea
          id="userPreference"
          className="form-control"
          rows="4"
          value={userPreference}
          onChange={(e) => setUserPreference(e.target.value)}
          placeholder="Enter any specific preferences for event styling..."
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-primary me-3"
          onClick={handleSubmit}
          disabled={totalStyleAmount === 0 || isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Proceed to Payment"}
        </button>
        <button className="btn btn-secondary" onClick={handleSkip}>
          Skip and Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default EventStylistList;
