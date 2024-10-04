import {
  faBell,
  faChartBar,
  faEnvelope,
  faHardHat,
  faQuestionCircle,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { logout } from "../../redux/reducers/user/UserSlice";
import Logo from "../public/Logo";
import { useEffect } from "react";
import { fetchUserData } from "../../redux/actions/userActions";

const WorkerSidebar = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); 
  };

  return (
    <div className="flex gap-x-10 bg-white">
      <div className="w-1/5 h-screen sticky top-0 2xl:pb-10 scrollbar-hidden overflow-auto bg-gray-100 shadow-lg">
      <div className="flex justify-center">
            <Logo color="black" />
          </div>        <div className="flex flex-col items-center mt-8">
          <div className="w-24 h-24 overflow-hidden rounded-full border-4 border-yellow-500">
            <img
              src={user?.profileImageUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4 text-center">
            <p className="text-xl font-semibold text-gray-800">
              {user?.fullName}
            </p>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
        <div className="px-5">
          <nav className="flex-grow mt-10">
            <ul className="space-y-4">
              <li>
                <NavLink
                  to="/worker/dashboard"
                  className={({ isActive }) =>
                    `flex items-center p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-yellow-500 text-white"
                        : "duration-300 hover:translate-x-3 bg-white text-gray-800"
                    }`
                  }
                >
                  <FontAwesomeIcon icon={faChartBar} className="mr-2" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/worker/profile"
                  className={({ isActive }) =>
                    `flex items-center p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-yellow-500 text-white"
                        : "duration-300 hover:translate-x-3 bg-white text-gray-800"
                    }`
                  }
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Personal Info
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/worker/bookings"
                  className={({ isActive }) =>
                    `flex items-center p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-yellow-500 text-white"
                        : "duration-300 hover:translate-x-3 bg-white text-gray-800"
                    }`
                  }
                >
                  <FontAwesomeIcon icon={faHardHat} className="mr-2" />
                  My Bookings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/worker/notifications"
                  className={({ isActive }) =>
                    `flex items-center p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-yellow-500 text-white"
                        : "duration-300 hover:translate-x-3 bg-white text-gray-800"
                    }`
                  }
                >
                  <FontAwesomeIcon icon={faBell} className="mr-2" />
                  Notifications
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/worker/messages"
                  className={({ isActive }) =>
                    `flex items-center p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-yellow-500 text-white"
                        : "duration-300 hover:translate-x-3 bg-white text-gray-800"
                    }`
                  }
                >
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  Messages
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/worker/help"
                  className={({ isActive }) =>
                    `flex items-center p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-yellow-500 text-white"
                        : "duration-300 hover:translate-x-3 bg-white text-gray-800"
                    }`
                  }
                >
                  <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
                  Help Center
                </NavLink>
              </li>
              <li>
                <div
                  className="flex items-center bg-white  hover:translate-x-3 p-4 rounded-xl cursor-pointer transition-all duration-300  text-gray-800"
                  onClick={handleLogout}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="w-4/5">
        <Outlet />
      </div>
    </div>
  );
};

export default WorkerSidebar;
