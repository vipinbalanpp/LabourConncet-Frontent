import { Route, Routes, useLocation } from "react-router-dom";
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

function App() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.loading);
  useEffect(() => {
    dispatch(fetchUserData());
  }, []);
  const showNavbarAndFooter =
    location.pathname.startsWith("/user/") ||
    location.pathname.startsWith("/worker/") ||
    location.pathname.startsWith("/admin/") ||
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/worker-register")  || 
    location.pathname.startsWith("/user-register") 

      return (
    <div className="bg-white h-screen">
      {loading && <Loading />}

      {!showNavbarAndFooter && <Navbar />}
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/user-register" element={<ClientRegister />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/" element={<HomeRoute />} />
        <Route path="/find-worker" element={<WorkerListing />} />
        <Route path="/worker-register" element={<WorkerRegistration />} />
        <Route path="/workers-list/:serviceName" element={<WorkerListing />} />
        <Route path="/service-list" element={<ServiceListing />} />
        <Route path="/worker-details/:email" element={<WorkerDetails />} />
        <Route path="/user/messages" element={<MessagesOfUser />} />

        <Route
          path="/user/profile"
          element={<ProtectedRoute element={<Profile />} requiredRole="USER" />}
        />
        <Route
          path="/help-center"
          element={
            <ProtectedRoute element={<HelpCenter />} requiredRole="USER" />
          }
        />
        <Route
          path="/user/bookings"
          element={
            <ProtectedRoute element={<Bookings />} requiredRole="USER" />
          }
        />

        <Route
          path="admin"
          element={
            <ProtectedRoute element={<AdminSidebar />} requiredRole="ADMIN" />
          }
        >
          <Route
            path="dashboard"
            element={
              <ProtectedRoute
                element={<AdminDashboard />}
                requiredRole="ADMIN"
              />
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
              <ProtectedRoute
                element={<MessagesOfWorker />}
                requiredRole="WORKER"
              />
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
      </Routes>
      {!showNavbarAndFooter && <Footer />}
    </div>
  
  );
}

export default App;
