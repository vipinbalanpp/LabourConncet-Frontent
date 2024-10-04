import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/public/Footer";
import WorkerRegistration from "./pages/worker/WorkerRegistration";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/public/Navbar";
import { useDispatch, useSelector } from "react-redux";
import WorkerListing from "./pages/user/WorkerListing";
import { useEffect } from "react";
import Bookings from "./pages/user/Bookings";
import { AppDispatch, RootState } from "./redux/store";
import { fetchUserData } from "./redux/actions/userActions";
import WorkerDashBoard from "./pages/worker/WorkerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersList from "./pages/admin/UsersList";
import WorkersList from "./pages/admin/WorkersList";
import LoginRoute from "./components/public/LoginRoute";
import ServiceList from "./pages/admin/ServiceList";
import ServiceListing from "./pages/user/ServiceListing";
import HomeRoute from "./components/worker/HomeRoute";
import ProtectedRoute from "./components/public/ProtectedRoute";
import WorkerDetails from "./pages/user/WorkerDetails";
import Profile from "./pages/user/Profile";
import WorkerProfile from "./pages/worker/WorkerProfile";
import MyBookings from "./pages/worker/MyBookings";
import HelpCenter from "./pages/user/HelpCenter";
import WHelpCenter from "./pages/worker/Help";
import Notifications from "./pages/worker/Notifications";
import WorkerSidebar from "./components/worker/WorkerSideBar";
import AdminSidebar from "./components/admin/AdminSidebar";
import Loading from "./components/public/Loading";
import About from "./pages/user/About";
import MessagesOfUser from "./pages/user/MessagesOfUser";
import MessagesOfWorker from "./pages/worker/MessagesOfWorker";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "./components/landing/ScrollToTop";
import UserRegister from "./pages/user/UserRegister";
import UserSidebar from "./components/user/UserSidebar";

function App() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.loading);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);
  useEffect(() => {
    dispatch(fetchUserData());
  }, []);
  const showNavbarAndFooter =
    location.pathname.startsWith("/user/") ||
    location.pathname.startsWith("/worker/") ||
    location.pathname.startsWith("/admin/") ||
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/worker-register") ||
    location.pathname.startsWith("/user-register");

  return (
    <div className="bg-white h-screen">
      {loading && <Loading />}

      {!showNavbarAndFooter && <Navbar />}
      <ScrollToTop />
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/" element={<HomeRoute />} />
        <Route path="/find-worker" element={<WorkerListing />} />
        <Route path="/worker-register" element={<WorkerRegistration />} />
        <Route path="/workers-list/:serviceName" element={<WorkerListing />} />
        <Route path="/service-list" element={<ServiceListing />} />
        <Route path="/worker-details/:email" element={<WorkerDetails />} />
        <Route
          path="help-center"
          element={
            <ProtectedRoute element={<HelpCenter />} requiredRole="USER" />
          }
        />

        {/* USER ROUTES */}

        <Route
          path="user"
          element={
            <ProtectedRoute element={<UserSidebar />} requiredRole="USER" />
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="messages" element={<MessagesOfUser />} />
        </Route>

        {/* ADMIN ROUTES  */}

        <Route path="admin"   element={
            <ProtectedRoute element={<AdminSidebar />} requiredRole="ADMIN" />
          }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users-list" element={<UsersList />} />
          <Route path="workers-list" element={<WorkersList />} />
          <Route path="services-list" element={<ServiceList />} />
        </Route>

        {/* WORKER ROUTES */}

        <Route
          path="worker"
          element={
            <ProtectedRoute element={<WorkerSidebar />} requiredRole="WORKER" />
          }
        >
          <Route
            path="dashboard"
            element={
           <WorkerDashBoard />}
            
          />
          <Route
            path="profile"
            element={
           <WorkerProfile />}
          
          />

          <Route
            path="bookings"
            element={
           <MyBookings />} 
          />
          <Route
            path="messages"
            element={
           <MessagesOfWorker />}
              
          />
          <Route
            path="help"
            element={
          <WHelpCenter />} 
          />
          <Route
            path="notifications"
            element={
          <Notifications />}
             
          />
        </Route>
      </Routes>

      {!showNavbarAndFooter && <Footer />}
    </div>
  );
}

export default App;
