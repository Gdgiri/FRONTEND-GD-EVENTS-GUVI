import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  // State for success/error messages
  const [formMessage, setFormMessage] = useState("");

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch(
        `https://backend-gd-events-guvi.onrender.com/api/auth/reset/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: values.password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setFormMessage(data.message); // Set success message
        resetForm();

        // Navigate after 1.5 seconds
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setFormMessage(data.message); // Set error message
      }
    } catch (error) {
      setFormMessage("An unexpected error occurred.");
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
        <div className="col-md-6 p-5">
          <h2 className="mb-4 text-center">Reset Password</h2>

          {/* Display success/error message */}
          {formMessage && (
            <div
              className={`alert ${
                formMessage.includes("success")
                  ? "alert-success"
                  : "alert-danger"
              } mb-3`}
            >
              {formMessage}
            </div>
          )}

          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="form">
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

                <div className="form-group mb-3">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Your Password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
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
                    Reset Password
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
