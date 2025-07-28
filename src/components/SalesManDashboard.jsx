// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import "../stylesheets/SalesDashboard.css";

// export default function SalesmanDashboard() {
//   const [totalShops, setTotalShops] = useState(0);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [totalCommission, setTotalCommission] = useState(0);
//   const [salesmanData, setSalesmanData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   const getSalesmanIdFromToken = (token) => {
//     try {
//       const decoded = jwtDecode(token);
//       return decoded.id || decoded._id;
//     } catch (err) {
//       console.error("Error decoding token:", err);
//       return null;
//     }
//   };

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const token = localStorage.getItem("salesmanToken");
//         if (!token) {
//           navigate("/salesman/login");
//           return;
//         }

//         const salesmanId = getSalesmanIdFromToken(token);
//         if (!salesmanId) {
//           throw new Error("Unable to get salesman ID from token");
//         }

//         setLoading(true);

//         const detailsRes = await fetch(
//           `${
//             import.meta.env.VITE_APP_BACKEND_URL
//           }/api/salesman/details/${salesmanId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!detailsRes.ok) {
//           throw new Error("Failed to fetch salesman details");
//         }

//         const detailsData = await detailsRes.json();

//         if (detailsData.salesman) {
//           setSalesmanData(detailsData.salesman);

//           if (detailsData.salesman.shopsAddedBySalesman) {
//             const shops = detailsData.salesman.shopsAddedBySalesman;
//             setTotalShops(shops.length);

//             // Calculate financial totals
//             const amount = shops.reduce(
//               (sum, shop) => sum + (shop.totalSales || 0),
//               0
//             );
//             const commission = detailsData.salesman.salesCommissionEarned || 0;

//             setTotalAmount(amount);
//             setTotalCommission(commission);
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching dashboard data:", err);
//         setError(err.message);
//         if (
//           err.message.includes("invalid token") ||
//           err.message.includes("jwt malformed")
//         ) {
//           localStorage.removeItem("salesmanToken");
//           navigate("/salesman/login");
//         }
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, [navigate]);

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("salesmanToken");
//     navigate("/");
//   };

//   if (loading) {
//     return (
//       <div className="sm-loading-container">
//         <div className="sm-spinner"></div>
//         <p>Loading dashboard...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="sm-error-container">
//         <p>Error: {error}</p>
//         <button
//           className="sm-retry-btn"
//           onClick={() => window.location.reload()}
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className={`sm-dashboard ${isSidebarOpen ? "sm-sidebar-open" : ""}`}>
//       <button className="sm-menu-toggle" onClick={toggleSidebar}>
//         {isSidebarOpen ? "✕" : "☰"}
//       </button>

//       <aside className="sm-sidebar">
//         <div className="sm-sidebar-header">
//           <div className="sm-avatar">
//             {salesmanData?.name?.charAt(0) || "S"}
//           </div>
//           <h3>Salesman Portal</h3>
//         </div>

//         <nav className="sm-nav">
//           <Link to="/salesman/dashboard" className="sm-nav-link sm-active">
//             <span className="sm-nav-icon">📊</span> Overview
//           </Link>
//           <Link to="/salesman/profile" className="sm-nav-link">
//             <span className="sm-nav-icon">👤</span> Profile
//           </Link>
//           <Link to="/salesman/shops" className="sm-nav-link">
//             <span className="sm-nav-icon">🏪</span> My Shops
//           </Link>
//           <Link to="/salesman/commission" className="sm-nav-link">
//             <span className="sm-nav-icon">💰</span> Commission
//           </Link>
//         </nav>

//         <button className="sm-logout-btn" onClick={handleLogout}>
//           <span className="sm-nav-icon">🚪</span> Logout
//         </button>
//       </aside>

//       <main className="sm-main">
//         <header className="sm-header">
//           <h1>Welcome back, {salesmanData?.name || "Salesman"}!</h1>
//           <div className="sm-status">
//             Status:{" "}
//             <span
//               className={
//                 salesmanData?.isApproved ? "sm-approved" : "sm-pending"
//               }
//             >
//               {salesmanData?.isApproved ? "Approved" : "Pending"}
//             </span>
//           </div>
//         </header>

//         <div className="sm-stats">
//           <div className="sm-stat-card sm-primary">
//             <div className="sm-stat-content">
//               <h3>Shops Managed</h3>
//               <p className="sm-stat-value">{totalShops}</p>
//             </div>
//             <div className="sm-stat-icon">🏬</div>
//           </div>

//           <div className="sm-stat-card sm-revenue">
//             <div className="sm-stat-content">
//               <h3>Total Sales</h3>
//               <p className="sm-stat-value">
//                 {totalCommission.toLocaleString("en-IN", {
//                   style: "currency",
//                   currency: "INR",
//                   maximumFractionDigits: 0,
//                 })}
//               </p>
//               <div className="sm-stat-subtext">All-time revenue</div>
//             </div>
//             <div className="sm-stat-icon">📈</div>
//           </div>

//           <div className="sm-stat-card sm-commission">
//             <div className="sm-stat-content">
//               <h3>Your Commission</h3>
//               <p className="sm-stat-value">
//                 {totalAmount.toLocaleString("en-IN", {
//                   style: "currency",
//                   currency: "INR",
//                   maximumFractionDigits: 0,
//                 })}
//               </p>
//               <div className="sm-stat-subtext">Earned so far</div>
//             </div>
//             <div className="sm-stat-icon">💰</div>
//           </div>
//         </div>

//         <div className="sm-financial-section">
//           <h2 className="sm-section-title">Financial Details</h2>

//           <div className="sm-financial-cards">
//             <div className="sm-financial-card">
//               <h4>Total Income</h4>
//               <div className="sm-amount">
//                 {totalCommission.toLocaleString("en-IN", {
//                   style: "currency",
//                   currency: "INR",
//                 })}
//               </div>
//               <div className="sm-financial-details">
//                 <span>From {totalShops} active shops</span>
//                 <span>Updated: {new Date().toLocaleDateString()}</span>
//               </div>
//             </div>
//             {/* 
//             <div className="sm-financial-card">
//               <h4>Commission Earned</h4>
//               <div className="sm-amount sm-commission-amount">
//                 {totalCommission.toLocaleString('en-IN', {
//                   style: 'currency',
//                   currency: 'INR'
//                 })}
//               </div>
//               <div className="sm-financial-details">
//                 <span>Commission from all shops</span>
//                 <span>Paid monthly</span>
//               </div>
//             </div> */}
//           </div>
//         </div>

//         <div className="sm-profile-section">
//           <div className="sm-section-header">
//             <h2>Your Profile</h2>
//             <Link to="/salesman/profile" className="sm-edit-link">
//               Edit Profile
//             </Link>
//           </div>

//           <div className="sm-profile-details">
//             <div className="sm-detail-card">
//               <h4>Personal Information</h4>
//               <div className="sm-detail-item">
//                 <span className="sm-detail-label">Agent Code:</span>
//                 <span className="sm-detail-value">
//                   {salesmanData?.agentCode?.[0] || "N/A"}
//                 </span>
//               </div>
//               <div className="sm-detail-item">
//                 <span className="sm-detail-label">Email:</span>
//                 <span className="sm-detail-value">
//                   {salesmanData?.email || "-"}
//                 </span>
//               </div>
//               <div className="sm-detail-item">
//                 <span className="sm-detail-label">Mobile:</span>
//                 <span className="sm-detail-value">
//                   {salesmanData?.mobileNumber || "-"}
//                 </span>
//               </div>
//             </div>

//             {salesmanData?.bankAccountNumber && (
//               <div className="sm-detail-card">
//                 <h4>Bank Details</h4>
//                 <div className="sm-detail-item">
//                   <span className="sm-detail-label">Bank:</span>
//                   <span className="sm-detail-value">
//                     {salesmanData.bankName}
//                   </span>
//                 </div>
//                 <div className="sm-detail-item">
//                   <span className="sm-detail-label">Account:</span>
//                   <span className="sm-detail-value">
//                     {salesmanData.bankAccountNumber}
//                   </span>
//                 </div>
//                 <div className="sm-detail-item">
//                   <span className="sm-detail-label">IFSC:</span>
//                   <span className="sm-detail-value">
//                     {salesmanData.ifscCode}
//                   </span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../stylesheets/SalesDashboard.css";
import SalesmanSidebar from "../components/SalesmanSidebar";

export default function SalesmanDashboard() {
  const [totalShops, setTotalShops] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalCommission, setTotalCommission] = useState(0);
  const [salesmanData, setSalesmanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const getSalesmanIdFromToken = (token) => {
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
        const token = localStorage.getItem("salesmanToken");
        if (!token) {
          navigate("/salesman/login");
          return;
        }

        const salesmanId = getSalesmanIdFromToken(token);
        if (!salesmanId) {
          throw new Error("Unable to get salesman ID from token");
        }

        setLoading(true);

        const detailsRes = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/salesman/details/${salesmanId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!detailsRes.ok) {
          throw new Error("Failed to fetch salesman details");
        }

        const detailsData = await detailsRes.json();

        if (detailsData.salesman) {
          setSalesmanData(detailsData.salesman);

          if (detailsData.salesman.shopsAddedBySalesman) {
            const shops = detailsData.salesman.shopsAddedBySalesman;
            setTotalShops(shops.length);

            const amount = shops.reduce(
              (sum, shop) => sum + (shop.totalSales || 0),
              0
            );
            const commission = detailsData.salesman.salesCommissionEarned || 0;

            setTotalAmount(amount);
            setTotalCommission(commission);
          }
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message);
        if (
          err.message.includes("invalid token") ||
          err.message.includes("jwt malformed")
        ) {
          localStorage.removeItem("salesmanToken");
          navigate("/salesman/login");
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
      <div className="sm-loading-container">
        <div className="sm-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sm-error-container">
        <p>Error: {error}</p>
        <button className="sm-retry-btn" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={`sm-dashboard ${isSidebarOpen ? "sm-sidebar-open" : ""}`}>
      {/* ✅ Modular Sidebar */}
      <SalesmanSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        salesmanData={salesmanData}
      />

      <main className="sm-main">
        <header className="sm-header">
          <h1>Welcome back, {salesmanData?.name || "Salesman"}!</h1>
          <div className="sm-status">
            Status:{" "}
            <span
              className={
                salesmanData?.isApproved ? "sm-approved" : "sm-pending"
              }
            >
              {salesmanData?.isApproved ? "Approved" : "Pending"}
            </span>
          </div>
        </header>

        <div className="sm-stats">
          <div className="sm-stat-card sm-primary">
            <div className="sm-stat-content">
              <h3>Shops Managed</h3>
              <p className="sm-stat-value">{totalShops}</p>
            </div>
            <div className="sm-stat-icon">🏬</div>
          </div>

          <div className="sm-stat-card sm-revenue">
            <div className="sm-stat-content">
              <h3>Total Sales</h3>
              <p className="sm-stat-value">
                {totalAmount.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                })}
              </p>
              <div className="sm-stat-subtext">All-time revenue</div>
            </div>
            <div className="sm-stat-icon">📈</div>
          </div>

          <div className="sm-stat-card sm-commission">
            <div className="sm-stat-content">
              <h3>Your Commission</h3>
              <p className="sm-stat-value">
                {totalCommission.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                })}
              </p>
              <div className="sm-stat-subtext">Earned so far</div>
            </div>
            <div className="sm-stat-icon">💰</div>
          </div>
        </div>

        <div className="sm-financial-section">
          <h2 className="sm-section-title">Financial Details</h2>
          <div className="sm-financial-cards">
            <div className="sm-financial-card">
              <h4>Total Income</h4>
              <div className="sm-amount">
                {totalCommission.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </div>
              <div className="sm-financial-details">
                <span>From {totalShops} active shops</span>
                <span>Updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="sm-profile-section">
          <div className="sm-section-header">
            <h2>Your Profile</h2>
            <a href="/salesman/profile" className="sm-edit-link">Edit Profile</a>
          </div>

          <div className="sm-profile-details">
            <div className="sm-detail-card">
              <h4>Personal Information</h4>
              <div className="sm-detail-item">
                <span className="sm-detail-label">Agent Code:</span>
                <span className="sm-detail-value">
                  {salesmanData?.agentCode?.[0] || "N/A"}
                </span>
              </div>
              <div className="sm-detail-item">
                <span className="sm-detail-label">Email:</span>
                <span className="sm-detail-value">{salesmanData?.email}</span>
              </div>
              <div className="sm-detail-item">
                <span className="sm-detail-label">Mobile:</span>
                <span className="sm-detail-value">{salesmanData?.mobileNumber}</span>
              </div>
            </div>

            {salesmanData?.bankAccountNumber && (
              <div className="sm-detail-card">
                <h4>Bank Details</h4>
                <div className="sm-detail-item">
                  <span className="sm-detail-label">Bank:</span>
                  <span className="sm-detail-value">{salesmanData.bankName}</span>
                </div>
                <div className="sm-detail-item">
                  <span className="sm-detail-label">Account:</span>
                  <span className="sm-detail-value">{salesmanData.bankAccountNumber}</span>
                </div>
                <div className="sm-detail-item">
                  <span className="sm-detail-label">IFSC:</span>
                  <span className="sm-detail-value">{salesmanData.ifscCode}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
