import React from "react";
import './Home.css';
import { Link } from "react-router-dom";
import Navbar from '../component/Navbar'; 

const HomePage = () => {
  return (
    <>
    
    <Navbar/>
    
    <div style={{ 
      backgroundColor: "#f6faff", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh", 
      fontSize: "2rem", 
      color: "#333" 
    }}>


      <section className="hero">
      <div className="hero-content">
        <h1><br /> <span>Cyber Solution</span> <br /> A Mint of Creativity</h1>
        <p>
         Find All Kind of Solutions
        </p>
      </div>
    </section>

      <div className="hero-image">
      <img src="https://media.istockphoto.com/id/1354898581/photo/shot-of-a-young-businessman-using-a-laptop-in-a-modern-office.jpg?s=612x612&w=0&k=20&c=dDDNcvIoG-4VdO01ZlENqODBoNocT434vIFp0duuTZM=" alt="Hero Woman" />
    </div>

    <div className="nav-buttons">
         <Link to='/Main'> <button>MAiN</button></Link>
        </div>  
        <div className="nav-buttons">
         <Link to='/Services'> <button>Services</button></Link>
        </div>  
    </div>
    </>
  );
};

export default HomePage;
