import React, { useState } from "react";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [notification, setNotification] = useState("");
  const [previewFile, setPreviewFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Handle File Upload
  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB",
      status: "Pending",
      preview: URL.createObjectURL(file), // Preview URL
      type: file.type,
    }));

    setFiles([...files, ...uploadedFiles]);
    showNotification("Files uploaded successfully!");
  };

  // Change File Status
  const updateStatus = (id, newStatus) => {
    setFiles(files.map(file => file.id === id ? { ...file, status: newStatus } : file));
  };

  // Delete File
  const deleteFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
    showNotification("File deleted!");
  };

  // Show Notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  // Open File Preview
  const openPreview = (file) => {
    setPreviewFile(file);
    setIsPreviewOpen(true);
  };

  // Close Preview Modal
  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewFile(null);
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Cybercafe</h2>
        <ul style={styles.menu}>
          <li style={styles.menuItem}>Dashboard</li>
          <li style={styles.menuItem}>My Documents</li>
          <li style={styles.menuItem}>Profile</li>
          <li style={styles.menuItem}>Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <h2 style={styles.heading}>Welcome to Your Dashboard</h2>

        {/* Notification */}
        {notification && <div style={styles.notification}>{notification}</div>}

        {/* File Upload Section */}
        <div style={styles.uploadSection}>
          <input type="file" multiple onChange={handleFileUpload} style={styles.fileInput} />
          <button style={styles.uploadButton}>Upload Files</button>
        </div>

        {/* Uploaded Files Table */}
        <table style={styles.table}>
  <thead>
    <tr>
      <th style={styles.th}>File Name</th>
      <th style={styles.th}>Size</th>
      <th style={styles.th}>Status</th>
      <th style={styles.th}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {files.map((file) => (
      <tr key={file.id} style={styles.tr} onMouseOver={(e) => e.currentTarget.style.background = "#f5f5f5"} onMouseOut={(e) => e.currentTarget.style.background = "white"}>
        <td style={styles.td}>{file.name}</td>
        <td style={styles.td}>{file.size}</td>
        <td style={styles.td}>
          <select value={file.status} onChange={(e) => updateStatus(file.id, e.target.value)} style={styles.statusDropdown}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </td>
        <td style={styles.td}>
          <button onClick={() => openPreview(file)} style={styles.eyeButton}>👁️</button>
          <a href={file.preview} download={file.name} style={styles.downloadButton}>📥</a>
          <button onClick={() => deleteFile(file.id)} style={styles.deleteButton}>❌</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>

      {/* File Preview Modal */}
      {isPreviewOpen && previewFile && (
        <div style={styles.previewOverlay} onClick={closePreview}>
          <div style={styles.previewModal} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={closePreview}>✖</button>
            <h3>{previewFile.name}</h3>
            {previewFile.type.startsWith("image/") ? (
              <img src={previewFile.preview} alt="Preview" style={styles.previewImage} />
            ) : previewFile.type === "application/pdf" ? (
              <iframe src={previewFile.preview} style={styles.previewIframe} title="PDF Preview"></iframe>
            ) : (
              <iframe src={previewFile.preview} style={styles.previewIframe} title="Text Preview"></iframe>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// 🎨 Inline Styles
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "#f8faff",
  },
  sidebar: {
    width: "250px",
    background: "#4c5fd5",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
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
  },
  content: {
    flex: 1,
    padding: "40px",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  notification: {
    background: "#4caf50",
    color: "white",
    padding: "10px",
    textAlign: "center",
    marginBottom: "10px",
    borderRadius: "5px",
  },
  uploadSection: {
    marginTop: "20px",
  },
  fileInput: {
    padding: "10px",
  },
  uploadButton: {
    marginLeft: "10px",
    padding: "10px",
    background: "#4c5fd5",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
    background: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  th: {
    background: "#4c5fd5",
    color: "white",
    padding: "10px",
    textAlign: "left",
    fontSize: "16px",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    fontSize: "14px",
  },
  tr: {
    transition: "0.2s",
  },
  trHover: {
    background: "#f5f5f5",
  },
  
  statusDropdown: {
    padding: "5px",
  },
  eyeButton: {
    background: "blue",
    color: "white",
    border: "none",
    cursor: "pointer",
    padding: "5px",
    marginRight: "5px",
  },
  downloadButton: {
    background: "green",
    color: "white",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    padding: "5px",
    marginRight: "5px",
    display: "inline-block",
  },
  deleteButton: {
    background: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
    padding: "5px",
  },
  previewOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  previewModal: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
    padding: "5px",
  },
  previewImage: {
    maxWidth: "400px",
    maxHeight: "400px",
  },
  previewIframe: {
    width: "100%",
    height: "400px",
    border: "none",
  },
  
};


export default Dashboard;
