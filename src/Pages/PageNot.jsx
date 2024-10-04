import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const PageNot = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="display-1 text-primary">404</h1>
      <p className="fs-1">😕</p>
      <h2 className="text-secondary mb-4">Oops! Page Not Found</h2>
      <p className="text-muted mb-4">
        It seems like the page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Back to Home
      </Link>
    </div>
  );
};

export default PageNot;
