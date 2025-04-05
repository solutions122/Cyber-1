// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const [files, setFiles] = useState([]);
//   const [notification, setNotification] = useState("");
//   const [previewFile, setPreviewFile] = useState(null);
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);

//   // Fetch Files from the backend
//   useEffect(() => {
//     axios.get("http://localhost:7002/api/view")
//       .then(response => setFiles(response.data))
//       .catch(error => console.error("Error fetching files:", error));
//   }, []);

//   // Open File Preview
//   const openPreview = (file) => {
//     setPreviewFile(file);
//     setIsPreviewOpen(true);
//   };

//   // Close Preview Modal
//   const closePreview = () => {
//     setIsPreviewOpen(false);
//     setPreviewFile(null);
//   };

//   // Handle File Deletion
//   const handleDelete = async (fileId) => {
//     try {
//       const response = await axios.delete(`http://localhost:7002/api/delete/${fileId}`);
//       if (response.data.success) {
//         alert("File deleted successfully!");
  
//         // Fetch updated list of files after deletion
//         const updatedFilesResponse = await axios.get("http://localhost:7002/api/view");
//         setFiles(updatedFilesResponse.data);  // Update the files with the latest data
//       } else {
//         alert("Failed to delete file.");
//       }
//     } catch (error) {
//       console.error("Error deleting file:", error);
//       alert("An error occurred while deleting the file.");
//     }
//   };
  

//   return (
//     <div style={styles.container}>
//       {/* Sidebar */}
//       <div style={styles.sidebar}>
//         <h2 style={styles.logo}>Cybercafe</h2>
//         <ul style={styles.menu}>
//           <li style={styles.menuItem}>Dashboard</li>
//           <li style={styles.menuItem}>My Documents</li>
//           <li style={styles.menuItem}>Profile</li>
//           <li style={styles.menuItem}>Logout</li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div style={styles.content}>
//         <h2 style={styles.heading}>Welcome to Your Dashboard</h2>

//         {/* Notification */}
//         {notification && <div style={styles.notification}>{notification}</div>}

//         {/* Uploaded Files Table */}
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>File Name</th>
//               <th style={styles.th}>Copies</th>
//               <th style={styles.th}>Print Type</th>
//               <th style={styles.th}>Correction</th>
//               <th style={styles.th}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {files.map((file, index) => (
//               <tr key={index} style={styles.tr}>
//                 <td style={styles.td}>{file.fileUrl ? file.fileUrl.split('/').pop() : "Unknown"}</td>
//                 <td style={styles.td}>{file.copies || "N/A"}</td>
//                 <td style={styles.td}>{file.printType || "N/A"}</td>
//                 <td style={styles.td}>{file.correction ? "Yes" : "No"}</td>
//                 <td style={styles.td}>
//                   {file.fileUrl && (
//                     <>
//                       <button onClick={() => openPreview(file)} style={styles.eyeButton}>👁️ View</button>
//                       <a href={file.fileUrl} download style={styles.downloadButton}>📥 Download</a>
//                       <button onClick={() => handleDelete(file._id)} style={styles.deleteButton}>🗑️ Delete</button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* File Preview Modal */}
//       {isPreviewOpen && previewFile && (
//         <div style={styles.previewOverlay} onClick={closePreview}>
//           <div style={styles.previewModal} onClick={(e) => e.stopPropagation()}>
//             <button style={styles.closeButton} onClick={closePreview}>✖</button>
//             <h3>{previewFile.fileUrl.split('/').pop()}</h3>
//             {previewFile.fileUrl.endsWith(".png") || previewFile.fileUrl.endsWith(".jpg") || previewFile.fileUrl.endsWith(".jpeg") ? (
//               <img src={previewFile.fileUrl} alt="Preview" style={styles.previewImage} />
//             ) : previewFile.fileUrl.endsWith(".pdf") ? (
//               <iframe src={previewFile.fileUrl} style={styles.previewIframe} title="PDF Preview"></iframe>
//             ) : (
//               <p>Preview not available for this file type.</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Styles
// const styles = {
//   container: { display: "flex", height: "100vh", background: "#f8faff" },
//   sidebar: { width: "250px", background: "#4c5fd5", color: "white", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" },
//   logo: { fontSize: "1.5rem", fontWeight: "bold" },
//   menu: { listStyle: "none", padding: 0, marginTop: "20px", width: "100%" },
//   menuItem: { padding: "10px", textAlign: "center", cursor: "pointer", transition: "0.3s" },
//   content: { flex: 1, padding: "40px" },
//   heading: { fontSize: "2rem", fontWeight: "bold" },
//   notification: { background: "#4caf50", color: "white", padding: "10px", textAlign: "center", marginBottom: "10px", borderRadius: "5px" },
//   table: { width: "100%", marginTop: "20px", borderCollapse: "collapse", background: "white", borderRadius: "8px", overflow: "hidden", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" },
//   th: { background: "#4c5fd5", color: "white", padding: "10px", textAlign: "left", fontSize: "16px" },
//   td: { padding: "10px", borderBottom: "1px solid #ddd", fontSize: "14px" },
//   tr: { transition: "0.2s" },
//   eyeButton: { background: "blue", color: "white", border: "none", cursor: "pointer", padding: "5px", marginRight: "5px" },
//   downloadButton: { background: "green", color: "white", textDecoration: "none", border: "none", cursor: "pointer", padding: "5px", marginRight: "5px", display: "inline-block" },
//   deleteButton: { background: "red", color: "white", border: "none", cursor: "pointer", padding: "5px" },
//   previewOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" },
//   previewModal: { background: "white", padding: "20px", borderRadius: "8px", position: "relative" },
//   closeButton: { position: "absolute", top: "10px", right: "10px", background: "red", color: "white", border: "none", cursor: "pointer", padding: "5px" },
//   previewImage: { maxWidth: "400px", maxHeight: "400px" },
//   previewIframe: { width: "100%", height: "400px", border: "none" },
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [newFiles, setNewFiles] = useState(new Set()); // Track new files

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
  
        // Sort files by upload time (if available) or reverse order
        fetchedFiles.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
  
        // Load previously viewed files from localStorage
        const storedViewedFiles = JSON.parse(localStorage.getItem("viewedFiles")) || [];
        const viewedFileSet = new Set(storedViewedFiles);
  
        setFiles(fetchedFiles); // Update file list
  
        setNewFiles(() => {
          const updatedNewFiles = new Set();
          fetchedFiles.forEach((file) => {
            if (!viewedFileSet.has(file._id)) {
              updatedNewFiles.add(file._id);
            }
          });
          return updatedNewFiles;
        });
  
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
  
    fetchFiles();
    const interval = setInterval(fetchFiles, 10000); // Poll every 10s
  
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
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Cybercafe</h2>
        <ul style={styles.menu}>
          <li style={styles.menuItem}>Dashboard</li>
          <li style={styles.menuItem}>My Documents</li>
          <li style={styles.menuItem}>Profile</li>
          <li style={styles.menuItem}>Logout</li>
        </ul>
      </div>

      <div style={styles.content}>
        <h2 style={styles.heading}>Welcome to Your Dashboard</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>File Name</th>
              <th style={styles.th}>Copies</th>
              <th style={styles.th}>Print Type</th>
              <th style={styles.th}>Correction</th>
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
                <td style={styles.td}>{file.correction ? "Yes" : "No"}</td>
                <td style={styles.td}>
                  {file.fileUrl && (
                    <>
                      <button onClick={() => openPreview(file)} style={styles.eyeButton}>👁️ View</button>
                      <a href={file.fileUrl} download style={styles.downloadButton}>📥 Download</a>
                      <button onClick={() => handleDelete(file._id)} style={styles.deleteButton}>🗑️ Delete</button>
                    </>
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
  eyeButton: { background: "blue", color: "white", border: "none", cursor: "pointer", padding: "5px", marginRight: "5px" },
  downloadButton: { background: "green", color: "white", textDecoration: "none", border: "none", cursor: "pointer", padding: "5px", marginRight: "5px", display: "inline-block" },
  deleteButton: { background: "red", color: "white", border: "none", cursor: "pointer", padding: "5px" },
  redDot: { width: "10px", height: "10px", backgroundColor: "red", borderRadius: "50%", display: "inline-block", marginLeft: "10px" },
  previewOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" },
  previewModal: { background: "white", padding: "20px", borderRadius: "8px", position: "relative" },
  closeButton: { position: "absolute", top: "10px", right: "10px", background: "red", color: "white", border: "none", cursor: "pointer", padding: "5px" },
  previewImage: { maxWidth: "400px", maxHeight: "400px" },
  previewIframe: { width: "100%", height: "400px", border: "none" },
};

export default Dashboard;
