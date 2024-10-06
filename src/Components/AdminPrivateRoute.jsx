import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  // If the user is an admin, render the Outlet, otherwise navigate to login
  return user && user.isAdmin === true ? (
    <Outlet />
  ) : (
    <Navigate to="/login" /> // Correctly using Navigate here
  );
};

export default AdminPrivateRoute;
