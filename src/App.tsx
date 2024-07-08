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
import Bookings from "./pages/user/Bookings";
import { AppDispatch, RootState } from "./redux/store";
import { fetchUserData, getAllBookings } from "./redux/actions/userActions";
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
import {
  getAllServices,
  getAllUsers,
  getAllWorkers,
} from "./redux/actions/adminActions";
import MyBookings from "./pages/worker/MyBookings";
import HelpCenter from "./pages/user/HelpCenter";
import WHelpCenter from "./pages/worker/Help";
import Messages from "./pages/worker/Messages";
import Notifications from "./pages/worker/Notifications";
import WorkerSidebar from "./components/worker/WorkerSideBar";
import AdminSidebar from "./components/admin/AdminSidebar";
import { getServers } from "dns";
import Loading from "./components/public/Loading";

function App() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.user.loading);

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(getAllWorkers({pageNumber:0}));
    dispatch(getAllServices())
    dispatch(getAllBookings());
  }, []);
  const showNavbarAndFooter =
    location.pathname.startsWith("/user/") ||
    location.pathname === "/" ||
    location.pathname === "/find-worker";
  return (
    <div className="bg-white h-screen">
      {loading && (
        <Loading/>
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
        <Route path="/worker-details/:email" element={<WorkerDetails />} />
        <Route 
        path="admin"
        element={<ProtectedRoute element={<AdminSidebar/>} requiredRole="ADMIN"/>}
         >
        <Route
          path="dashboard"
          element={
            <ProtectedRoute element={<AdminDashboard />} requiredRole="ADMIN" />
          }
        />
        <Route
          path="users-list"
          element={
            <ProtectedRoute element={<UsersList />} requiredRole="ADMIN" />
          }
        />
        <Route
          path="workers-list"
          element={
            <ProtectedRoute element={<WorkersList />} requiredRole="ADMIN" />
          }
        />
        <Route
          path="services-list"
          element={
            <ProtectedRoute element={<ServiceList />} requiredRole="ADMIN" />
          }
        />
        </Route>
        <Route
          path="worker"
          element={
            <ProtectedRoute element={<WorkerSidebar />} requiredRole="WORKER" />
          }
        >
          <Route
            path="dashboard"
            element={
              <ProtectedRoute
                element={<WorkerDashBoard />}
                requiredRole="WORKER"
              />
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute
                element={<WorkerProfile />}
                requiredRole="WORKER"
              />
            }
          />

          <Route
            path="bookings"
            element={
              <ProtectedRoute element={<MyBookings />} requiredRole="WORKER" />
            }
          />
          <Route
            path="messages"
            element={
              <ProtectedRoute element={<Messages />} requiredRole="WORKER" />
            }
          />
          <Route
            path="help"
            element={
              <ProtectedRoute element={<WHelpCenter />} requiredRole="WORKER" />
            }
          />
          <Route
            path="notifications"
            element={
              <ProtectedRoute
                element={<Notifications />}
                requiredRole="WORKER"
              />
            }
          />
        </Route>
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} requiredRole="USER" />}
        />
        <Route
          path="/help-center"
          element={
            <ProtectedRoute element={<HelpCenter />} requiredRole="USER" />
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute element={<Bookings />} requiredRole="USER" />
          }
        />
      </Routes>
      {showNavbarAndFooter && <Footer />}
    </div>
  );
}

export default App;
