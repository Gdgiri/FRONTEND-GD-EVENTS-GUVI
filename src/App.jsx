import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Navbar from "./Components/Navbar";
import AuthenticatedRoute from "./Components/AuthenticateRoute";
import UserDashboard from "./Pages/UserDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import Profile from "./Pages/Profile";
import AdminUpload from "./Pages/AdminUpload";
import DisplayAdmin from "./Pages/DisplayAdmin";
import EditEvent from "./Pages/EditEvent";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
          <Route
            path="/user"
            element={<AuthenticatedRoute element={<UserDashboard />} />}
          />
          <Route
            path="/admin"
            element={
              <AuthenticatedRoute
                element={<AdminDashboard />}
                adminRoute={true}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createevent" element={<AdminUpload />} />
          <Route path="/display" element={<DisplayAdmin />} />
          <Route path="/edit/:id" element={<EditEvent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
