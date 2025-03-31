import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar">
      <nav className="navbar-container">
        <NavLink to="/" className="logo">Logo</NavLink>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>About</NavLink>
          </li>
          <li>
            <NavLink to="/services" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Services</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Contact</NavLink>
          </li>
        </ul>
        <div className="nav-buttons">
          <NavLink to="/signin" className="signin-btn">Sign In</NavLink>
          <NavLink to="/signup" className="signup-btn">Sign Up</NavLink>
        </div>  
      </nav>
      
    </header>
  );
};

export default Navbar;
