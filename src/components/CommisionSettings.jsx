import React, { useState, useEffect } from "react";
import "../stylesheets/CommissionSettings.css";
import AdminLayout from "./AdminLayout";

const CommissionSettings = () => {
  const [activeTab, setActiveTab] = useState("salesman");
  const [formData, setFormData] = useState({
    salesCommission: "",
    salesTarget: "",
    subscriptionCommission: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [currentSettings, setCurrentSettings] = useState(null);

  // Format amount to INR currency
  const formatCurrency = (value) => {
    if (value === null || value === undefined) return "Not set";
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Fetch current settings on component mount and tab change
  useEffect(() => {
    const fetchCurrentSettings = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) return;

        const endpoint = activeTab === "salesman" 
          ? "salesman" 
          : "manager";

        const response = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/adminDashboard/get-commission/${endpoint}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        const data = await response.json();
        
        if (response.ok) {
          setCurrentSettings(data.settings);
        }
      } catch (error) {
        console.error("Error fetching current settings:", error);
      }
    };

    fetchCurrentSettings();
  }, [activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Authentication required");

      const endpoint = activeTab === "salesman" 
        ? "salesman" 
        : "manager";

      // Prepare the request body with only fields that have values
      const requestBody = {};
      if (formData.salesCommission) requestBody.amount = parseFloat(formData.salesCommission.replace(/[^0-9.]/g, ''));
      if (formData.salesTarget) requestBody.salesTarget = parseFloat(formData.salesTarget.replace(/[^0-9.]/g, ''));
      if (formData.subscriptionCommission) requestBody.subscriptionCommission = parseFloat(formData.subscriptionCommission.replace(/[^0-9.]/g, ''));

      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/adminDashboard/commission/${endpoint}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage(`${activeTab === "salesman" ? "Salesman" : "Manager"} settings updated successfully!`);
        setMessageType("success");
        
        // Update current settings with the new values
        setCurrentSettings(prev => ({
          ...prev,
          salesCommission: requestBody.amount !== undefined ? requestBody.amount : prev?.salesCommission,
          salesTarget: requestBody.salesTarget !== undefined ? requestBody.salesTarget : prev?.salesTarget,
          subscriptionCommission: requestBody.subscriptionCommission !== undefined 
            ? requestBody.subscriptionCommission 
            : prev?.subscriptionCommission
        }));

        // Clear form fields that were submitted
        setFormData({
          salesCommission: "",
          salesTarget: "",
          subscriptionCommission: ""
        });
        
        // Refetch settings to ensure we have the latest data
        const refetchResponse = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/adminDashboard/get-commission/${activeTab}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        const refetchData = await refetchResponse.json();
        if (refetchResponse.ok) {
          setCurrentSettings(refetchData.settings);
        }
      } else {
        throw new Error(data.message || "Failed to update settings");
      }
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes with currency formatting
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Allow only numbers and decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    // Format as currency when there's a value
    if (numericValue) {
      const formattedValue = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(parseFloat(numericValue));
      
      // Remove the currency symbol for display (we'll add it in the input)
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue.replace(/^[^\d]+/, '')
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <AdminLayout>
    <div className="commission-settings-container">
      <div className="commission-card">
        <div className="commission-header">
          <h2>Commission & Target Settings</h2>
          <p>Configure all commission settings for your team</p>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === "salesman" ? "active" : ""}`}
            onClick={() => setActiveTab("salesman")}
          >
            Salesman Settings
          </button>
          <button
            className={`tab ${activeTab === "manager" ? "active" : ""}`}
            onClick={() => setActiveTab("manager")}
          >
            Manager Settings
          </button>
        </div>

        {currentSettings ? (
          <div className="current-settings">
            <div className="setting-item">
              <span className="setting-label">Current Sales Commission:</span>
              <span className="setting-value">
                {formatCurrency(activeTab=="salesman"?currentSettings.salesmanCommission:currentSettings.managerCommission)}
              </span>
            </div>
            <div className="setting-item">
              <span className="setting-label">Current Sales Target:</span>
              <span className="setting-value">
                {formatCurrency(currentSettings.salesTarget)}
              </span>
            </div>
            <div className="setting-item">
              <span className="setting-label">Current Subscription Commission:</span>
              <span className="setting-value">
                {formatCurrency(currentSettings.subscriptionCommission)}
              </span>
            </div>
          </div>
        ) : (
          <div className="loading-settings">Loading current settings...</div>
        )}

        <form onSubmit={handleSubmit} className="commission-form">
          <h3 className="form-title">Update {activeTab === "salesman" ? "Salesman" : "Manager"} Settings</h3>
          
          <div className="form-group">
            <label htmlFor="salesCommission">Sales Commission (₹)</label>
            <div className="currency-input">
              <span className="currency-symbol">₹</span>
              <input
                id="salesCommission"
                name="salesCommission"
                type="text"
                value={formData.salesCommission}
                onChange={handleInputChange}
                placeholder={`Enter new sales commission`}
                className="commission-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="salesTarget">Monthly Sales Target (₹)</label>
            <div className="currency-input">
              <span className="currency-symbol">₹</span>
              <input
                id="salesTarget"
                name="salesTarget"
                type="text"
                value={formData.salesTarget}
                onChange={handleInputChange}
                placeholder={`Enter new sales target`}
                className="commission-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subscriptionCommission">Subscription Commission (₹)</label>
            <div className="currency-input">
              <span className="currency-symbol">₹</span>
              <input
                id="subscriptionCommission"
                name="subscriptionCommission"
                type="text"
                value={formData.subscriptionCommission}
                onChange={handleInputChange}
                placeholder={`Enter new subscription commission`}
                className="commission-input"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || (!formData.salesCommission && !formData.salesTarget && !formData.subscriptionCommission)}
            className="save-button"
          >
            {loading ? (
              <>
                <span className="spinner"></span> Updating...
              </>
            ) : (
              `Update ${activeTab === "salesman" ? "Salesman" : "Manager"} Settings`
            )}
          </button>
        </form>

        {message && (
          <div className={`message-box ${messageType}`}>
            {messageType === "success" ? (
              <span className="icon">✓</span>
            ) : (
              <span className="icon">⚠</span>
            )}
            {message}
          </div>
        )}
      </div>
    </div>
    </AdminLayout>
  );
};

export default CommissionSettings;