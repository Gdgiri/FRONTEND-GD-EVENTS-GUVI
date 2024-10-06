import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);
  return user && user.isAdmin === true ? <Outlet /> : (Navigate = "/login");
};

export default AdminPrivateRoute;
