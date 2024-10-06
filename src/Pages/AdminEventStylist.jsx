import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminEventStylistList = () => {
  const [eventStylists, setEventStylists] = useState([]); // Initialize as an empty array
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchEventStylists = async () => {
      try {
        const response = await axios.get(
          "https://backend-gd-events-guvi.onrender.com/api/event/getallstylist"
        );

        // Ensure response.data is an array
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

  const handleEdit = (stylistId) => {
    navigate(`/admineditstylist/${stylistId}`); // Navigate to the edit page
  };

  const handleDelete = async (stylistId) => {
    try {
      await axios.delete(
        `https://backend-gd-events-guvi.onrender.com/api/event/deletestylist/${stylistId}`
      );
      setEventStylists(
        eventStylists.filter((stylist) => stylist._id !== stylistId)
      );
      setErrorMessage(""); // Clear any error message
    } catch (error) {
      setErrorMessage("Failed to delete stylist. Please try again.");
      console.error(error);
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
                  className="card-img-top" // Bootstrap class for image
                  style={{ maxHeight: "150px", objectFit: "cover" }} // Set height and fit
                />
                <div className="card-body">
                  <h5 className="card-title">{stylist.name}</h5>
                  <ul className="list-group list-group-flush">
                    {stylist.services.map((service, index) => (
                      <li key={index} className="list-group-item">
                        {service.label}: ₹{service.price}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="btn btn-warning me-2" // Bootstrap button for editing
                    onClick={() => handleEdit(stylist._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(stylist._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEventStylistList;
