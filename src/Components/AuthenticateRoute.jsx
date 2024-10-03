import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthenticatedRoute = ({ element, adminRoute = false }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user); // Get user details

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  //   // If this is an admin route, check if the user is an admin
    if (adminRoute && user?.isAdmin) {
      return <Navigate to="/not-authorized" />;
    }

  // Redirect to /admin if the user is an admin
  if (user?.isAdmin) {
    return <Navigate to="/admin" />;
  }

  // Redirect to /user if the user is a regular user
  if (user?.isUser) {
    return <Navigate to="/user" />;
  }

  // Render the component if all conditions are met
  return element;
};

export default AuthenticatedRoute;
