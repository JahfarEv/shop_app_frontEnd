import { Link } from "react-router-dom";
import { FiHome, FiUser, FiShoppingBag, FiDollarSign, FiLogOut } from "react-icons/fi";

const SalesmanSidebar = ({ isOpen, toggleSidebar, salesmanData, handleLogout }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="avatar">
          {salesmanData?.name?.charAt(0) || "S"}
        </div>
        <h3>Salesman Portal</h3>
        <button className="close-btn" onClick={toggleSidebar}>
          &times;
        </button>
      </div>

      <nav className="sidebar-nav">
        <Link to="/salesman/dashboard" className="nav-link">
          <FiHome className="nav-icon" />
          <span>Overview</span>
        </Link>
        <Link to="/salesman/profile" className="nav-link active">
          <FiUser className="nav-icon" />
          <span>Profile</span>
        </Link>
        <Link to="/salesman/shops" className="nav-link">
          <FiShoppingBag className="nav-icon" />
          <span>My Shops</span>
        </Link>
        <Link to="/salesman/commission" className="nav-link">
          <FiDollarSign className="nav-icon" />
          <span>Commission</span>
        </Link>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <FiLogOut className="nav-icon" />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default SalesmanSidebar;