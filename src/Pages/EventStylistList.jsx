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
  ); // Initialize with the passed vendor total amount
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventStylists = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/event/getallstylist"
        );
        setEventStylists(response.data.result); // Assuming it's always an array
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
        // Deselect service, remove its price from total
        delete updatedServices[key];
        setTotalStyleAmount((prev) => prev - servicePrice);
      } else {
        // Select service, add its price to total
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

    setIsSubmitting(true); // Start submission
    setErrorMessage(""); // Clear previous errors

    const grandTotal = totalAmount + totalStyleAmount; // Calculate the grand total
    const payload = {
      totalStyleAmount,
      selectedItems,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/event/createstylistselection",
        payload
      );
      console.log(response.data); // Log response to check if the request was successful
      navigate(`/payment`, {
        state: {
          grandTotal, // Pass grand total to payment page
          totalStyleAmount,
          totalAmount, // Pass individual amounts too
          selectedItems,
        },
      });
    } catch (error) {
      console.error("Error saving selection:", error);
      setErrorMessage("Failed to save selection. Please try again.");
    } finally {
      setIsSubmitting(false); // End submission
    }
  };

  const handleSkip = () => {
    const grandTotal = totalAmount; // No stylist services selected, so grand total is just totalAmount
    navigate("/payment", {
      state: { grandTotal, totalAmount }, // Pass totalAmount and grandTotal to payment page
    });
  };

  return (
    <div className="container mt-4">
      <h2>Event Stylists</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {eventStylists.length === 0 ? (
        <p>No event stylists available.</p>
      ) : (
        <div className="row">
          {eventStylists.map((stylist) => (
            <div className="col-md-4 mb-4" key={stylist._id}>
              <div className="card">
                <img
                  src={stylist.imgUrl}
                  alt={stylist.name}
                  className="card-img-top"
                  style={{ maxHeight: "150px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{stylist.name}</h5>
                  <ul className="list-group list-group-flush">
                    {stylist.services.map((service, index) => (
                      <li key={index} className="list-group-item">
                        <label>
                          <input
                            type="checkbox"
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
      {/* Display Vendor Total Amount and Added Style Amount */}
      <h4>Vendor Total Amount: ₹{location.state?.totalAmount || 0}</h4>
      <h4>Selected Style Services Total: ₹{totalStyleAmount}</h4>
      <h4>Grand Total: ₹{totalAmount + totalStyleAmount}</h4>
      <button
        className="btn btn-primary me-2"
        onClick={handleSubmit}
        disabled={totalStyleAmount === 0 || isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Proceed to Dashboard"}
      </button>
      <button className="btn btn-secondary" onClick={handleSkip}>
        Skip and Continue to Payment
      </button>
    </div>
  );
};

export default EventStylistList;
