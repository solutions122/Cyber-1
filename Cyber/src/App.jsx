import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import SignIn from "./component/Sign in";
import SignUp from "./component/Sign up";
import Main from "./component/Main";
import Services from "./component/Services";
import Resume from "./component/Service/Resume";
import Pan from "./component/Service/Pan";
import Police from "./component/Service/Police";
import Adhar from "./component/Service/Adhar";
import PF from "./component/Service/PF";
import Board from "./component/Service/Board";
import UploadDocument from "./component/UploadDocument";
import Dashboard from "./component/Admin/Dashboard";
import Ex from "./component/Admin/extra";
import Admin from "./component/Admin/Admin";

function App() {
  return (
    <main>
      <BrowserRouter>
        <div className="min-h-screen w-full flex items-center justify-center">
          <Routes>
            {/* Default Home Route */}
            <Route path="/" element={<Home />} />

            {/* Authentication */}
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />

            {/* Main Pages */}
            <Route path="/Main" element={<Main />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Ex" element={<Ex />} />
            <Route path="/Admin" element={<Admin />} />

            {/* CyberCafe Services with Nested Routing */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/:service" element={<Services />} />

            {/* Individual Service Pages */}
            <Route path="/Resume" element={<Resume />} />
            <Route path="/Adhar" element={<Adhar />} />
            <Route path="/Pan" element={<Pan />} />
            <Route path="/Police" element={<Police />} />
            <Route path="/PF" element={<PF />} />
            <Route path="/Board" element={<Board />} />

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  );
}

export default App;
