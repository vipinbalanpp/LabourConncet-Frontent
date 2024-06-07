import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/user/UserSlice";
import Logo from "../public/Logo"
import { AppDispatch } from "../../redux/store";
import { useState } from "react";


const WorkerSideBar = () => {
    const [activeLink, setActiveLink] = useState("Dashboard");
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logout())
    };
    return (
        <div className="h-screen w-64 bg-gray-800 text-white">
        <div className="p-4">
        <Logo color={"white"}/>
            <hr className="my-4" />
            <ul>
                <li className={`py-8 px-4 cursor-pointer ${activeLink === "Dashboard" ? "bg-gray-900" : ""}`} onClick={() => setActiveLink("Dashboard")}>Dashboard</li>
                <li className={`py-8 px-4 cursor-pointer ${activeLink === "Personal Info" ? "bg-gray-900" : ""}`} onClick={() => setActiveLink("Personal Info")}>Personal Info</li>
                <li className={`py-8 px-4 cursor-pointer ${activeLink === "My Bookings" ? "bg-gray-900" : ""}`} onClick={() => setActiveLink("My Bookings")}>My Bookings</li>
                <li className={`py-8 px-4 cursor-pointer ${activeLink === "Notifications" ? "bg-gray-900" : ""}`} onClick={() => setActiveLink("Notifications")}>Notifications</li>
                <li className={`py-8 px-4 cursor-pointer ${activeLink === "Messages" ? "bg-gray-900" : ""}`} onClick={() => setActiveLink("Messages")}>Messages</li>
                <li className={`py-8 px-4 cursor-pointer ${activeLink === "Reviews and Ratings" ? "bg-gray-900" : ""}`} onClick={() => setActiveLink("Reviews and Ratings")}>Reviews and Ratings</li>
                <li className={`py-8 px-4 cursor-pointer ${activeLink === "Help" ? "bg-gray-900" : ""}`} onClick={() => setActiveLink("Help")}>Help</li>
                <li className="py-8 px-4 cursor-pointer" onClick={handleLogout}>Logout</li>
            </ul>
        </div>
    </div>
    )
}

export default WorkerSideBar
