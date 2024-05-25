import Navbar from "./components/Navbar";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import ClientRegister from "./pages/ClientRegister";
import WorkerListing from "./pages/WorkerListing";
import WorkerRegistration from "./pages/WorkerRegistration";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();
  const showNavbarAndFooter = location.pathname !== "/login" && location.pathname !== "/user-register"
  return (
    <div className="bg-white">
      {showNavbarAndFooter &&  <Navbar />}
     <Toaster/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/user-register" element={<ClientRegister/>}></Route>
        <Route path="/find-worker" element={<WorkerListing/>}></Route>
        <Route path="/worker-register" element={<WorkerRegistration/>}></Route>
      </Routes>
      
      {showNavbarAndFooter && <Footer/>}
    </div>
  );
}

export default App;
