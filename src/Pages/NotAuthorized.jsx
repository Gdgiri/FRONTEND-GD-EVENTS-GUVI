import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const NotAuthorized = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="display-4 text-danger mb-3">🚫 Access Denied</h1>
      <p className="fs-3 text-secondary mb-4">
        You are not an authorized person.
      </p>
      <p className="text-muted">
        Please contact the administrator if you think this is a mistake.
      </p>
    </div>
  );
};

export default NotAuthorized;
