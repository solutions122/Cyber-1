import React, { useState } from "react";
import Resume  from './Service/Resume'
import Pan  from './Service/Pan'
import Police  from './Service/Police'
import Adhar  from './Service/Adhar'


const services = {
  "Resume Creation": <Resume />,
  "Adhar": <Adhar />,
  "Pan": <Pan />,
  "Police Verification": <Police />,
  
};

const CyberCafeServices = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Cybercafe Services</h2>
        <ul>
          {Object.keys(services).map((service, index) => (
            <li
              key={index}
              className={selectedService === service ? "active" : ""}
              onClick={() => setSelectedService(service)}
            >
              {service}
            </li>
          ))}
        </ul>
      </aside>

      {/* Content Section (Displays Selected Service) */}
      <main className="content">
        {selectedService ? (
          <div>
            <h2>{selectedService}</h2>
            {services[selectedService]}
          </div>
        ) : (
          <h2>Select a Service</h2>
        )}
      </main>
    </div>
  );
};

export default CyberCafeServices;

/* CSS (Styled inline for better readability) */
const styles = `
.container {
  display: flex;
  height: 100vh;
  background: #f8faff;
}
.sidebar {
  width: 250px;
  background: #4c5fd5;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.sidebar h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  padding: 10px;
  cursor: pointer;
  transition: background 0.3s;
}
.sidebar li.active, .sidebar li:hover {
  background: #3a4cb7;
}
.content {
  flex: 1;
  padding: 40px;
}
.upload-section {
  margin-top: 20px;
}
button {
  padding: 10px;
  background: #4c5fd5;
  color: white;
  border: none;
  cursor: pointer;
}
`;

// Append styles to document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
