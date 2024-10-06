import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const WeddingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    groomName: "",
    brideName: "",
    marriageDate: "",
    budget: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-gd-events-guvi.onrender.com/api/event/creatwed",
        formData
      );
      //console.log("Form submitted successfully:", response.data.result);

      // Assuming the response contains the userId
      const userId = response.data.result._id; // Ensure userId exists in the response
      //console.log(userId);

      // Reset the form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        groomName: "",
        brideName: "",
        marriageDate: "",
        budget: "",
      });

      // Navigate to /vendor/:userId
      navigate(`/displayuser`, {
        state: {
          budget: formData.budget,
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally handle the error (e.g., show an error message)
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Wedding Booking Form</h2>
      <div className="d-flex justify-content-center">
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: "500px", width: "100%" }}
        >
          {/* Form Fields */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="groomName" className="form-label">
              Groom's Name
            </label>
            <input
              type="text"
              className="form-control"
              id="groomName"
              name="groomName"
              value={formData.groomName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="brideName" className="form-label">
              Bride's Name
            </label>
            <input
              type="text"
              className="form-control"
              id="brideName"
              name="brideName"
              value={formData.brideName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="marriageDate" className="form-label">
              Marriage Date
            </label>
            <input
              type="date"
              className="form-control"
              id="marriageDate"
              name="marriageDate"
              value={formData.marriageDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="budget" className="form-label">
              Budget
            </label>
            <input
              type="number"
              className="form-control"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              min="0" // Set minimum budget to 0
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WeddingForm;
