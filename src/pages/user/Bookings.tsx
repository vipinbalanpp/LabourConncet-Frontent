import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BookingCard from "../../components/user/BookingCard";
import UserSidebar from "../../components/user/UserSidebar";
import { RootState } from "../../redux/store";
import { IBooking } from "../../interfaces/user";
import instance from "../../config/axiozConfig";
import Pagination from "../../components/public/Pagination";



const Bookings = () => {
    const [bookings,setBookings] = useState<IBooking[] | null>(null)
    const user = useSelector((state: RootState) => state.user);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumberOfPages,setTotalNumberOfPages] = useState(0);

    useEffect(() => {
        fetchBookings()
    },[currentPage])

    const fetchBookings = async() => {
       try{
        const response = await instance.get(`/booking/api/v1?userId=${user?.id}&pageNumber=${currentPage-1}`)
        if(response){
            setBookings(response.data.bookings)
            console.log(response.data,'this is the bookings I wnat');
            
            setTotalNumberOfPages(response.data.totalNumberOfPages)
        }
       }catch(error){
        
       }
        
    }
    
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
                    {bookings && bookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalNumberOfPages} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
};

export default Bookings;
