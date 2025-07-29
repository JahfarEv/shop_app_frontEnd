import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  FiEdit,
  FiSave,
  FiX,
  FiUser,
  FiPhone,
  FiMail,
  FiCreditCard,
  FiHome,
  FiDollarSign,
} from "react-icons/fi";
import "../stylesheets/SalesmanProfile.css";
import SalesmanSidebar from "./SalesmanSidebar";

const SalesmanProfile = () => {
  const [salesman, setSalesman] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    bankName: "",
    bankAccountNumber: "",
    ifscCode: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchSalesmanData = async () => {
      const token = localStorage.getItem("salesmanToken");
      if (!token) {
        window.location.href = "/salesman/login";
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const id = decoded?.id;

        const response = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/salesman/details/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch salesman data");
        }

        const data = await response.json();
        setSalesman(data.salesman);
        setFormData({
          name: data.salesman.name || "",
          email: data.salesman.email || "",
          mobileNumber: data.salesman.mobileNumber || "",
          bankName: data.salesman.bankName || "",
          bankAccountNumber: data.salesman.bankAccountNumber || "",
          ifscCode: data.salesman.ifscCode || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesmanData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("salesmanToken");
      const decoded = jwtDecode(token);
      const id = decoded?.id;

      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/salesman/details/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      setSalesman(data.salesman);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-alert">
          <p>Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={` ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <SalesmanSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        salesmanData={salesman}
      />

      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-header">
            <h1>Salesman Profile</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="edit-button"
              >
                <FiEdit className="button-icon" /> Edit
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="cancel-button"
              >
                <FiX className="button-icon" /> Cancel
              </button>
            )}
          </div>

          <div className="profile-content">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-section">
                  <h2 className="section-title">
                    <FiUser className="section-icon" /> Personal Information
                  </h2>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Mobile Number</label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h2 className="section-title">
                    <FiDollarSign className="section-icon" /> Bank Details
                  </h2>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Bank Name</label>
                      <input
                        type="text"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Account Number</label>
                      <input
                        type="text"
                        name="bankAccountNumber"
                        value={formData.bankAccountNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>IFSC Code</label>
                      <input
                        type="text"
                        name="ifscCode"
                        value={formData.ifscCode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-button">
                    <FiSave className="button-icon" /> Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-view">
                <div className="profile-summary">
                  <div className="avatar">
                    {salesman.name?.charAt(0) || "S"}
                  </div>
                  <div className="summary-info">
                    <h2>{salesman.name}</h2>
                    <p>{salesman.email}</p>
                  </div>
                </div>

                <div className="profile-section">
                  <h2 className="section-title">
                    <FiUser className="section-icon" /> Personal Information
                  </h2>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Full Name</span>
                      <span className="info-value">{salesman.name}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Email Address</span>
                      <span className="info-value">{salesman.email}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Mobile Number</span>
                      <span className="info-value">
                        {salesman.mobileNumber}
                      </span>
                    </div>
                  </div>
                </div>

                {salesman.bankAccountNumber && (
                  <div className="profile-section">
                    <h2 className="section-title">
                      <FiCreditCard className="section-icon" /> Bank Details
                    </h2>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Bank Name</span>
                        <span className="info-value">{salesman.bankName}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Account Number</span>
                        <span className="info-value">
                          {salesman.bankAccountNumber}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">IFSC Code</span>
                        <span className="info-value">{salesman.ifscCode}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesmanProfile;
