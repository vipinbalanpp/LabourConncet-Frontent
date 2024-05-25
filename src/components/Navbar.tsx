import { NavLink } from "react-router-dom";
import Logo from "./Logo";


const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between">
       <Logo/>
        <div className="flex py-5 gap-x-8 pe-[100px] text-black font-semibold">
          <NavLink
            to={"/"}
            className={({ isActive }) => {
              return `hover:text-blue-600 cursor-pointer  hover:scale-95 duration-300 ${
                isActive
                  ? "border-b-4 border-yellow-400 duration-500 transition-all"
                  : ""
              }`;
            }}
          >
            Home{" "}
          </NavLink>
          <NavLink
            to={"/find-worker"}
            className={({ isActive }) => {
              return `hover:text-blue-600 cursor-pointer  hover:scale-95 duration-300 ${
                isActive
                  ? "border-b-4 border-yellow-400  duration-500 transition-all"
                  : ""
              }`;
            }}
          >
            Find Workers
          </NavLink>
          <NavLink
            to={"/sdd"}
            className={({ isActive }) => {
              return `hover:text-blue-600 cursor-pointer  hover:scale-95 duration-300 ${
                isActive
                  ? "border-b-4 border-yellow-400  duration-500 transition-all"
                  : ""
              }`;
            }}
          >
            Messages
          </NavLink>
          <NavLink
            to={"/sdssd"}
            className={({ isActive }) => {
              return `hover:text-blue-600 cursor-pointer  hover:scale-95 duration-300 ${
                isActive
                  ? "border-b-4 border-yellow-400  duration-500 transition-all"
                  : ""
              }`;
            }}
          >
            Notifications
          </NavLink>
          <NavLink
            to={"/sds"}
            className={({ isActive }) => {
              return `hover:text-blue-600 cursor-pointer  hover:scale-95 duration-300 ${
                isActive
                  ? "border-b-4 border-yellow-400  duration-500 transition-all"
                  : ""
              }`;
            }}
          >
            About us
          </NavLink>
          <NavLink
            to={"/login"}
            className={({ isActive }) => {
              return `hover:text-blue-600 cursor-pointer  hover:scale-95 duration-300 ${
                isActive
                  ? "border-b-4 border-yellow-400  duration-500 transition-all"
                  : ""
              }`;
            }}
          >
            Sign in
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
