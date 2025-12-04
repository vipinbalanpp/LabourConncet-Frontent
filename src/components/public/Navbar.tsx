import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { logout } from "../../redux/reducers/user/UserSlice";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);
  const [profileButtonClicked, setProfileButtonClicked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileButtonClicked(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = () => {
    dispatch(logout());
    setProfileButtonClicked(false);
  };

  const handleProfileClick = () => {
    setProfileButtonClicked(!profileButtonClicked);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="border border-black">
        <div className="flex justify-between items-center px-4 py-1 md:px-8">
          <Logo color="black" />
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {menuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } md:flex md:items-center md:gap-x-8 text-black font-semibold text-sm`}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-blue-600 cursor-pointer hover:scale-95 duration-300 ${
                  isActive
                    ? "border-b-2 border-yellow-400 duration-500 transition-all"
                    : "nav-hover"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/service-list"
              className={({ isActive }) =>
                `hover:text-blue-600 cursor-pointer hover:scale-95 duration-300 ${
                  isActive
                    ? "border-b-2 border-yellow-400 duration-500 transition-all"
                    : "nav-hover"
                }`
              }
            >
              Services
            </NavLink>
            {user && (
              <NavLink
                to="user/messages"
                className={({ isActive }) =>
                  `hover:text-blue-600 cursor-pointer hover:scale-95 duration-300 ${
                    isActive
                      ? "border-b-2 border-yellow-400 duration-500 transition-all"
                      : "nav-hover"
                  }`
                }
              >
                Messages
              </NavLink>
            )}
            {user && (
              <NavLink
                to="/notifications"
                className={({ isActive }) =>
                  `hover:text-blue-600 cursor-pointer hover:scale-95 duration-300 ${
                    isActive
                      ? "border-b-2 border-yellow-400 duration-500 transition-all"
                      : "nav-hover"
                  }`
                }
              >
                Notifications
              </NavLink>
            )}
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                `hover:text-blue-600 cursor-pointer hover:scale-95 duration-300 ${
                  isActive
                    ? "border-b-2 border-yellow-400 duration-500 transition-all"
                    : "nav-hover"
                }`
              }
            >
              About us
            </NavLink>
            {!user && (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hover:text-blue-600 cursor-pointer hover:scale-95 duration-300 ${
                    isActive
                      ? "border-b-2 border-yellow-400 duration-500 transition-all"
                      : "nav-hover"
                  }`
                }
              >
                Sign in
              </NavLink>
            )}
            {user && (
              <div className="relative">
                <div
                  className="flex ms-5 rounded-full border-yellow-400 items-center justify-center cursor-pointer"
                  onClick={handleProfileClick}
                >
                  {user.profileImageUrl ? (
                    <img
                      className="w-9 h-9 border-2 border-black rounded-full"
                      src={user.profileImageUrl}
                      alt="Profile"
                    />
                  ) : (
                    <span className="text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 10a5 5 0 100-10 5 5 0 000 10zm0 1a7 7 0 00-7 7v1h14v-1a7 7 0 00-7-7z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </div>
                {profileButtonClicked && (
                  <div
                    className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10"
                    ref={dropdownRef}
                  >
                    <NavLink
                      to="/user/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={() => setProfileButtonClicked(false)}
                    >
                      Profile
                    </NavLink>
                    <div
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
