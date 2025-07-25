import { Routes, Route } from "react-router-dom";
import AdminButton from "./components/AdminButton";
import AdminDashboard from "./components/AdminDashboard";
import SalesManDashboard from "./components/SalesManDashboard";
import AdminLogin from "./components/AdminLogin";
import UserManagement from "./components/UserManagement";
import ShopManagement from "./components/ShopManagement";
import ProductManagement from "./components/ProductManagement";
import ProductManagement__2nd from "./components/ProductManagement__2nd";
import UserSubscriptionDetails from "./components/UserSubscriptionDetails";
import SubscriptionPlans from "./components/SubscriptionPlans";
import EditSubscriptionPlans from "./components/EditSubscriptionPlans";
import CommissionSettings from "./components/CommisionSettings";
import SalesmanProfile from "./components/SalesmanProfile";
import SalesmanRegistration from "./components/SalesmanRegistration";
import ManagerRegistration from "./components/ManagerRegistration";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminButton />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/salesman/register" element={< SalesmanRegistration/>} />
                <Route path="/manager/register" element={< ManagerRegistration/>} />


        <Route path="/salesman/dashboard" element={<SalesManDashboard />} />
        <Route path="/salesman/profile" element={<SalesmanProfile />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/shops" element={<ShopManagement />} />
        <Route path="/admin/products" element={<ProductManagement />} />
        <Route
          path="/admin/shops/products/:id"
          element={<ProductManagement__2nd />}
        />
        <Route
          path="/admin/users/subscriptions/details"
          element={<UserSubscriptionDetails />}
        />
        <Route
          path="/admin/subscription-plans"
          element={<SubscriptionPlans />}
        />
        <Route
          path="/subscription-plans/edit"
          element={<EditSubscriptionPlans />}
        />
        <Route
          path="/admin/commision-settings"
          element={<CommissionSettings />}
        />
      </Routes>
    </>
  );
}

export default App;
