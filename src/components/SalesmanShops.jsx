import React, { useState, useEffect } from "react";
import "../stylesheets/ShopsTable.css";
import { jwtDecode } from "jwt-decode";
import SalesmanSidebar from "./SalesmanSidebar";

// const SalesmanShopsDashboard = () => {
//   const [salesman, setSalesman] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSalesmanData = async () => {
//       const token = localStorage.getItem("salesmanToken");
//       if (!token) {
//         window.location.href = "/salesman/login";
//         return;
//       }

//       try {
//         const decoded = jwtDecode(token);
//         const id = decoded?.id;
//         console.log(id, "id");

//         setLoading(true);
//         const response = await fetch(
//           `${import.meta.env.VITE_APP_BACKEND_URL}/api/salesman/details/${id}`
//         );
//         const data = await response.json();
//         if (response.ok) {
//           setSalesman(data.salesman);
//         } else {
//           console.error("Failed to fetch managers:", data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching managers:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSalesmanData();
//   }, []);

//   console.log(salesman, "s");

//   if (loading) return <div className="loading-spinner">Loading...</div>;
//   if (error) return <div className="error-message">Error: {error}</div>;
//   if (!salesman) return <div className="no-data">No salesman data found</div>;

//   return (
//     <div className="dashboard-container ">
//       {/* Header Section */}
//       <header className="dashboard-header">
//         <h1>Salesman Commission Dashboard</h1>
//       </header>

//       {/* Salesman Profile Section */}
//       <section className="profile-section">
//         <div className="profile-card">
//           <div className="profile-header">
//             <div className="avatar">{salesman?.name?.charAt(0)}</div>
//             <h2>{salesman.name}</h2>
//             <button>
//               <span
//                 className={`status-badge ${
//                   salesman.isApproved ? "approved" : "pending"
//                 }`}
//               >
//                 {salesman.isApproved ? "Approved" : "Pending"}
//               </span>
//             </button>
//           </div>

//           <div className="profile-details">
//             <div className="detail-row">
//               <span className="detail-label">Email:</span>
//               <span>{salesman.email}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Mobile:</span>
//               <span>{salesman.mobileNumber}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Agent Code:</span>
//               <span>{salesman?.agentCode?.join(", ")}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Bank Details:</span>
//               <span>
//                 {salesman.bankName} (A/C: ****
//                 {salesman.bankAccountNumber?.slice(-4)})
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="stats-card">
//           <div className="stat-item">
//             <h3>Total Commission</h3>
//             <p className="stat-value">
//               ₹{salesman.totalCommissionEarned?.toLocaleString()}
//             </p>
//           </div>
//           <div className="stat-item">
//             <h3>Shops Added</h3>
//             <p className="stat-value">
//               {salesman.shopsAddedBySalesman?.length}
//             </p>
//           </div>
//           <div className="stat-item">
//             <h3>Member Since</h3>
//             <p className="stat-value">
//               {new Date(salesman.createdAt)?.toLocaleDateString()}
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Commission Table Section */}
//       <section className="commission-section">
//         <h2>Commission Details</h2>
//         <div className="commission-table-container">
//           <table className="commission-table">
//             <thead>
//               <tr>
//                 <th>Shop Name</th>
//                 <th>Location</th>
//                 <th>Commission Amount</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {salesman.salesCommissionEarned?.map((commission, index) => (
//                 <tr key={index}>
//                   <td>
//                     <div className="shop-info">
//                       <span className="shop-name">
//                         {commission.shop.shopName}
//                       </span>
//                     </div>
//                   </td>
//                   <td>
//                     {commission.shop.locality}, {commission.shop.place}
//                   </td>
//                   <td className="amount">₹{commission.amount}</td>
//                   <td>{new Date(commission._id).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {salesman.salesCommissionEarned?.length === 0 && (
//             <div className="no-commissions">No commission records found</div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default SalesmanShopsDashboard;


const SalesmanShopsDashboard = () => {
  const [salesman, setSalesman] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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

        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/salesman/details/${id}`
        );
        const data = await response.json();
        if (response.ok) {
          setSalesman(data.salesman);
        } else {
          setError(data.message || "Failed to fetch salesman data");
        }
      } catch (error) {
        setError("Error fetching salesman data");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesmanData();
  }, []);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!salesman) return <div className="no-data">No salesman data found</div>;

  return (
    <div className={` ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <SalesmanSidebar 
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        salesmanData={salesman}
      />
      
      <div className="dashboard-container">
        {/* Header Section */}
        <header className="dashboard-header">
          <h1>Salesman Commission Dashboard</h1>
        </header>

        {/* Salesman Profile Section */}
        <section className="profile-section">
          <div className="profile-card">
            <div className="profile-header">
              <div className="avatar">{salesman?.name?.charAt(0)}</div>
              <h2>{salesman.name}</h2>
              <button>
                <span
                  className={`status-badge ${
                    salesman.isApproved ? "approved" : "pending"
                  }`}
                >
                  {salesman.isApproved ? "Approved" : "Pending"}
                </span>
              </button>
            </div>

            <div className="profile-details">
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span>{salesman.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Mobile:</span>
                <span>{salesman.mobileNumber}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Agent Code:</span>
                <span>{salesman?.agentCode?.join(", ")}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Bank Details:</span>
                <span>
                  {salesman.bankName} (A/C: ****
                  {salesman.bankAccountNumber?.slice(-4)})
                </span>
              </div>
            </div>
          </div>

          <div className="stats-card">
            <div className="stat-item">
              <h3>Total Commission</h3>
              <p className="stat-value">
                ₹{salesman.totalCommissionEarned?.toLocaleString()}
              </p>
            </div>
            <div className="stat-item">
              <h3>Shops Added</h3>
              <p className="stat-value">
                {salesman.shopsAddedBySalesman?.length}
              </p>
            </div>
            <div className="stat-item">
              <h3>Member Since</h3>
              <p className="stat-value">
                {new Date(salesman.createdAt)?.toLocaleDateString()}
              </p>
            </div>
          </div>
        </section>

        {/* Commission Table Section */}
        <section className="commission-section">
          <h2>Commission Details</h2>
          <div className="commission-table-container">
            <table className="commission-table">
              <thead>
                <tr>
                  <th>Shop Name</th>
                  <th>Location</th>
                  <th>Commission Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {salesman.salesCommissionEarned?.map((commission, index) => (
                  <tr key={index}>
                    <td>
                      <div className="shop-info">
                        <span className="shop-name">
                          {commission.shop.shopName}
                        </span>
                      </div>
                    </td>
                    <td>
                      {commission.shop.locality}, {commission.shop.place}
                    </td>
                    <td className="amount">₹{commission.amount}</td>
                    <td>{new Date(commission._id).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {salesman.salesCommissionEarned?.length === 0 && (
              <div className="no-commissions">No commission records found</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SalesmanShopsDashboard;