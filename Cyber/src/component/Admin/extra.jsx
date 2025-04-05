import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import { UploadCloud } from "lucide-react"; // For an upload icon
import Navbar from "../Navbar";
import axios from "axios";



const HomePage = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
      copies: 1,
      printType: "Black & White",
      correction: false,
    });
  
    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
        setShowPopup(true);
      }
    };
  
    const handleUpload = async () => {
      if (!file) {
        setMessage("Please select a file first!");
        return;
      }
  
      const uploadData = new FormData();
      uploadData.append("document", file);
      uploadData.append("copies", formData.copies);
      uploadData.append("printType", formData.printType);
      uploadData.append("correction", formData.correction);
  
      try {
        const response = await axios.post("http://localhost:7002/api/insert", uploadData, {
          headers: { "Content-Type": "multipart/form-data" },
       
          
        });
        console.log(uploadData,"uploaded");
        
        setMessage(response.data.message);
        setShowPopup(false);
        setFile(null);
      } catch (error) {
        setMessage("File upload failed!");
      }
    };
  

  return (
    <>
      <GlobalStyle /> {/* Apply global background color */}
      <Navbar />
      <Container>
        <HeroSection>
          <HeroContent>
            <h1>
              <br /> <span>Cyber Solution</span> <br /> A Mint of Creativity
            </h1>
            <p>Find All Kind of Solutions</p>
          </HeroContent>
          <HeroImage>
            <img
              src="https://media.istockphoto.com/id/1354898581/photo/shot-of-a-young-businessman-using-a-laptop-in-a-modern-office.jpg?s=612x612&w=0&k=20&c=dDDNcvIoG-4VdO01ZlENqODBoNocT434vIFp0duuTZM="
              alt="Hero"
            />
          </HeroImage>
        </HeroSection>

        <Heading>Print Out</Heading>

        {/* Upload Document Section */}
        <UploadSection>
          <UploadLabel htmlFor="file-upload">
            <UploadCloud size={40} />
            <p>Click or Drag & Drop to Upload</p>
            <input
              type="file"
              id="file-upload"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={handleFileChange}
            />
          </UploadLabel>
          {file && <FilePreview>📄 {file.name}</FilePreview>}
          {showPopup && (
        <PopupOverlay>
          <Popup>
            <h3>Print Options</h3>
            <label>
              Number of Copies:
              <input
                type="number"
                min="1"
                value={formData.copies}
                onChange={(e) => setFormData({ ...formData, copies: e.target.value })}
              />
            </label>
            
            <label>
              Print Type:
              <select
                value={formData.printType}
                onChange={(e) => setFormData({ ...formData, printType: e.target.value })}
              >
                <option value="Black & White">Black & White</option>
                <option value="Color">Color</option>
              </select>
            </label>
            <label>
              Correction Needed:
              <input
                type="checkbox"
                checked={formData.correction}
                onChange={(e) => setFormData({ ...formData, correction: e.target.checked })}
              />
            </label>
            <PopupActions>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
              <button onClick={handleUpload}>Confirm & Upload</button>
            </PopupActions>
          </Popup>
        </PopupOverlay>
      )}

      {message && <Message>{message}</Message>}
        </UploadSection>

        <NavButtons>
          <Link to="/Main">
            <button>MAIN</button>
          </Link>
          <Link to="/Services">
            <button>SERVICES</button>
          </Link>
          <Link to="/Admin">
            <button>Dashboard</button>
          </Link>
        </NavButtons>
      </Container>
    </>
  );
};

export default HomePage;

// ✅ Global Styles to ensure full-page background consistency
const GlobalStyle = createGlobalStyle`
  body, html {
    background-color: #f6faff;
    margin: 0;
    padding: 0;
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  font-size: 2rem;
  color: #333;
  padding: 20px;
`;

const HeroSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  height: 80vh;
  padding: 50px;
  width: 100%;
`;

const HeroContent = styled.div`
  max-width: 600px;

  h1 {
    font-size: 5rem;
    font-weight: bold;
    color: #1f1f1f;
  }

  h1 span {
    color: #4c5fd5;
  }

  p {
    font-size: 1.2rem;
    color: #555;
    margin-top: 10px;
  }
`;

const HeroImage = styled.div`
  img {
    width: 100%;
    max-width: 500px;
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const Heading = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-top: 20px;
`;

// ✅ Upload Document Section Styling
const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 60%;
  margin-top: 20px;
`;

const UploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #eef5ff;
  padding: 30px;
  border: 2px dashed #4c5fd5;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  width: 100%;

  p {
    color: #4c5fd5;
    font-weight: bold;
    margin-top: 10px;
  }

  input {
    display: none;
  }

  &:hover {
    background: #dde8ff;
  }
`;

const FilePreview = styled.p`
  margin-top: 10px;
  font-size: 1rem;
  color: #333;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;

  button {
    background: #4c5fd5;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1.2rem;
    cursor: pointer;
    border-radius: 10px;
    transition: 0.3s;

    &:hover {
      background: #3a4bbd;
    }
  }
`;


const Message = styled.p`
  margin-top: 10px;
  color: green;
  font-size: 1rem;
`;

// Popup Styling
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Popup = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 10px;
  }

  label {
    display: block;
    margin-top: 10px;
    font-size: 1rem;
  }

  input,
  select {
    width: 100%;
    padding: 5px;
    margin-top: 5px;
  }
`;

const PopupActions = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;

   button {
     padding: 8px 12px;
     border: none;
     cursor: pointer;
     font-size: 1rem;
     border-radius: 5px;
     transition: 0.3s;
   }

   button:first-child {
     background: #ccc;
   }

   button:last-child {
     background: #4c5fd5;
     color: white;
   }

   button:hover {
     opacity: 0.8;
   }
 `;
