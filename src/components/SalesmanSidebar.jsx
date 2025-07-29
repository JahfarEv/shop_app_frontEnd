import { Link, useNavigate, useLocation } from "react-router-dom";
import "../stylesheets/SalesDashboard.css";

export default function SalesmanSidebar({
  isSidebarOpen,
  toggleSidebar,
  salesmanData,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("salesmanToken");
    navigate("/");
  };

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <button className="sm-menu-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? "✕" : "☰"}
      </button>

      <aside className={`sm-sidebar ${isSidebarOpen ? "sm-sidebar-open" : ""}`}>
        <div className="sm-sidebar-header">
          <div className="sm-avatar">
            {salesmanData?.name?.charAt(0) || "S"}
          </div>
          <h3>Salesman Portal</h3>
        </div>

        <nav className="sm-nav">
          <Link
            to="/salesman/dashboard"
            className={`sm-nav-link ${
              isActive("/salesman/dashboard") ? "sm-active" : ""
            }`}
          >
            <span className="sm-nav-icon">📊</span> Overview
          </Link>
          <Link
            to="/salesman/profile"
            className={`sm-nav-link ${
              isActive("/salesman/profile") ? "sm-active" : ""
            }`}
          >
            <span className="sm-nav-icon">👤</span> Profile
          </Link>
          <Link
            to="/salesman/shops"
            className={`sm-nav-link ${
              isActive("/salesman/shops") ? "sm-active" : ""
            }`}
          >
            <span className="sm-nav-icon">🏪</span> My Shops
          </Link>
        </nav>

        <button className="sm-logout-btn" onClick={handleLogout}>
          <span className="sm-nav-icon">🚪</span> Logout
        </button>
      </aside>
    </>
  );
}
