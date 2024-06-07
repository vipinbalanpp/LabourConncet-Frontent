import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faUsers, faHardHat, faTools, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../redux/reducers/user/UserSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import Logo from '../../components/public/Logo';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logout())
    };
    const handleclick = (path:string)=>{
        navigate(path)
    }
    return (
        <div className="h-screen w-64 bg-gray-800 text-white">
                <div className="p-4">
                <Logo color={"white"}/>
                    <hr className="my-4" />
                    <ul className='space-y-4'>
                        <li className={`flex items-center py-4 rounded-xl hover:bg-gray-900 duration-300 hover:translate-x-3 px-4 cursor-pointe"`} onClick={() => handleclick("/admin/dashboard")}>
                            <FontAwesomeIcon icon={faChartBar} className="mr-2" />
                            Dashboard
                        </li>
                        <li className={`flex items-center py-4 rounded-xl hover:bg-gray-900 duration-300 hover:translate-x-3 px-4 cursor-pointer`} onClick={() => handleclick("/admin/users-list")}>
                            <FontAwesomeIcon icon={faUsers} className="mr-2" />
                            Users
                        </li>
                        <li className={`flex items-center py-4 rounded-xl hover:bg-gray-900 duration-300 hover:translate-x-3 px-4 cursor-pointer`} onClick={() => handleclick("/admin/workers-list")}>
                            <FontAwesomeIcon icon={faHardHat} className="mr-2" />
                            Workers
                        </li>
                        <li className={`flex items-center py-4 rounded-xl hover:bg-gray-900 duration-300 hover:translate-x-3 px-4 cursor-pointer`} >
                            <FontAwesomeIcon icon={faTools} className="mr-2" />
                            Services
                        </li>
                        <li className="flex items-center py-4 rounded-xl hover:bg-gray-900 duration-300 hover:translate-x-3 px-4 cursor-pointer" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                            Logout
                        </li>
                    </ul>
                </div>
            </div>
    )
}

export default AdminSidebar
