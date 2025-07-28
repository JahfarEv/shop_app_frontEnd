import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/ManagerRegistration.css";

const ManagerRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    ifscCode: "",
    bankAccountNumber: "",
    bankName: "",
    password: "",
    pancardNumber: "", // 👈 NEW
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.mobileNumber || !/^\d{10}$/.test(formData.mobileNumber))
      newErrors.mobileNumber = "Valid 10-digit mobile number required";
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Valid email required";
    if (!formData.ifscCode || !/^[A-Za-z]{4}\d{7}$/.test(formData.ifscCode))
      newErrors.ifscCode = "Valid IFSC code required";
    if (
      !formData.bankAccountNumber ||
      !/^\d{9,18}$/.test(formData.bankAccountNumber)
    )
      newErrors.bankAccountNumber = "Valid account number required";
    if (!formData.bankName) newErrors.bankName = "Bank name required";
    if (!formData.password || formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (
      !formData.pancardNumber ||
      !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pancardNumber)
    ) {
      newErrors.pancardNumber = "Valid PAN card number required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { confirmPassword, ...dataToSend } = formData;

      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/manager/register`,
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccessMessage("Registration successful! Awaiting admin approval.");
      localStorage.setItem("token", data.token);

      setTimeout(() => {
        navigate("/manager/dashboard");
      }, 2000);
    } catch (err) {
      setErrors({
        submit: err.message || "Registration failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-header">
          <h2>Manager Registration</h2>
          <p>Fill in your details to create an account</p>
        </div>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className={errors.mobileNumber ? "error" : ""}
              />
              {errors.mobileNumber && (
                <span className="error-text">{errors.mobileNumber}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="bankName">Bank Name</label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className={errors.bankName ? "error" : ""}
            />
            {errors.bankName && (
              <span className="error-text">{errors.bankName}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bankAccountNumber">Account Number</label>
              <input
                type="text"
                id="bankAccountNumber"
                name="bankAccountNumber"
                value={formData.bankAccountNumber}
                onChange={handleChange}
                className={errors.bankAccountNumber ? "error" : ""}
              />
              {errors.bankAccountNumber && (
                <span className="error-text">{errors.bankAccountNumber}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="ifscCode">IFSC Code</label>
              <input
                type="text"
                id="ifscCode"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                className={errors.ifscCode ? "error" : ""}
                placeholder="ABCD0123456"
              />
              {errors.ifscCode && (
                <span className="error-text">{errors.ifscCode}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="pancardNumber">PAN Card Number</label>
            <input
              type="text"
              id="pancardNumber"
              name="pancardNumber"
              value={formData.pancardNumber}
              onChange={handleChange}
              className={errors.pancardNumber ? "error" : ""}
              placeholder="ABCDE1234F"
            />
            {errors.pancardNumber && (
              <span className="error-text">{errors.pancardNumber}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "error" : ""}
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span> Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="login-link">
          Already have an account? <a href="/admin/login">Login here</a>
        </div>
      </div>
    </div>
  );
};

export default ManagerRegistration;
