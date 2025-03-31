import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { About, Contact, Home, Pricing } from './components/pages'
import Navbar from './component/Navbar'; 
import Home from './component/Home'
import SignIn  from './component/Sign in'
import SignUp  from './component/Sign up'
import Main  from './component/Main'
import Services  from './component/Services'
import Resume  from './component/Service/Resume'
import Pan  from './component/Service/Pan'
import Police  from './component/Service/Police'
import Adhar  from './component/Service/Adhar'

function App() {
  return (
    <main>
      <BrowserRouter>

        <div className='min-h-screen w-full flex items-center justify-center'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/SignUp' element={<SignUp />} />
            <Route path='/SignIn' element={<SignIn />} />
            <Route path='/Main' element={<Main />} />
            <Route path='/Services' element={<Services />} />
            <Route path='/Resume' element={<Resume />} />
            <Route path='/Adhar' element={<Adhar />} />
            <Route path='/Pan' element={<Pan />} />
            <Route path='/Police' element={<Police />} />
            {/* <Route path='/contact' element={<Contact />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  )
}

export default App

// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./component/Navbar";
// import Home from "./component/Home";
// import SignIn from "./component/Sign in";
// import SignUp from "./component/Sign up";
// import Main from "./component/Main";

// function App() {
//   return (
//     <BrowserRouter>
//       <ConditionalNavbar /> {/* Navbar will be conditionally rendered */}
//       <div className="min-h-screen w-full flex items-center justify-center">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/SignUp" element={<SignUp />} />
//           <Route path="/SignIn" element={<SignIn />} />
//           <Route path="/Main" element={<Main />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// // ✅ Hide Navbar on Main Page, Show on Others
// const ConditionalNavbar = () => {
//   const location = useLocation();
//   return location.pathname !== "/Main" ? <Navbar /> : null;
// };

// export default App;
