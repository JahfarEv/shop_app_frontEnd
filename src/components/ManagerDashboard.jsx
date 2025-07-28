import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../stylesheets/ManagerDashboard.css";
import ManagerSidebar from "./ManagerSidebar";
import { FiMenu, FiRefreshCw, FiUser, FiDollarSign, FiCreditCard, FiPhone, FiMail, FiLogOut } from "react-icons/fi";

export default function ManagerDashboard() {
  const [managerData, setManagerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const getManagerIdFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.id || decoded._id;
    } catch (err) {
      console.error("Error decoding token:", err);
      return null;
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("managerToken");
        if (!token) {
          navigate("/manager/login");
          return;
        }

        const managerId = getManagerIdFromToken(token);
        if (!managerId) {
          throw new Error("Unable to get manager ID from token");
        }

        const res = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/manager/details/${managerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch manager details");
        }

        const data = await res.json();
        setManagerData(data.manager);
      } catch (err) {
        console.error("Error fetching manager dashboard data:", err);
        setError(err.message);
        if (
          err.message.includes("invalid token") ||
          err.message.includes("jwt malformed")
        ) {
          localStorage.removeItem("managerToken");
          navigate("/manager/login");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="md-loading-container">
        <div className="md-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="md-error-container">
        <div className="md-error-card">
          <p className="md-error-message">Error: {error}</p>
          <button className="md-retry-btn" onClick={() => window.location.reload()}>
            <FiRefreshCw className="md-retry-icon" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`md-dashboard ${isSidebarOpen ? "md-sidebar-open" : ""}`}>
      <ManagerSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        managerData={managerData}
      />

      <div className="md-main">
        <header className="md-header">
          <button className="md-menu-btn" onClick={toggleSidebar}>
            <FiMenu size={24} />
          </button>
          <div className="md-header-content">
            <h1>Welcome back, <span>{managerData?.name || "Manager"}</span>!</h1>
            <div className={`md-status ${managerData?.isApproved ? "md-approved" : "md-pending"}`}>
              {managerData?.isApproved ? "Approved" : "Pending Approval"}
            </div>
          </div>
        </header>

        <div className="md-content-wrapper">
          <div className="md-stats">
            <div className="md-stat-card md-primary">
              <div className="md-stat-content">
                <h3>Team Members</h3>
                <div className="md-stat-value">24</div>
                <div className="md-stat-subtext">Active this month</div>
              </div>
              <div className="md-stat-icon">
                <FiUser size={48} />
              </div>
            </div>

            <div className="md-stat-card md-revenue">
              <div className="md-stat-content">
                <h3>This Month's Sales</h3>
                <div className="md-stat-value">₹1,42,500</div>
                <div className="md-stat-subtext">+12% from last month</div>
              </div>
              <div className="md-stat-icon">
                <FiDollarSign size={48} />
              </div>
            </div>

            <div className="md-stat-card md-commission">
              <div className="md-stat-content">
                <h3>Pending Approvals</h3>
                <div className="md-stat-value">5</div>
                <div className="md-stat-subtext">Waiting for your review</div>
              </div>
              <div className="md-stat-icon">
                <FiCreditCard size={48} />
              </div>
            </div>
          </div>

          <div className="md-financial-section">
            <h2 className="md-section-title">Profile Information</h2>
            <div className="md-financial-cards">
              <div className="md-financial-card">
                <h4><FiUser className="md-card-icon" /> Personal Details</h4>
                <div className="md-detail-item">
                  <span className="md-detail-label">Email:</span>
                  <span className="md-detail-value">{managerData?.email}</span>
                </div>
                <div className="md-detail-item">
                  <span className="md-detail-label">Mobile:</span>
                  <span className="md-detail-value">{managerData?.mobileNumber}</span>
                </div>
              </div>

              {managerData?.bankAccountNumber && (
                <div className="md-financial-card">
                  <h4><FiCreditCard className="md-card-icon" /> Bank Details</h4>
                  <div className="md-detail-item">
                    <span className="md-detail-label">Bank Name:</span>
                    <span className="md-detail-value">{managerData.bankName}</span>
                  </div>
                  <div className="md-detail-item">
                    <span className="md-detail-label">Account Number:</span>
                    <span className="md-detail-value">{managerData.bankAccountNumber}</span>
                  </div>
                  <div className="md-detail-item">
                    <span className="md-detail-label">IFSC Code:</span>
                    <span className="md-detail-value">{managerData.ifscCode}</span>
                  </div>
                  <div className="md-detail-item">
                    <span className="md-detail-label">PAN Number:</span>
                    <span className="md-detail-value">{managerData.pancardNumber}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu toggle button */}
      <button className="md-menu-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? <FiLogOut size={24} /> : <FiMenu size={24} />}
      </button>
    </div>
  );
}