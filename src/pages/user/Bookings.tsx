import React, { useState } from "react";
import { useSelector } from "react-redux";
import BookingCard from "../../components/user/BookingCard";
import UserSidebar from "../../components/user/UserSidebar";
import { RootState } from "../../redux/store";
import Pagination from "../../components/public/Pagination";


const Bookings = () => {
    const bookings = useSelector((state: RootState) => state.user.bookings);
    const user = useSelector((state: RootState) => state.user.user);
    const myBookings = bookings.filter((booking) => booking.user.email === user?.email);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const indexOfLastBooking = currentPage * itemsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
    const currentBookings = myBookings.slice(indexOfFirstBooking, indexOfLastBooking);
    const totalPages = Math.ceil(myBookings.length / itemsPerPage);
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex">
            <UserSidebar />
            <div className="flex flex-col justify-between pt-20 ps-20 w-full min-h-screen relative">
                <div>
                    <div className="flex mx-56 gap-2 px-1">
                        <button className="border border-1 px-2 py-1 font-semibold bg-[rgb(116,116,230)] text-white text-sm rounded-[7px]">All</button>
                        <button className="border border-1 px-2 py-1 font-semibold text-sm rounded-[7px]">Upcoming</button>
                        <button className="border border-1 px-2 py-1 font-semibold text-sm rounded-[7px]">Completed</button>
                        <button className="border border-1 px-2 py-1 font-semibold text-sm rounded-[7px]">Cancelled</button>
                        <button className="border border-1 px-2 py-1 font-semibold text-sm rounded-[7px]">Requested</button>
                    </div>
                    {currentBookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default Bookings;
