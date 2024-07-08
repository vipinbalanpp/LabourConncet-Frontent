import { useDispatch, useSelector } from "react-redux"
import BookingCard from "../../components/public/BookingCard"
import { AppDispatch, RootState } from "../../redux/store"
import { useEffect } from "react"
import { getAllBookings } from "../../redux/actions/userActions"


const MyBookings = () => {
    const bookings = useSelector((state:RootState) => state.user.bookings)
    const worker = useSelector((state:RootState) => state.user.user)
    const dispatch = useDispatch<AppDispatch>()
    const myBookings = bookings.filter((booking) => booking.worker.email === worker?.email)
    useEffect(() => {
        dispatch(getAllBookings())
    },[])
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
               {myBookings.map((booking)=> (
                <BookingCard booking={booking} />
               ))}
            </div>
        </div>
    )
}

export default MyBookings
