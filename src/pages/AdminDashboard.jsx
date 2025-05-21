import React, { useState } from "react";
import "../styles/AdminDashboard.css";
import ManageProducts from "./ManageProducts";
import AdminOrders from "./AdminOrders";


const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("Manage Products");

  return (
    <div className="admin-dashboard">
      <h1>Welcome, Admin 👋</h1>
      <p>This is your admin dashboard where you can manage your store.</p>

      {/* Dashboard Toggle Buttons */}
      <div className="dashboard-toggle-buttons">
        {["Manage Products", "View Orders", "User Management"].map((section) => (
          <button
            key={section}
            className={activeSection === section ? "active" : ""}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Render Section Based on Selected */}
      <div className="dashboard-section">
        {activeSection === "Manage Products" && <ManageProducts />}
        {activeSection === "View Orders" && <AdminOrders />}

        {activeSection === "User Management" && <p>👤 User management coming soon!</p>}
      </div>
    </div>
  );
};

export default AdminDashboard;
