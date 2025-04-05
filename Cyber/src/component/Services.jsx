import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Resume from "./Service/Resume";
import Pan from "./Service/Pan";
import Police from "./Service/Police";
import Adhar from "./Service/Adhar";
import Board from "./Service/Board";
import PF from "./Service/PF";

const services = {
  Services: <Board />,
  "Resume Creation": <Resume />,
  Adhar: <Adhar />,
  Pan: <Pan />,
  "Police Verification": <Police />,
  PF: <PF />,
};

const Services = () => {
  const { service } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(service || "Services");

  useEffect(() => {
    if (!service || !services[service]) {
      navigate("/services/Services");
    } else {
      setActiveSection(service);
    }
  }, [service, navigate]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Cybercafe</h2>
        <ul style={styles.menu}>
          {Object.keys(services).map((key) => (
            <li
              key={key}
              style={{
                ...styles.menuItem,
                background: activeSection === key ? "#3949ab" : "transparent",
                color: activeSection === key ? "#fff" : "#ddd",
              }}
              onClick={() => navigate(`/services/${key}`)}
            >
              {key}
            </li>
          ))}
        </ul>
      </div>

      {/* Content Section */}
      <div style={styles.content}>{services[activeSection]}</div>
    </div>
  );
};

// Styles
const styles = {
  sidebar: {
    width: "250px",
    background: "#4c5fd5",
    color: "white",
    padding: "20px",
    position: "fixed",
    left: 0,
    top: 0,
    height: "100vh",
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
    marginLeft: "250px",
    padding: "40px",
    background: "#f0f2f5", // Full page background color except sidebar
  },
};

export default Services;
