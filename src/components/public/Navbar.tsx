import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/reducers/user/UserSlice";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [profileButtonClicked, setProfileButtonClicked] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
    setProfileButtonClicked(false); // Close the dropdown on logout
  };

  const handleProfileClick = () => {
    setProfileButtonClicked(!profileButtonClicked);
  };

  return (
    <>
      <div>
        <div className="flex justify-between">
          <Logo />
          <div className="flex py-5 gap-x-8 pe-[100px] text-black font-semibold">
            <NavLink
              to={"/"}
              className={({ isActive }) => {
                return `hover:text-blue-600 cursor-pointer hover:scale-95 duration-300 ${
                  isActive
                    ? "border-b-4 border-yellow-400 duration-500 transition-all"
                    : ""
                }`;
              }}
            >
              Home
            </NavLink>
            <NavLink
              to={"/find-worker"}
              className={({ isActive }) => {
                return `hover:text-blue-600 cursor-pointer hover:scale-95 duration-300 ${
                  isActive
                    ? "border-b-4 border-yellow-400 duration-500 transition-all"
                    : ""
                }`;
              }}
            >
              Find Workers
            </NavLink>
            <NavLink
              to={"/messages"}
              className={({ isActive }) => {
                return `hover:text-blue-600 cursor-pointer hover:scale-95 duration-300 ${
                  isActive
                    ? "border-b-4 border-yellow-400 duration-500 transition-all"
                    : ""
                }`;
              }}
            >
              Messages
            </NavLink>
            <NavLink
              to={"/notifications"}
              className={({ isActive }) => {
                return `hover:text-blue-600 cursor-pointer hover:scale-95 duration-300 ${
                  isActive
                    ? "border-b-4 border-yellow-400 duration-500 transition-all"
                    : ""
                }`;
              }}
            >
              Notifications
            </NavLink>
            <NavLink
              to={"/about-us"}
              className={({ isActive }) => {
                return `hover:text-blue-600 cursor-pointer hover:scale-95 duration-300 ${
                  isActive
                    ? "border-b-4 border-yellow-400 duration-500 transition-all"
                    : ""
                }`;
              }}
            >
              About us
            </NavLink>
            {!user && (
              <NavLink
                to={"/login"}
                className={({ isActive }) => {
                  return `hover:text-blue-600 cursor-pointer hover:scale-95 duration-300 ${
                    isActive
                      ? "border-b-4 border-yellow-400 duration-500 transition-all"
                      : ""
                  }`;
                }}
              >
                Sign in
              </NavLink>
            )}
            {user && (
              <div className="relative">
                <div
                  className="flex ms-5 border items-center justify-center cursor-pointer"
                  onClick={handleProfileClick}
                >
                  {user.profileImageUrl ? (
                    <img
                      className="w-9 h-9 rounded-full"
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
                  <div className="absolute right-0  mt-2 w-32 bg-white border rounded shadow-lg">
                    <NavLink
                      to="/profile"
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
