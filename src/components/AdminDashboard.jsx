// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "../stylesheets/AdminDashboard.css";

// export default function AdminDashboard() {
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalShops, setTotalShops] = useState(0);
//   const [totalSubscriptions, setTotalSubscriptions] = useState(0);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   useEffect(() => {
//     async function fetchCounts() {
//       try {
//         const token = localStorage.getItem("adminToken");

//         const userRes = await fetch(
//           `${import.meta.env.VITE_APP_BACKEND_URL}/adminDashboard/getalluser`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const userData = await userRes.json();
//         const users = userData.data || [];
//         setTotalUsers(users.length);

//         const subscribedCount = users.reduce((count, user) => {
//           return user.subscriptionId ? count + 1 : count;
//         }, 0);
//         setTotalSubscriptions(subscribedCount);

//         const shopRes = await fetch(
//           `${import.meta.env.VITE_APP_BACKEND_URL}/adminDashboard/getallshops`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const shops = await shopRes.json();
//         setTotalShops(shops.length);
//       } catch (err) {
//         console.error("Error fetching dashboard counts:", err);
//         setTotalUsers(0);
//         setTotalShops(0);
//         setTotalSubscriptions(0);
//       }
//     }

//     fetchCounts();
//   }, []);

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   return (
//     <div className="admin-dashboard">
//       {/* Sidebar toggle button for small screens - top RIGHT corner */}
//       <button
//         className="mobile-menu-toggle"
//         onClick={toggleSidebar}
//         style={{ right: "1rem", left: "auto" }}
//       >
//         ☰
//       </button>

//       {/* Sidebar with toggle class */}
//       <aside className={`sidebar ${isSidebarOpen ? "mobile-open" : ""}`}>
//         <h2 className="sidebar__title">Admin Menu</h2>
//         <nav className="sidebar__nav">
//           <ul>
//             <li>
//               <Link to="/admin/dashboard" className="sidebar__link">Overview</Link>
//             </li>
//             <li>
//               <Link to="/admin/users" className="sidebar__link">User Management</Link>
//             </li>
//             <li>
//               <Link to="/admin/shops" className="sidebar__link">Shop Management</Link>
//             </li>
//             <li>
//               <Link to="/admin/products" className="sidebar__link">Product Management</Link>
//             </li>
//             <li>
//               <Link to="/admin/subscription-plans" className="sidebar__link">Subscription Plans Management</Link>
//             </li>
//             <li>
//               <Link to="/admin/users/subscriptions/details" className="sidebar__link">User Subscription Details</Link>
//             </li>
//           </ul>
//         </nav>
//       </aside>

//       <main className="dashboard-content">
//         <h1 className="dashboard-content__heading">Dashboard Overview</h1>
//         <div className="stats-container">
//           <div className="stat-card">
//             <h3>Total Users</h3>
//             <p className="stat-card__number">{totalUsers}</p>
//           </div>
//           <div className="stat-card">
//             <h3>Total Shops</h3>
//             <p className="stat-card__number">{totalShops}</p>
//           </div>
//           <div className="stat-card">
//             <h3>Total Subscriptions</h3>
//             <p className="stat-card__number">{totalSubscriptions}</p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/AdminDashboard.css";

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalShops, setTotalShops] = useState(0);
  const [totalSubscriptions, setTotalSubscriptions] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCounts() {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          navigate("/admin/login");
          return;
        }

        const userRes = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/adminDashboard/getalluser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = await userRes.json();
        const users = userData.data || [];
        setTotalUsers(users.length);

        const subscribedCount = users.reduce((count, user) => {
          return user.subscriptionId ? count + 1 : count;
        }, 0);
        setTotalSubscriptions(subscribedCount);

        const shopRes = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/adminDashboard/getallshops`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const shops = await shopRes.json();
        setTotalShops(shops.length);
      } catch (err) {
        console.error("Error fetching dashboard counts:", err);
        setTotalUsers(0);
        setTotalShops(0);
        setTotalSubscriptions(0);
      }
    }

    fetchCounts();
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // Clear admin token and any other admin-related data
    localStorage.removeItem("adminToken");
    // Redirect to admin login page
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar toggle button for small screens - top RIGHT corner */}
      <button
        className="mobile-menu-toggle"
        onClick={toggleSidebar}
        style={{ right: "1rem", left: "auto" }}
      >
        ☰
      </button>

      {/* Sidebar with toggle class */}
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
                Subscription Plans Management
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
                Commision Settings
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  right: "20px",
                  padding: "12px 16px",
                  backgroundColor: "#ef4444", // Tailwind's red-500
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
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#dc2626")
                } // Tailwind's red-600
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
          </ul>
        </nav>
      </aside>

      <main className="dashboard-content">
        <h1 className="dashboard-content__heading">Dashboard Overview</h1>
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-card__number">{totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Total Shops</h3>
            <p className="stat-card__number">{totalShops}</p>
          </div>
          <div className="stat-card">
            <h3>Total Subscriptions</h3>
            <p className="stat-card__number">{totalSubscriptions}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
