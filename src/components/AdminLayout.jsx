import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/AdminDashboard.css";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    // Clear admin token and any other admin-related data
    localStorage.removeItem("adminToken");
    // Redirect to admin login page
    navigate("/admin/login");
  };
  return (
    <div className="admin-dashboard">
      {/* ☰ Button will now work everywhere */}
      <button
        className="mobile-menu-toggle"
        onClick={toggleSidebar}
        style={{ right: "1rem", left: "auto" }}
      >
        ☰
      </button>

      <aside className={`sidebar ${isSidebarOpen ? "mobile-open" : ""}`}>
        <h2 className="sidebar__title">Admin Menu</h2>
        <nav className="sidebar__nav">
          <ul>
            <li>
              <Link to="/admin/dashboard" className="sidebar__link">
                Overview
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="sidebar__link">
                User Management
              </Link>
            </li>
            <li>
              <Link to="/admin/shops" className="sidebar__link">
                Shop Management
              </Link>
            </li>
            <li>
              <Link to="/admin/products" className="sidebar__link">
                Product Management
              </Link>
            </li>
            <li>
              <Link to="/admin/subscription-plans" className="sidebar__link">
                Subscription Plans
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users/subscriptions/details"
                className="sidebar__link"
              >
                User Subscription Details
              </Link>
            </li>
            <li>
              <Link to="/admin/commision-settings" className="sidebar__link">
                CommisionSettings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <li>
        <button
          onClick={handleLogout}
          style={{
            position: "fixed", // stays fixed
            bottom: "20px", // distance from bottom
            left: "0", // aligns to sidebar
            width: "250px", // same width as your sidebar
            padding: "12px 16px",
            backgroundColor: "#ef4444",
            color: "white",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            transition: "all 0.2s ease",
            border: "none",
            cursor: "pointer",
            zIndex: 1000, // ensure it's on top
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#dc2626")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#ef4444")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </button>
      </li>

      <main className="dashboard-content">{children}</main>
    </div>
  );
}
