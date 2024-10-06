import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AdminPrivateRoute = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  return user && user.isAdmin === true ? <Outlet /> : (navigate = "/login");
};

export default AdminPrivateRoute;
