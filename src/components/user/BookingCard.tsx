import { useEffect, useState } from "react"
import { IBooking } from "../../interfaces/user"
import AvailabilityCalender from "../worker/AvailabilityCalender"
import instance from "../../config/axiozConfig"

type BookingType = {
    booking:IBooking
}
const BookingCard = ({booking}:BookingType) => {
    const [reScheduleModalIsOpen,setReScheduleModalIsOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [bookedDates,setBookedDates] = useState<Date[] | null>(null)
    useEffect(() => {
           const fetchBookedDates = async () => {
             const response = instance.get(`user/api/v1/workerDetails?id=${booking.worker}`)
           }
    },[]) 
    return (
        <>
        <div className="flex justify-between hover:border-none w-[1000px] mt-3 h-[150px]  border border-gray-300 p-5  hover:shadow-lg duration-300">
           <div className="flex gap-4">
           <img className="w-20 h-20" src={booking.worker.profileImageUrl}/>
           <div className="text-black">
            <p className="text-sm">{booking.worker.fullName}</p>
            <p className="text-sm">{booking.worker.service.serviceName}</p>
            <p className="text-sm">
  Date: {new Date(booking?.workDate).toLocaleDateString()}
</p>
            <p className="text-sm mt-2">{booking.status} </p>
           </div>
           </div>
           <div>
                <button className="border border-1 mt-3 cursor-pointer  text-yellow-400 text-sm px-2 py-1 ms-3">Message</button>
                <div>
                <button onClick={() => setReScheduleModalIsOpen(true)} className="border border-1 mt-3 cursor-pointer   text-yellow-400 text-sm px-2 py-1 ms-3">Reschedule</button>
                </div>
           </div>
        </div>
        {reScheduleModalIsOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-auto">
                  <button
                      onClick={() => setReScheduleModalIsOpen(false)}
                      className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                  >
                      &times;
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
