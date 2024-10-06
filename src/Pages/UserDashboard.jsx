// src/Pages/UserDashboard.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import {
  FaUtensils,
  FaCamera,
  FaMusic,
  FaTruck,
  FaGifts,
  FaPaintBrush,
} from "react-icons/fa"; // Import FontAwesome icons
import { useNavigate } from "react-router-dom";

const vendorCategories = [
  { name: "Catering", icon: <FaUtensils size={50} /> }, // Catering icon
  { name: "Photography", icon: <FaCamera size={50} /> }, // Photography icon
  { name: "Entertainment", icon: <FaMusic size={50} /> }, // Entertainment icon
  { name: "Decoration", icon: <FaPaintBrush size={50} /> }, // Decoration icon
  { name: "Transport", icon: <FaTruck size={50} /> }, // Transport icon
  { name: "Beautician", icon: <FaGifts size={50} /> }, // Beautician icon
];

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    setTimeout(() => {
      navigate("/wedform");
    }, 1000);
  };
  return (
    <div className="container mt-4">
      <p className="text-center text-muted mb-4" style={{ fontSize: "1.2rem" }}>
        We have services to book your event and enjoy the best experience!
      </p>
      <div className="row">
        {vendorCategories.map((vendor, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-sm border-light text-center">
              <div className="card-body">
                {/* Icon */}
                <div className="mb-5">{vendor.icon}</div>
                <h5 className="card-title">{vendor.name}</h5>
              </div>
            </div>
          </div>
        ))}
        <div className="text-center mt-5">
          <button className="btn btn-primary" onClick={handleClick}>
            Book Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
