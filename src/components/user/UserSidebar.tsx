import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChartBar,
  faEnvelope,
  faHardHat,
  faHeart,
  faQuestionCircle,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducers/user/UserSlice";
import Logo from "../public/Logo";
import { FaUser } from "react-icons/fa";
import { AppDispatch, RootState } from "../../redux/store";

const UserSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  const handleclick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex bg-white">
      <div className="w-72 h-screen bg-white sticky top-0 overflow-y-auto  shadow-lg">
        <div className="bg-gray-100 h-full py-5">
          <div className="flex justify-center">
            <Logo color="black" />
          </div>
          <div className="flex flex-col items-center mt-8">
            <div className="w-24 h-24 overflow-hidden rounded-full border-4 border-gray-200">
              {user?.profileImageUrl ? (
                <img
                  src={user?.profileImageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUser className="w-full p-2 h-full text-gray-400" />
              )}
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
                <NavLink
                  to="/user/profile"
                  className={({ isActive }) =>
                    `flex items-center p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-yellow-500 text-white"
                        : "duration-300 hover:translate-x-3 bg-white text-gray-800"
                    }`
                  }
                  onClick={() => handleclick("/user/profile")}
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Personal Info
                </NavLink>
                <NavLink
                  to="/user/notifications"
                  className={({ isActive }) =>
                    `flex items-center p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-yellow-400 text-white"
                        : "duration-300 hover:translate-x-3 bg-white text-gray-800"
                    }`
                  }
                  onClick={() => handleclick("/user/notifications")}
                >
                  <FontAwesomeIcon icon={faBell} className="mr-2" />
                  Notifications
                </NavLink>
                <NavLink
                  to="/user/bookings"
                  className={({ isActive }) =>
                    `flex items-center p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-yellow-400 text-white"
                        : "duration-300 hover:translate-x-3 bg-white text-gray-800"
                    }`
                  }
                  onClick={() => handleclick("/user/bookings")}
                >
                  <FontAwesomeIcon icon={faHardHat} className="mr-2" />
                  My Bookings
                </NavLink>
                <NavLink
                  to="/user/messages"
                  className={({ isActive }) =>
                    `flex items-center p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-yellow-400 text-white"
                        : "duration-300 hover:translate-x-3 bg-white text-gray-800"
                    }`
                  }
                  onClick={() => handleclick("/user/messages")}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  Messages
                </NavLink>
                <NavLink
                  to="/help-center"
                  className={({ isActive }) =>
                    `flex items-center p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-yellow-400 text-white"
                        : "duration-300 hover:translate-x-3 bg-white text-gray-800"
                    }`
                  }
                  onClick={() => handleclick("/help-center")}
                >
                  <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
                  Help
                </NavLink>
                <li
                  className="flex items-center p-4 rounded-xl transition-all duration-300 hover:translate-x-3 bg-white text-gray-800 cursor-pointer"
                  onClick={handleLogout}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default UserSidebar;
