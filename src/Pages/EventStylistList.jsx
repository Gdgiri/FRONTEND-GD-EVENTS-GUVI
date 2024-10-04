import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EventStylistList = () => {
  const [eventStylists, setEventStylists] = useState([]);
  const [selectedServices, setSelectedServices] = useState({});
  const [totalStyleAmount, setTotalStyleAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventStylists = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/event/getallstylist"
        );
        if (Array.isArray(response.data.result)) {
          setEventStylists(response.data.result);
        } else {
          setErrorMessage("Unexpected response format. Please try again.");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch event stylists. Please try again.");
        console.error(error);
      }
    };

    fetchEventStylists();
  }, []);

  const handleServiceChange = (stylistId, serviceLabel, servicePrice) => {
    const currentServices = { ...selectedServices };
    const key = `${stylistId}-${serviceLabel}`;

    if (currentServices[key]) {
      delete currentServices[key];
      setTotalStyleAmount((prev) => prev - servicePrice);
    } else {
      currentServices[key] = { label: serviceLabel, price: servicePrice };
      setTotalStyleAmount((prev) => prev + servicePrice);
    }

    setSelectedServices(currentServices);
  };

  const handleSubmit = async () => {
    const selectedItems = Object.values(selectedServices);
    const payload = {
      totalStyleAmount,
      selectedItems,
    };

    console.log("Payload to send:", payload); // Log the payload

    try {
      const response = await axios.post(
        "http://localhost:5000/api/event/createstylistselection",
        payload
      );
      console.log(response.data); // Log response to check if the request was successful
      navigate("/displayuser");
    } catch (error) {
      console.error("Error saving selection:", error);
      setErrorMessage("Failed to save selection. Please try again.");
    }
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
      <h4>Total Amount: ₹{totalStyleAmount}</h4>
      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={totalStyleAmount === 0}
      >
        Proceed to Dashboard
      </button>
    </div>
  );
};

export default EventStylistList;
