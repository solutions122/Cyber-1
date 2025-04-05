import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [newFiles, setNewFiles] = useState(new Set()); // Track new files
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    // Load previously viewed files from localStorage
    const storedViewedFiles = JSON.parse(localStorage.getItem("viewedFiles")) || [];
    setNewFiles(new Set(storedViewedFiles));
  }, []);
  
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:7002/api/view");
        let fetchedFiles = response.data;

        fetchedFiles.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

        const storedViewedFiles = JSON.parse(localStorage.getItem("viewedFiles")) || [];
        const viewedFileSet = new Set(storedViewedFiles);

        setFiles(fetchedFiles);

        setNewFiles((prevNewFiles) => {
          const updatedNewFiles = new Set();
          fetchedFiles.forEach((file) => {
            if (!viewedFileSet.has(file._id)) {
              updatedNewFiles.add(file._id);
            }
          });

          // Show alert if new files are detected
          if (updatedNewFiles.size > prevNewFiles.size) {
            setAlertMessage("New document uploaded!");
            setTimeout(() => setAlertMessage(""), 3000); // Hide alert after 3 sec
          }

          return updatedNewFiles;
        });
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
    const interval = setInterval(fetchFiles, 3000); // Poll every 3s

    return () => clearInterval(interval);
  }, []);
  
  const openPreview = (file) => {
    setPreviewFile(file);
    setIsPreviewOpen(true);
  
    setNewFiles((prev) => {
      const updated = new Set(prev);
      updated.delete(file._id);
  
      // Save updated viewed files to localStorage
      const storedViewedFiles = JSON.parse(localStorage.getItem("viewedFiles")) || [];
      localStorage.setItem("viewedFiles", JSON.stringify([...storedViewedFiles, file._id]));
  
      return updated;
    });
  };
  


  // Close Preview Modal
  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewFile(null);
  };

  // Handle File Deletion
  const handleDelete = async (fileId) => {
    try {
      const response = await axios.delete(`http://localhost:7002/api/delete/${fileId}`);
      if (response.data.success) {
        alert("File deleted successfully!");
        setFiles(prevFiles => prevFiles.filter(file => file._id !== fileId));
      } else {
        alert("Failed to delete file.");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("An error occurred while deleting the file.");
    }
  };

  const markAsViewed = async (id) => {
        await fetch(`http://localhost:7002/api/mark-viewed/${id}`, { method: "PUT" });
        setFiles(files.map(file => file._id === id ? { ...file, isNew: false } : file));
    };

  return (
    <div style={styles.container}>
      

      <div style={styles.content}>
      {alertMessage && <div style={styles.alert}>{alertMessage}</div>}
        <h2 style={styles.heading}>Welcome to Your Dashboard</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>File Name</th>
              <th style={styles.th}>Copies</th>
              <th style={styles.th}>Print Type</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr
                key={index}
                style={{
                  ...styles.tr,
                  backgroundColor: newFiles.has(file._id) ? "#ffdddd" : "white",
                }}
              >
                <td style={styles.td}>
                  {file.fileUrl ? file.fileUrl.split('/').pop() : "Unknown"}
                  {newFiles.has(file._id) && 
                    <span style={styles.redDot}></span>
                  }
                </td>
                <td style={styles.td}>{file.copies || "N/A"}</td>
                <td style={styles.td}>{file.printType || "N/A"}</td>
                <td style={styles.td}>
                {file.fileUrl && (
  <div style={{ display: "flex", gap: "8px" }}>
    <button 
      onClick={() => openPreview(file)} 
      style={{
        background: "#4c5fd5", 
        color: "white", 
        border: "none", 
        borderRadius: "8px", 
        padding: "8px 12px", 
        cursor: "pointer", 
        display: "flex", 
        alignItems: "center",
        gap: "5px",
        transition: "0.3s"
      }}
      onMouseOver={(e) => e.target.style.background = "#3a4bb7"}
      onMouseOut={(e) => e.target.style.background = "#4c5fd5"}
    >
      👁️ View
    </button>

    <a 
      href={file.fileUrl} 
      download 
      style={{
        background: "#28a745", 
        color: "white", 
        textDecoration: "none", 
        borderRadius: "8px", 
        padding: "8px 12px", 
        display: "flex", 
        alignItems: "center", 
        gap: "5px",
        transition: "0.3s"
      }}
      onMouseOver={(e) => e.target.style.background = "#218838"}
      onMouseOut={(e) => e.target.style.background = "#28a745"}
    >
      📥 Download
    </a>

    <button 
      onClick={() => handleDelete(file._id)} 
      style={{
        background: "#dc3545", 
        color: "white", 
        border: "none", 
        borderRadius: "8px", 
        padding: "8px 12px", 
        cursor: "pointer", 
        display: "flex", 
        alignItems: "center",
        gap: "5px",
        transition: "0.3s"
      }}
      onMouseOver={(e) => e.target.style.background = "#c82333"}
      onMouseOut={(e) => e.target.style.background = "#dc3545"}
    >
      🗑️ Delete
    </button>
  </div>
)}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isPreviewOpen && previewFile && (
        <div style={styles.previewOverlay} onClick={closePreview}>
          <div style={styles.previewModal} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={closePreview}>✖</button>
            <h3>{previewFile.fileUrl.split('/').pop()}</h3>
            {previewFile.fileUrl.endsWith(".png") || previewFile.fileUrl.endsWith(".jpg") || previewFile.fileUrl.endsWith(".jpeg") ? (
              <img src={previewFile.fileUrl} alt="Preview" style={styles.previewImage} />
            ) : previewFile.fileUrl.endsWith(".pdf") ? (
              <iframe src={previewFile.fileUrl} style={styles.previewIframe} title="PDF Preview"></iframe>
            ) : (
              <p>Preview not available for this file type.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  alert: {
    position: "absolute",
    top: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "green",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "14px",
    transition: "opacity 0.5s",
  },  
  container: { display: "flex", height: "100vh", background: "#f8faff" },
  sidebar: { width: "250px", background: "#4c5fd5", color: "white", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" },
  logo: { fontSize: "1.5rem", fontWeight: "bold" },
  menu: { listStyle: "none", padding: 0, marginTop: "20px", width: "100%" },
  menuItem: { padding: "10px", textAlign: "center", cursor: "pointer", transition: "0.3s" },
  content: { flex: 1, padding: "40px" },
  heading: { fontSize: "2rem", fontWeight: "bold" },
  table: { width: "100%", marginTop: "20px", borderCollapse: "collapse", background: "white", borderRadius: "8px", overflow: "hidden", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" },
  th: { background: "#4c5fd5", color: "white", padding: "10px", textAlign: "left", fontSize: "16px" },
  td: { padding: "10px", borderBottom: "1px solid #ddd", fontSize: "14px", position: "relative" },
  tr: { transition: "0.2s" },
  
  redDot: { width: "10px", height: "10px", backgroundColor: "red", borderRadius: "50%", display: "inline-block", marginLeft: "10px" },
  previewOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" },
  previewModal: { background: "white", padding: "20px", borderRadius: "8px", position: "relative" },
  closeButton: { position: "absolute", top: "10px", right: "10px", background: "red", color: "white", border: "none", cursor: "pointer", padding: "5px" },
  previewImage: { maxWidth: "400px", maxHeight: "400px" },
  previewIframe: { width: "100%", height: "400px", border: "none" },
};

export default Dashboard;