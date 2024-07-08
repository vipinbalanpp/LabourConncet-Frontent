
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faChartBar, faEnvelope, faHardHat, faHeart, faQuestionCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducers/user/UserSlice";
import Logo from "../public/Logo";
import { FaUser } from "react-icons/fa";
import { AppDispatch, RootState } from "../../redux/store";

const UserSidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);

    const handleclick = (path: string) => {
        navigate(path);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 w-[300px]  shadow-lg">
            <Logo color="black" />
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
                    <p className="text-xl font-semibold text-gray-800">{user?.fullName}</p>
                    <p className="text-gray-600">{user?.email}</p>
                </div>
            </div>
            <div className="px-5">
                <nav className="flex-grow mt-10">
                    <ul className="space-y-4">
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `flex items-center p-4 rounded-xl transition-all duration-300 ${
                                    isActive
                                        ? "bg-yellow-500 text-white"
                                        : "duration-300 hover:translate-x-3 bg-white text-gray-800"
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
                                `flex items-center p-4 rounded-xl transition-all duration-300 ${
                                    isActive
                                        ? "bg-yellow-400 text-white"
                                        : "duration-300 hover:translate-x-3 bg-white text-gray-800"
                                }`
                            }
                            onClick={() => handleclick("/admin/users-list")}
                        >
                            <FontAwesomeIcon icon={faBell} className="mr-2" />
                            Notifications
                        </NavLink>
                        <NavLink
                            to="/bookings"
                            className={({ isActive }) =>
                                `flex items-center p-4 rounded-xl transition-all duration-300 ${
                                    isActive
                                        ? "bg-yellow-400 text-white"
                                        : "duration-300 hover:translate-x-3 bg-white text-gray-800"
                                }`
                            }
                            onClick={() => handleclick("/bookings")}
                        >
                            <FontAwesomeIcon icon={faHardHat} className="mr-2" />
                            My Bookings
                        </NavLink>
                        <NavLink
                            to="/admin/services-list"
                            className={({ isActive }) =>
                                `flex items-center p-4 rounded-xl transition-all duration-300 ${
                                    isActive
                                        ? "bg-yellow-400 text-white"
                                        : "duration-300 hover:translate-x-3 bg-white text-gray-800"
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
                                `flex items-center p-4 rounded-xl transition-all duration-300 ${
                                    isActive
                                        ? "bg-yellow-400 text-white"
                                        : "duration-300 hover:translate-x-3 bg-white text-gray-800"
                                }`
                            }
                            onClick={() => handleclick("/admin/services-list")}
                        >
                            <FontAwesomeIcon icon={faHeart} className="mr-2" />
                            Favourites
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
    );
};

export default UserSidebar;
