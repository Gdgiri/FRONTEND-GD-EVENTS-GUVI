// src/Pages/Services.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const vendorCategories = [
  { name: "Catering", imgSrc: "path/to/catering.jpg" }, // Update with actual image paths
  { name: "Photography", imgSrc: "path/to/photography.jpg" },
  { name: "Entertainment", imgSrc: "path/to/entertainer.jpg" },
  { name: "Decoration", imgSrc: "path/to/decoration.jpg" },
  { name: "Transport", imgSrc: "path/to/transport.jpg" },
  { name: "Beautician", imgSrc: "path/to/beautician.jpg" },
];

const Services = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-2">Our Services</h1>
      <p className="text-center text-muted mb-4" style={{ fontSize: "1.2rem" }}>
        We offer a wide range of services to make your event unforgettable. Book
        now and enjoy a hassle-free experience!
      </p>
      <div className="row">
        {vendorCategories.map((vendor, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-sm border-light">
              <img
                src={vendor.imgSrc}
                className="card-img-top"
                alt={vendor.name}
                style={{ height: "200px", objectFit: "cover" }} // Image styling
              />
              <div className="card-body">
                <h5 className="card-title text-center">{vendor.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
