import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/Actions/authActions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for messages
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Define validation schema with Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    try {
      const resultAction = await dispatch(loginUser(values));

      if (loginUser.fulfilled.match(resultAction)) {
        const { user } = resultAction.payload;
        resetForm();
        setMessage("Login successful!");
        setIsError(false); // Reset error state

        // Navigate after 1.5 seconds
        setTimeout(() => {
          if (user.isAdmin === true) {
            navigate("/admin");
          } else {
            navigate("/user");
          }
        }, 1500);
      } else {
        setMessage(resultAction.payload || "Login failed. Please try again.");
        setIsError(true); // Set error state
      }
    } catch (error) {
      setMessage("An unexpected error occurred.");
      setIsError(true); // Set error state
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 pt-1">
      <div className="row bg-white rounded shadow-lg overflow-hidden w-100">
        <div className="col-md-6 d-flex align-items-center justify-content-center p-4">
          <img
            src="https://github.com/user-attachments/assets/c819cbe1-3451-4c97-8a3a-9f1f84bca852"
            alt="GD Events"
            className="img-fluid"
            style={{ maxHeight: "300px", objectFit: "contain" }} // Maintain aspect ratio
          />
        </div>
        <div className="col-md-6 p-4 mt-5">
          <h2 className="mb-4 text-center">Login</h2>

          {/* Display message */}
          {message && (
            <div
              className={`alert ${isError ? "alert-danger" : "alert-success"}`}
              role="alert"
            >
              {message}
            </div>
          )}

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="name@company.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter Your Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary mt-2"
                    disabled={isSubmitting}
                  >
                    Login
                  </button>
                </div>
                <div className="mt-3 text-center">
                  <span>New User</span>
                  <Link to="/register">Register</Link>
                </div>
                <div className="mt-3 text-center">
                  <Link to="/forgot">Forgot password?</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
