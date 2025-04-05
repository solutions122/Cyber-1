import React from "react";

const Resume = () => {
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="heading">Resume</div>
          <form className="form">
          <input required className="input" type="text" name="fullName" placeholder="Full Name" />
            <input required className="input" type="email" name="email" placeholder="Email" />
            <input required className="input" type="tel" name="phone" placeholder="Phone Number" />
            <input required className="input" type="text" name="address" placeholder="Address" />
            <textarea required className="input" rows="2" name="skills" placeholder="skills"></textarea>
            <textarea required className="input" rows="2" name="education" placeholder="Education (e.g. B.Sc. in CS"></textarea>
            <textarea required className="input" rows="2" name="experience" placeholder="experience"></textarea>
            
            <textarea required className="input" rows="2" name="objective" placeholder="Career Objective"></textarea><br />
            <label htmlFor="resumeFile" className="upload-label">Upload Resume Format (PDF/DOCX)</label>
            <input
              required
              className="input"
              type="file"
              name="resumeFile"
              id="resumeFile"
              accept=".pdf, .doc, .docx"
            />
            <input className="login-button" type="submit" value="Submit" />
          </form>
          
          
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        body, html, #root {
          margin: 0;
          padding: 0;
          height: 100%;
        }

        .wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 150vh;
          background: #f0f2f5;
        }

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 600px; /* 🔥 Fat form */
          background: linear-gradient(0deg, rgb(255, 255, 255), rgb(244, 247, 251));
          border-radius: 40px;
          padding: 40px 60px;
          border: 5px solid white;
          box-shadow: rgba(133, 189, 215, 0.878) 0px 30px 30px -20px;
        }

        .heading {
          text-align: center;
          font-weight: 900;
          font-size: 32px;
          color: rgb(16, 137, 211);
          margin-bottom: 20px;
        }

        .form {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .input {
          width: 100%;
          background: white;
          border: none;
          padding: 18px 24px;
          border-radius: 20px;
          margin-top: 15px;
          font-size: 16px;
          box-shadow: #cff0ff 0px 10px 10px -5px;
        }

        .input:focus {
          outline: none;
          border-inline: 2px solid #12B1D1;
        }

        .forgot-password {
          width: 100%;
          margin-top: 10px;
        }

        .forgot-password a {
          font-size: 12px;
          color: #0099ff;
          text-decoration: none;
        }

        .login-button {
          width: 100%;
          font-weight: bold;
          background: linear-gradient(45deg, rgb(16, 137, 211), rgb(18, 177, 209));
          color: white;
          padding: 15px;
          margin-top: 20px;
          border-radius: 20px;
          border: none;
          cursor: pointer;
        }

        .social-account-container {
          margin-top: 30px;
          text-align: center;
          width: 100%;
        }

        .title {
          font-size: 12px;
          color: rgb(170, 170, 170);
        }

        .social-accounts {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 10px;
        }

        .social-button {
          background: linear-gradient(45deg, rgb(0, 0, 0), rgb(112, 112, 112));
          border: 5px solid white;
          padding: 5px;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: grid;
          place-content: center;
          transition: transform 0.2s ease-in-out;
        }

        .social-button:hover {
          transform: scale(1.2);
        }

        .svg {
          fill: white;
        }

        .agreement {
          display: block;
          text-align: center;
          margin-top: 20px;
        }

        .agreement a {
          text-decoration: none;
          color: #0099ff;
          font-size: 10px;
        }
      `}</style>
    </>
  );
};

export default Resume;
