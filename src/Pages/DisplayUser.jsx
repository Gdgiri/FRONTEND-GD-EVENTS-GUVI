import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";

const DisplayUser = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const { budget } = location.state || {}; // Retrieve the total budget from location.state
  const [remainingBudget, setRemainingBudget] = useState(budget); // Set initial remaining budget

  console.log("Total Budget:", budget);
  console.log("Remaining Budget:", remainingBudget);

  // Fetching event data when the component mounts
  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      const response = await axios.get(
        "https://backend-gd-events-guvi.onrender.com/api/event/getallevent"
      );
      setData(response.data.result); // Assuming response has a result field
    } catch (error) {
      console.error("Error fetching event data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (venueAmount, eventId, venueName, venuePlace) => {
    const newRemainingBudget = remainingBudget - venueAmount;

    // Check if the remaining budget allows for this booking
    if (newRemainingBudget >= 0) {
      setRemainingBudget(newRemainingBudget);

      // Navigate to vendor-details and pass the total and remaining budgets
      navigate(`/vendor-details/${eventId}`, {
        state: {
          totalBudget: budget, // Pass the total budget
          remainingBudget: newRemainingBudget, // Pass the updated remaining budget
          venueName: venueName, // Pass the venue name
          venuePlace: venuePlace, // Pass the venue place
          venueAmount: venueAmount, // Pass the venue amount
        },
      });
    } else {
      alert("You don't have enough budget to book this venue.");
    }
  };

  // Filtering event data based on search input
  const filteredData = data.filter((event) => {
    const venueNameMatch = event.venueName
      .toLowerCase()
      .includes(search.toLowerCase());
    const venuePlaceMatch = event.venuePlace
      .toLowerCase()
      .includes(search.toLowerCase());
    const venueAmountMatch =
      event.venueAmount && event.venueAmount.toString().includes(search);
    return venueNameMatch || venuePlaceMatch || venueAmountMatch;
  });

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {/* Budget Display: Total on the left, Remaining on the right */}
      <div className="d-flex justify-content-between my-4">
        <h3>Total Budget: ₹{budget}</h3>
        <h3>Remaining Budget: ₹{remainingBudget}</h3>
      </div>

      {/* Search Input */}
      <div className="d-flex justify-content-between mb-3 m-5">
        <div className="input-group ms-auto" style={{ width: "250px" }}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
          />
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      {/* Displaying filtered events */}
      <div className="row">
        {filteredData.length > 0 ? (
          filteredData.map((event, index) => (
            <div className="col-md-6" key={index}>
              <div className="card mb-6 shadow-sm">
                <div className="row m-2 bg-light">
                  <div className="col-md-5">
                    <img
                      src={event.venueImg}
                      className="card-img img-fluid"
                      alt={event.venueName}
                      style={{ height: "200px", width: "200px" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body d-flex flex-column justify-content-center">
                      <h5 className="card-title">
                        Venue Name: {event.venueName}
                      </h5>
                      <br />
                      <h5 className="card-text">
                        Venue Place: {event.venuePlace}
                      </h5>
                      <br />
                      <h5 className="card-text">Price: ₹{event.venueAmount}</h5>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <div className="text-center">
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleBooking(
                          event.venueAmount,
                          event._id,
                          event.venueName,
                          event.venuePlace
                        )
                      }
                    >
                      <span className="text-white">Book</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-md-12">
            <p>No events found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayUser;
