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
import DisplayUser from "./Pages/DisplayUser";
import VendorDetails from "./Pages/VendorDetails";
import CreateEventStylist from "./Pages/CreateEventStylist";
import EventStylistList from "./Pages/EventStylistList";
import AdminEventStylistList from "./Pages/AdminEventStylist";
import AdminEditStylist from "./Pages/AdminEditStylist";
import Payment from "./Pages/Payment";

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

          <Route path="/displayuser" element={<DisplayUser />} />
          <Route path="/vendor-details/:id" element={<VendorDetails />} />

          <Route path="/createstylist" element={<CreateEventStylist />} />
          <Route path="/eventstylist" element={<EventStylistList />} />
          <Route
            path="/admineventstylist"
            element={<AdminEventStylistList />}
          />
          <Route path="/admineditstylist/:id" element={<AdminEditStylist />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
