
import { useState } from "react"
import { IBooking } from "../../interfaces/user"
import Modal from "react-modal";


type BookingType = {
    booking:IBooking
}
const BookingCard = ({booking}:BookingType) => {
    const [bookingDetailsModalIsOpen,setBookingDetailsModalIsOpen] =  useState(false)
    const [selectedBooking,setSelectedBooking] = useState<IBooking | null>(null)
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
           <div className="flex items-center">
                <button
                onClick={() => {
                    setBookingDetailsModalIsOpen(true)
                    setSelectedBooking(booking)
                    console.log(booking);
                    
                }}
                 className="border border-1 mt-3 cursor-pointer  text-yellow-400 text-sm px-2 py-1">View Details</button>
                <button className="border border-1 mt-3 cursor-pointer  text-yellow-400 text-sm px-2 py-1 ms-3">Message</button>
                <button  className="border ms-3 border-1 mt-3 cursor-pointer   text-red-400 text-sm px-2 py-1">Cancel</button>
           
           </div>
        </div>
        {bookingDetailsModalIsOpen && (
            <Modal
            isOpen={bookingDetailsModalIsOpen}
            onRequestClose={() => setBookingDetailsModalIsOpen(false)}
            className="fixed inset-0 flex items-center justify-center z-50 "
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 rounded-md"
          >
            <div className="bg-white  rounded-[10px]  p-14 w-full max-w-2xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Booking Details</h2>
                <button onClick={() => setBookingDetailsModalIsOpen(false)}>
                  <span className="text-red-500 text-2xl">×</span>
                </button>
              </div>
            <div className="space-y-2">
                <p className="text-black font-semibold">Client Name : {selectedBooking?.user.fullName}</p>
                <p className="text-black font-semibold">Work Site Location:  
                    <span> {selectedBooking?.workLocationAddress.houseName}</span>,
                    <span>{selectedBooking?.workLocationAddress.street}</span>,
                    <span>{selectedBooking?.workLocationAddress.city}</span>,
                    <span>{selectedBooking?.workLocationAddress.state}</span>
                </p>
                    <p className="text-black font-semibold">Work Description: {selectedBooking?.workDescription}</p>
                    <p className="text-black font-semibold">
  Work Date: { new Date(booking?.workDate).toLocaleDateString() }
</p>

            </div>
            </div>
          </Modal>
        )}
        </>
    )
}

export default BookingCard
