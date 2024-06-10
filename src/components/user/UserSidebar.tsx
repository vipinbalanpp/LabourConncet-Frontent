import {
  faBell,
  faChartBar,
  faEnvelope,
  faHardHat,
  faHeart,
  faQuestionCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import image from "../../assets/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/reducers/user/UserSlice";
import Logo from "../public/Logo";

const UserSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleclick = (path: string) => {
    navigate(path);
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <Logo color="black" />
      <div className="w-64  h-screen ps-10">
        <div className="flex pt-10 gap-5">
          <div className="w-11 h-11 mt-2 overflow-hidden rounded-full border border-gray-200">
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-1">
            <p className="text-black font-semibold">Jake Gyll</p>
            <p>jakegyll@gmail.com</p>
          </div>
        </div>
        <ul className="space-y-4 mt-10 ">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center py-4 rounded-xl  duration-300 hover:translate-x-3 px-4 cursor-pointer ${
                isActive ? "bg-yellow-500 text-white" : ""
              }`
            }
            onClick={() => handleclick("/profile")}
          >
            <FontAwesomeIcon icon={faChartBar} className="mr-2" />
            Personal Info
          </NavLink>
          <NavLink
            to="/admin/users-list"
            className={({ isActive }) =>
              `flex items-center py-4 rounded-xl   duration-300 hover:translate-x-3 px-4 cursor-pointer ${
                isActive ? "bg-yellow-400 text-white" : ""
              }`
            }
            onClick={() => handleclick("/admin/users-list")}
          >
            <FontAwesomeIcon icon={faBell} className="mr-2" />
            Notifications
          </NavLink>

          <NavLink
            to="/admin/workers-list"
            className={({ isActive }) =>
              `flex items-center py-4 rounded-xl  duration-300 hover:translate-x-3 px-4 cursor-pointer ${
                isActive ? "bg-yellow-400 text-white" : ""
              }`
            }
            onClick={() => handleclick("/admin/workers-list")}
          >
            <FontAwesomeIcon icon={faHardHat} className="mr-2" />
            My Bookings
          </NavLink>

          <NavLink
            to="/admin/services-list"
            className={({ isActive }) =>
              `flex items-center py-4 rounded-xl  duration-300 hover:translate-x-3 px-4 cursor-pointer ${
                isActive ? "bg-yellow-400 text-white" : ""
              }`
            }
            onClick={() => handleclick("/admin/services-list")}
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            Messages
          </NavLink>

          <NavLink
            to="/admin/services-list"
            className={({ isActive }) =>
              `flex items-center py-4 rounded-xl  duration-300 hover:translate-x-3 px-4 cursor-pointer ${
                isActive ? "bg-yellow-400 text-white" : ""
              }`
            }
            onClick={() => handleclick("/admin/services-list")}
          >
            <FontAwesomeIcon icon={faHeart} className="mr-2" />
            Favourites
          </NavLink>

          <NavLink
            to="/admin/services-list"
            className={({ isActive }) =>
              `flex items-center py-4 rounded-xl  duration-300 hover:translate-x-3 px-4 cursor-pointer ${
                isActive ? "bg-yellow-400 text-white" : ""
              }`
            }
            onClick={() => handleclick("/admin/services-list")}
          >
            <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
            Help
          </NavLink>

          <li
            className="flex items-center py-4 rounded-xl  duration-300 hover:translate-x-3 px-4 cursor-pointer"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserSidebar;
