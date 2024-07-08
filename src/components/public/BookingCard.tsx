import { useState } from "react"
import { IBooking } from "../../interfaces/user"
import AvailabilityCalender from "../worker/AvailabilityCalender"

type BookingType = {
    booking:IBooking
}
const BookingCard = ({booking}:BookingType) => {
    const [reScheduleModalIsOpen,setReScheduleModalIsOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const bookedDates = ["2024-06-28", "2024-07-02", "2024-07-05"];
    return (
        <>
        <div className="flex justify-between hover:border-none w-[1000px] mt-5  h-[150px]  border border-gray-300 p-5  hover:shadow-lg duration-300">
           <div className="text-black">
           <p className="text-sm">
  Date: {new Date(booking?.bookingDate).toLocaleDateString()}
</p>
        
            <p className="text-sm mt-2">Client name:{booking.user.fullName}</p>
            <p className="text-sm mt-2">Location: {booking.workLocationAddress.city} </p>
            <p className="text-sm mt-2">Status: {booking.status} </p>
           </div>
           <div>
            <p className="border border-1 bg-green-400 rounded-xl text-sm text-white py-1 text-center">Completed</p>
                <button className="border border-1 mt-3 cursor-pointer  text-yellow-400 text-sm px-2 py-1">View Details</button>
                <button className="border border-1 mt-3 cursor-pointer  text-yellow-400 text-sm px-2 py-1 ms-3">Message</button>
                <div>
                <button  className="border border-1 mt-3 cursor-pointer   text-red-400 text-sm px-2 py-1">Reject</button>
                <button onClick={() => setReScheduleModalIsOpen(true)} className="border border-1 mt-3 cursor-pointer   text-yellow-400 text-sm px-2 py-1 ms-3">Reschedule</button>
                </div>
           </div>
        </div>
        {reScheduleModalIsOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-auto">
                  <button
                      onClick={() => setReScheduleModalIsOpen(false)}
                      className="absolute top-2 right-2  text-red-600"
                  >
                     x
                  </button>
                  <p className="text-black ms-2 mb-3">Reschedule request must me accepted by the user</p>
                  <div className="flex justify-center mt-1">
              <AvailabilityCalender bookedDates={bookedDates}
               startDate={selectedDate} 
               setStartDate={setSelectedDate}  />
            </div>
            <div className="flex justify-center">
            <button onClick={() => setReScheduleModalIsOpen(false)}  className="border border-1 mt-3 cursor-pointer  text-yellow-400 text-sm px-2 py-1">Request Reschedule</button>
            </div>
              </div>
          </div>
        )}
        </>
    )
}

export default BookingCard
