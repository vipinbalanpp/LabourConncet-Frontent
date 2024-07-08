import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faUsers,
  faHardHat,
  faTools,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../redux/reducers/user/UserSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import Logo from "../../components/public/Logo";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex gap-x-10 h-screen">
      <div className="w-1/5 sticky top-10 2xl:pb-10 scrollbar-hidden block h-screen scroll-smooth overflow-auto bg-gray-100 shadow-lg">
        <Logo color="black" />
        <div className="px-5">
          <nav className="flex-grow mt-10">
            <ul className="space-y-4">
              <li>
                <div
                  className={`flex items-center p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                    location.pathname === "/admin/dashboard"
                      ? "bg-yellow-500 text-white"
                      : "bg-white text-gray-800 hover:translate-x-3"
                  }`}
                  onClick={() => handleClick("/admin/dashboard")}
                >
                  <FontAwesomeIcon icon={faChartBar} className="mr-2" />
                  Dashboard
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                    location.pathname === "/admin/users-list"
                      ? "bg-yellow-500 text-white"
                      : "bg-white text-gray-800 hover:translate-x-3"
                  }`}
                  onClick={() => handleClick("/admin/users-list")}
                >
                  <FontAwesomeIcon icon={faUsers} className="mr-2" />
                  Users
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                    location.pathname === "/admin/workers-list"
                      ? "bg-yellow-500 text-white"
                      : "bg-white text-gray-800 hover:translate-x-3"
                  }`}
                  onClick={() => handleClick("/admin/workers-list")}
                >
                  <FontAwesomeIcon icon={faHardHat} className="mr-2" />
                  Workers
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                    location.pathname === "/admin/services-list"
                      ? "bg-yellow-500 text-white"
                      : "bg-white text-gray-800 hover:translate-x-3"
                  }`}
                  onClick={() => handleClick("/admin/services-list")}
                >
                  <FontAwesomeIcon icon={faTools} className="mr-2" />
                  Services
                </div>
              </li>
              <li>
                <div
                  className="flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 bg-white text-gray-800 hover:translate-x-3"
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

export default AdminSidebar;
