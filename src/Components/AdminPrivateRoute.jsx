import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  const { auth } = useSelector((state) => state.auth);
 

  // If the user is an admin, render the Outlet, otherwise navigate to login
  return auth && auth.isAdmin === true ? (
    <Outlet />
  ) : (
    <Navigate to="/login" /> // Correctly using Navigate here
  );
};

export default AdminPrivateRoute;
