import { useDispatch, useSelector } from "react-redux"
import BookingCard from "../../components/public/BookingCard"
import { AppDispatch, RootState } from "../../redux/store"
import { useEffect, useState } from "react"
import { IBooking } from "../../interfaces/user"
import instance from "../../config/axiozConfig"
import Pagination from "../../components/public/Pagination"



const MyBookings = () => {
    const worker = useSelector((state:RootState) => state.user)
    const[bookings,setBookings] = useState<IBooking[]>([])
    const[currentPage,setCurrentPage] = useState(1);
    const [totalNumberOfPages,setTotalNumberOfPages] = useState(0)
    useEffect(() => {
        fetchBookings();
    },[currentPage])

    const fetchBookings = async() => {
        try{
         const response = await instance.get(`/booking/api/v1?workerId=${worker?.id}&pageNumber=${currentPage-1}`)
         if(response){
             setBookings(response.data.bookings)
             console.log(response.data,'this is the bookings I wnat');
             
             setTotalNumberOfPages(response.data.totalNumberOfPages)
         }
        }catch(error){
         
        }
         
     }

    return (
        <div>
            <div className="pt-20">
               <div className="flex mx-56 gap-2 px-1">
                    <button className="border border-1 px-2 py-1 font-semibold bg-[rgb(116,116,230)] text-white text-sm  rounded-[7px]">All</button>
                    <button className="border border-1 px-2 py-1 font-semibold text-sm rounded-[7px]">Upcoming</button>
                    <button className="border border-1 px-2 py-1 font-semibold text-sm rounded-[7px]">Completed</button>
                    <button className="border border-1 px-2 py-1 font-semibold text-sm rounded-[7px]">Cancelled</button>
                    <button className="border border-1 px-2 py-1 font-semibold text-sm rounded-[7px]">Requested</button>
               </div>
               {bookings.length >0  && bookings.map((booking:IBooking)=> (
                <BookingCard booking={booking} />
               ))}

            </div>
<div className="pt-5">
<Pagination currentPage={currentPage} totalPages={totalNumberOfPages} onPageChange={setCurrentPage} />

    </div>
            </div>
    )
}

export default MyBookings
