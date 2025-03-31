import React from "react";
import { NavLink } from "react-router-dom";

const SignIn = () => {
  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.heading}>Welcome Back!</h2>
        <p style={styles.subtext}>Sign in to continue</p>

        <form>
          <div style={styles.inputGroup}>
            <input type="email" placeholder="Email Address" style={styles.input} required />
          </div>
          <div style={styles.inputGroup}>
            <input type="password" placeholder="Password" style={styles.input} required />
          </div>

          <button type="submit" style={styles.button}>Sign In</button>

          <p style={styles.signupLink}>
            Don't have an account? <NavLink to="/signup" style={styles.link}>Sign Up</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

// 🎨 Inline Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f8faff",
  },
  box: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#1f1f1f",
  },
  subtext: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "30px",
    border: "2px solid #ddd",
    outline: "none",
    fontSize: "1rem",
    transition: "0.3s",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "30px",
    border: "none",
    background: "#4c5fd5",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "0.3s",
  },
  buttonHover: {
    background: "#3a4cc3",
  },
  signupLink: {
    marginTop: "15px",
  },
  link: {
    color: "#4c5fd5",
    fontWeight: "bold",
    textDecoration: "none",
  },
};

export default SignIn;
