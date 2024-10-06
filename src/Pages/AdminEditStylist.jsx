import React, { useEffect, useState } from "react";
import axios from "axios";
import { app } from "../firebase"; // Import your Firebase app
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage"; // Import storage functions
import { useNavigate, useParams } from "react-router-dom"; // Import useParams to get the stylist ID

const AdminEditStylist = () => {
  const { id } = useParams();
  //console.log(id);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [services, setServices] = useState([{ label: "", price: "" }]);
  const [imgFile, setImgFile] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchStylistData = async () => {
      try {
        const response = await axios.get(
          `https://backend-gd-events-guvi.onrender.com/api/event/getstyleevent/${id}`
        );
        const stylistData = response.data;
        //console.log(stylistData);

        if (stylistData) {
          setName(stylistData.name);
          setServices(stylistData.services);
          setCurrentImage(stylistData.imgUrl); // Set current image URL
        } else {
          setErrorMessage("Stylist not found.");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch stylist data. Please try again.");
        console.error(error);
      }
    };

    fetchStylistData();
  }, [id]);

  const handleAddService = () => {
    setServices([...services, { label: "", price: "" }]);
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const handleImageChange = (e) => {
    setImgFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imgUrl = currentImage; // Default to current image

    // Upload new image if there's a new file
    if (imgFile) {
      const storage = getStorage(app); // Access storage from app
      const storageRef = ref(storage, `event-stylists/${imgFile.name}`);

      try {
        const snapshot = await uploadBytes(storageRef, imgFile);
        imgUrl = await getDownloadURL(snapshot.ref);
      } catch (error) {
        setErrorMessage("Failed to upload image. Please try again.");
        console.error(error);
        return;
      }
    }

    try {
      const response = await axios.put(
        `https://backend-gd-events-guvi.onrender.com/api/event/updatestylist/${id}`,
        {
          name,
          imgUrl,
          services,
        }
      );
      setSuccessMessage(response.data.message);
      navigate("/admineventstylist");
      // Clear fields or navigate as needed
    } catch (error) {
      setErrorMessage("Failed to update event stylist. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Event Stylist</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {services.map((service, index) => (
          <div key={index} className="mb-3">
            <label className="form-label">Service Label</label>
            <input
              type="text"
              className="form-control"
              value={service.label}
              onChange={(e) =>
                handleServiceChange(index, "label", e.target.value)
              }
              required
            />
            <label className="form-label">Service Price</label>
            <input
              type="number"
              className="form-control"
              value={service.price}
              onChange={(e) =>
                handleServiceChange(index, "price", e.target.value)
              }
              required
            />
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleAddService}
        >
          Add Service
        </button>
        <div className="mb-3">
          <label className="form-label">Current Image</label>
          {currentImage && (
            <img
              src={currentImage}
              alt="Current Stylist"
              style={{ maxHeight: "150px", objectFit: "cover" }}
            />
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Upload New Image (Optional)</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Event Stylist
        </button>
      </form>
    </div>
  );
};

export default AdminEditStylist;
