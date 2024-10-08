import React, { useState } from "react"; // Import useState
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const ForgotPassword = () => {
  // State to manage success and error messages
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch(
        "https://backend-gd-events-guvi.onrender.com/api/auth/forgot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Email sent successfully!");
        setIsError(false); // Reset error state
        resetForm();
      } else {
        setMessage("Failed to send email. Please try again.");
        setIsError(true); // Set error state
        resetForm();
      }
    } catch (error) {
      setMessage("An unexpected error occurred. Please try again later.");
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
        <div className="col-md-6 p-4">
          <h2 className="mb-4 text-center">Forgot Password</h2>

          {message && (
            <div
              className={`alert ${isError ? "alert-danger" : "alert-success"}`}
              role="alert"
            >
              {message}
            </div>
          )}

          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="form m-2">
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

                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-success mt-2"
                    disabled={isSubmitting}
                  >
                    Send Mail
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

export default ForgotPassword;
