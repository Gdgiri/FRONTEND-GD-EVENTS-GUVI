import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WeddingForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    groomName: Yup.string().required("Groom's name is required"),
    brideName: Yup.string().required("Bride's name is required"),
    marriageDate: Yup.date().required("Marriage date is required").nullable(),
    budget: Yup.number()
      .required("Budget is required")
      .min(0, "Budget cannot be negative"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await axios.post(
        "https://backend-gd-events-guvi.onrender.com/api/event/creatwed",
        values
      );

      // Reset the form after successful submission
      resetForm();

      // Navigate to /displayuser
      navigate(`/displayuser`, {
        state: {
          budget: values.budget,
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally handle the error (e.g., show an error message)
    } finally {
      setSubmitting(false); // Always set submitting to false after form submission
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Wedding Booking Form</h2>
      <div className="d-flex justify-content-center">
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            groomName: "",
            brideName: "",
            marriageDate: "",
            budget: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form style={{ maxWidth: "500px", width: "100%" }}>
              {/* Form Fields */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Field
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <Field
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="groomName" className="form-label">
                  Groom's Name
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="groomName"
                  name="groomName"
                />
                <ErrorMessage
                  name="groomName"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="brideName" className="form-label">
                  Bride's Name
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="brideName"
                  name="brideName"
                />
                <ErrorMessage
                  name="brideName"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="marriageDate" className="form-label">
                  Marriage Date
                </label>
                <Field
                  type="date"
                  className="form-control"
                  id="marriageDate"
                  name="marriageDate"
                />
                <ErrorMessage
                  name="marriageDate"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="budget" className="form-label">
                  Budget
                </label>
                <Field
                  type="number"
                  className="form-control"
                  id="budget"
                  name="budget"
                  min="0" // Set minimum budget to 0
                />
                <ErrorMessage
                  name="budget"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default WeddingForm;
