import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Footer from "./components/public/Footer";
import ClientRegister from "./pages/user/ClientRegister";
import WorkerRegistration from "./pages/worker/WorkerRegistration";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/public/Navbar";
import { useDispatch, useSelector } from "react-redux";
import WorkerListing from "./pages/user/WorkerListing";
import { useEffect } from "react";
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
import WorkerListTable from "./components/admin/WorkerListTable";
import WorkerDetails from "./pages/user/WorkerDetails";
import Profile from "./pages/user/Profile";

function App() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.user.loading);
  const user = useSelector((state: RootState) => state.user.user);
  
  useEffect(() => {
    dispatch(fetchUserData());
  }, []);
  const showNavbarAndFooter =
    location.pathname.startsWith("/user/") ||
    location.pathname === "/" ||
    location.pathname === "/find-worker";
  return (
    <div className="bg-white">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <span className="loading absolute top-1/2 right-1/2  text-yellow-500 loading-spinner loading-lg"></span>
        </div>
      )}

      {showNavbarAndFooter && <Navbar />}
      <Toaster />
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/user-register" element={<ClientRegister />} />
        <Route path="/find-worker" element={<WorkerListing />} />
        <Route path="/worker-register" element={<WorkerRegistration />} />
        <Route path="/workers-list" element={<WorkerListing />} />
        <Route path="/service-list" element={<ServiceListing />} />
        <Route path="/worker-details" element={<WorkerDetails />} />
        <Route
          path="/worker/dashboard"
          element={
            <ProtectedRoute
              element={<WorkerDashBoard />}
              requiredRole="WORKER"
            />
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute element={<AdminDashboard />} requiredRole="ADMIN" />
          }
        />
        <Route
          path="/admin/users-list"
          element={
            <ProtectedRoute element={<UsersList />} requiredRole="ADMIN" />
          }
        />
        <Route
          path="/admin/workers-list"
          element={
            <ProtectedRoute element={<WorkersList />} requiredRole="ADMIN" />
          }
        />
        <Route
          path="/admin/services-list"
          element={
            <ProtectedRoute element={<ServiceList />} requiredRole="ADMIN" />
          }
        />
         <Route
          path="/profile"
          element={
            <ProtectedRoute element={<Profile />} requiredRole="USER" />
          }
        />
      </Routes>

      {showNavbarAndFooter && <Footer />}
    </div>
  );
}

export default App;
