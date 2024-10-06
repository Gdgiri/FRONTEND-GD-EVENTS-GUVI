// src/Pages/About.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const About = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="text-center mb-4">About Us</h1>
          <p className="lead text-center text-muted">
            We are dedicated to making your events unforgettable, offering a
            wide range of services to meet your every need. Whether it's
            catering, photography, decoration, or entertainment, we ensure every
            detail is handled with care and precision.
          </p>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6 mb-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtD-GUCibw7GJBIHXS9uOMgXnFOQ6FgjizMQ&s"
            alt="Event Planning"
            className="img-fluid rounded shadow"
            style={{ height: "300px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h3>Our Mission</h3>
          <p>
            Our mission is to bring your vision to life, whether it's a small
            intimate gathering or a grand celebration. We work closely with you
            to understand your preferences and deliver an experience that
            exceeds expectations.
          </p>
          <p>
            With years of expertise in the event management industry, our team
            of professionals is here to handle every aspect of your event, from
            planning to execution, ensuring a seamless experience for you and
            your guests.
          </p>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6 order-md-2 mb-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkaKMVc--0L_W0GHz2DLUxQ5MbSjTx6FjcWQ&s"
            alt="Happy Clients"
            className="img-fluid rounded shadow"
            style={{ height: "300px", width: "450px" }}
          />
        </div>
        <div className="col-md-6 order-md-1">
          <h3>Why Choose Us?</h3>
          <ul>
            <li>Personalized service tailored to your unique event.</li>
            <li>Experienced professionals with a passion for excellence.</li>
            <li>
              Comprehensive event services, from catering to entertainment.
            </li>
            <li>High-quality resources to ensure your event stands out.</li>
            <li>Timely execution with attention to every detail.</li>
          </ul>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        <div className="col-lg-8">
          <h2 className="text-center mb-4">
            Let Us Make Your Event Extraordinary
          </h2>
          <p className="text-center">
            Ready to plan your next big event? Whether it's a wedding, corporate
            event, or a family celebration, we're here to turn your ideas into
            reality. Get in touch with us to start planning!
          </p>
          <div className="text-center">
            <a href="mailto:gdevent24@gmail.com" className="btn btn-primary">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
