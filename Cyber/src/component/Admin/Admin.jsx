import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard  from './Dashboard'
import Home from '../Home'


const Admin = () => {
  const [activeSection, setActiveSection] = useState("Dashboard"); // Default section

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Cybercafe</h2>
        <ul style={styles.menu}>
          <li
            style={{ ...styles.menuItem, background: activeSection === "Dashboard" ? "#3949ab" : "transparent" }}
            onClick={() => setActiveSection("Dashboard")}
          >
            Dashboard
          </li>
          <li
            style={{ ...styles.menuItem, background: activeSection === "My Documents" ? "#3949ab" : "transparent" }}
            onClick={() => setActiveSection("My Documents")}
          >
            My Documents
          </li>
          <li
            style={{ ...styles.menuItem, background: activeSection === "Profile" ? "#3949ab" : "transparent" }}
            onClick={() => setActiveSection("Profile")}
          >
            Profile
          </li>
          <li
            style={{ ...styles.menuItem, background: activeSection === "Logout" ? "#3949ab" : "transparent" }}
            onClick={() => setActiveSection("Logout")}
          >
            Logout
          </li>
        </ul>
      </div>

      {/* Content Section */}
      <div style={styles.content}>
        {activeSection === "Dashboard" && <Dashboard />}
        {activeSection === "My Documents" && <Home />}
        {activeSection === "Profile" && <Home />}
        {activeSection === "Logout" && <Home />}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: { display: "flex", height: "100vh", background: "#f8faff" },

  sidebar: {
    width: "250px",
    background: "#4c5fd5",
    color: "white",
    padding: "20px",
    position: "fixed",
    left: 0,
    top: 0,
    height: "100vh", // Full height
    display: "flex",
    flexDirection: "column",
  },
  
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
  },
  
  menu: {
    listStyle: "none",
    padding: 0,
    marginTop: "20px",
    width: "100%",
    flexGrow: 1, // Pushes items to the top
  },
  
  menuItem: {
    padding: "10px",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.3s",
    borderRadius: "5px",
  },
  
  content: {
    flex: 1,
    padding: "40px",
    marginLeft: "250px",
  },
  
};


export default Admin;
