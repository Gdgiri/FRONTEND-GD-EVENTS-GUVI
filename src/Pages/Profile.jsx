import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Extract the user's initial
  const userInitial =
    userData && userData.user && userData.user.username
      ? userData.user.username.charAt(0).toUpperCase()
      : "";

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Profile</h3>
      <div className="d-flex justify-content-center">
        {isAuthenticated ? (
          <div
            className="card text-center shadow-sm"
            style={{ width: "20rem", height: "30rem" }}
          >
            <div className="card-header bg-secondary text-white py-5">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto bg-light"
                style={{
                  width: "150px",
                  height: "150px",
                  fontSize: "3rem",
                  color: "black",
                }}
              >
                {userInitial}
              </div>
            </div>
            <div className="card-body">
              <h3 className="card-title">{userData.user.username}</h3>
              <h4 className="card-text text-muted">{userData.user.email}</h4>
            </div>
            <div className="card-footer">
              {/* <Link to="/edit-profile" className="btn btn-primary">
                Edit Profile
              </Link> */}
              <button
                className="btn btn-danger ms-2"
                onClick={() => {
                  // Add logout logic or action here
                  navigate("/user");
                }}
              >
                back
              </button>
            </div>
          </div>
        ) : (
          <h1>No Profile Available</h1>
        )}
      </div>
    </div>
  );
};

export default Profile;
