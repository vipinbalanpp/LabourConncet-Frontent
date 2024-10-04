import { useEffect, useState } from "react";
import { IBooking } from "../../interfaces/user";
import AvailabilityCalender from "../worker/AvailabilityCalender";
import instance from "../../config/axiozConfig";
import ReactModal from "react-modal";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import CustomButton from "../public/CustomButton";

type BookingType = {
  booking: IBooking;
  setBookings: React.Dispatch<React.SetStateAction<IBooking[] | null>>;
};

const BookingCard = ({ booking, setBookings }: BookingType) => {
  const [bookingDetailsModalIsOpen, setBookingDetailsModalIsOpen] =
    useState(false);
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const navigate = useNavigate();
  const [cancellationReason, setCancellationReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [reScheduleModalIsOpen, setReScheduleModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [cancelModalIsOpen, setCancelModalIsOpen] = useState(false);
  const [dateSelectionError, setDateSelectionError] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetchBookedDates();
  }, [booking.worker]);

  const fetchBookedDates = async () => {
    const response = await instance.get(
      `booking/api/v1/get-availability-dates?workerId=${booking.worker.id}`
    );
    console.log(response, "this is availability response");

    const bookedDatesResponse = response.data.bookedDates
      ? response.data.bookedDates
      : [];
    const unavailableDatesResponse = response.data.unavailableDates
      ? response.data.unavailableDates
      : [];

    const combinedDates = [
      ...bookedDatesResponse.map((dateString: string) => new Date(dateString)),
      ...unavailableDatesResponse.map(
        (dateString: string) => new Date(dateString)
      ),
    ];
    setBookedDates(combinedDates);
  };

  const handleCancellation = async () => {
    const reason =
      cancellationReason === "other" ? otherReason : cancellationReason;
    if (!reason.trim() || reason.trim().length < 10) {
      toast.error("Please provide a reason for cancellation.");
      return;
    }
    console.log(reason, "<-------->");
    const queryParams = new URLSearchParams({
      cancellationReason: reason,
      cancelledBy: "user",
    });
    instance
      .put(`/booking/api/v1/cancel/${booking.id}?${queryParams.toString()}`)
      .then((result) => {
        toast.success("Booking cancelled successfully.");
        console.log(result);
        setCancelModalIsOpen(false);
        setBookings((prevBookings) =>
          prevBookings
            ? prevBookings.map((b) => (b.id === booking.id ? result.data : b))
            : null
        );
      })
      .catch((error) => {
        console.error("Error cancelling booking:", error);
        toast.error("Failed to cancel booking.");
      });
    console.log(cancellationReason);
    console.log(booking.id);
  };
  const handleReschedule = () => {
    if (!selectedDate) {
      toast.error("please select a date for reschedule");
    }
    console.log(selectedDate, "selected date for reschedule");
    const response = instance.put(
      `/booking/api/v1/reschedule/${booking.id}?isWorker=false&rescheduleDate=${
        selectedDate?.toISOString().split("T")[0]
      }`
    );

    console.log(response, "response of reschedule");
  };

  return (
    <>
      <div
        data-aos="fade-up"
        className="flex flex-col border-2 border-yellow-600  justify-between  bg-white items-center w-full max-w-3xl mt-3 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-3xl p-6"
      >
        <div className="flex  items-start gap-6">
          {/* Worker Image */}
          <img
            className="w-24 h-24 object-cover rounded-full border-2 border-yellow-400"
            src={booking.worker.profileImageUrl}
            alt="Worker"
          />

          {/* Booking Info */}
          <div className="flex-grow text-black space-y-3">
            {/* Service Name */}
            <p className="text-xl font-bold text-gray-900">
              {booking.worker.service.serviceName}
            </p>

            {/* Worker Name */}
            <div className="flex items-center">
              <p className="text-lg font-medium">Worker Name: </p>
              <p
                onClick={() =>
                  navigate(`/worker-details/${booking.worker.email}`)
                }
                className="ml-2 text-lg text-blue-600 cursor-pointer hover:underline font-medium"
              >
                {booking.worker.fullName}
              </p>
            </div>

            {/* Scheduled Date */}
            <p className="text-md font-semibold text-gray-600">
              Scheduled Date:{" "}
              {booking?.workDate
                ? format(new Date(booking.workDate), "PPP")
                : "N/A"}
            </p>

            {/* Status */}
            {booking.status === "REQUESTED_FOR_RESCHEDULE" ? (
              <p className="text-sm font-medium ">
                Status:{" "}
                <span className="text-yellow-500">
                  {" "}
                  Requested for reschedule
                </span>
              </p>
            ) : (
              booking.status !== "CANCELLED" && (
                <p className="text-sm  font-medium">
                  Status:
                  <span
                    className={`ml-2 ${
                      booking.status === "COMPLETED"
                        ? "text-green-600"
                        : "text-yellow-500"
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1).toLowerCase()}
                  </span>
                </p>
              )
            )}

            {/* Reschedule Date */}
            {booking.status === "REQUESTED_FOR_RESCHEDULE" && (
              <p className="text-sm text-black font-semibold">
                Reschedule requested date:
                <span className="text-yellow-500 ml-2">
                  {format(new Date(booking.rescheduleRequestedDate), "PPP")}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {booking.status !== "CANCELLED" && booking.status !== "REJECTED" ? (
          <div className="flex justify-end gap-4 pt-5">
            {/* View Details Button */}
            <button
              onClick={() => {
                setBookingDetailsModalIsOpen(true);
                setSelectedBooking(booking);
              }}
              className="px-4 py-2 border border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-white transition duration-300 font-medium"
            >
              View Details
            </button>

            {/* Message Button */}
            <button className="px-4 py-2 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400 hover:text-white transition duration-300 font-medium">
              Message
            </button>

            {/* Reschedule Button */}
            {booking.status !== "REJECTED" &&
              booking.status !== "COMPLETED" &&
              booking.status !== "REQUESTED_FOR_RESCHEDULE" && (
                <button
                  onClick={() => setReScheduleModalIsOpen(true)}
                  className="px-4 py-2 border border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-white transition duration-300 font-medium"
                >
                  Reschedule
                </button>
              )}

            {/* Cancel Button */}
            <button
              onClick={() => setCancelModalIsOpen(true)}
              className="px-4 py-2 border border-red-400 text-red-400 rounded-lg hover:bg-red-400 hover:text-white transition duration-300 font-medium"
            >
              Cancel
            </button>
          </div>
        ) : booking.status === "CANCELLED" ? (
          <p className="text-md font-semibold text-red-500 text-right">
            Booking is cancelled{" "}
            {booking.cancelledBy === "worker" && <span>by worker</span>} due to{" "}
            {booking.cancellationReason}
          </p>
        ) : (
          <p className="text-md font-semibold text-red-500 text-right">
            Booking is rejected by worker due to {booking.reasonForRejection}
          </p>
        )}
      </div>

      {reScheduleModalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-2xl shadow-2xl px-10 py-8 w-full max-w-xl mx-auto animate-fade-in">
            <h1 className="text-xl font-bold mb-6 text-center text-gray-800">
              Request For Reschedule
            </h1>
            <div className="flex justify-center mt-4">
              <AvailabilityCalender
                bookedDates={bookedDates}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                setDateSelectionError={setDateSelectionError}
              />
            </div>
            {booking.status === "CONFIRMED" && (
              <p className="text-red-600 text-sm text-center mt-4">
                Reschedule request must be accepted by the worker.
              </p>
            )}
            <div className="flex gap-4 justify-end mt-8">
              <CustomButton
                style="px-8 py-2 font-semibold text-red-600 border border-red-600 rounded-xl hover:bg-red-50 transition duration-300"
                text="Cancel"
                onClick={() => setReScheduleModalIsOpen(false)}
              />
              <CustomButton
                style="px-8 py-2 font-semibold text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-50 transition duration-300"
                text="Confirm"
                onClick={handleReschedule}
              />
            </div>
          </div>
        </div>
      )}
      <ReactModal
        isOpen={bookingDetailsModalIsOpen}
        onRequestClose={() => setBookingDetailsModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center z-50 "
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40 rounded-md"
      >
        <div
          className="bg-white  rounded-[10px] z-40  p-14 w-full max-w-2xl shadow-lg"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Booking Details
            </h2>
            <button onClick={() => setBookingDetailsModalIsOpen(false)}>
              <span className="text-red-500 text-2xl">×</span>
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-black font-semibold">
              Client Name : {selectedBooking?.user.fullName}
            </p>
            <p className="text-black font-semibold">
              Work Site Location:
              <span> {selectedBooking?.workLocationAddress.houseName}</span>,
              <span>{selectedBooking?.workLocationAddress.street}</span>,
              <span>{selectedBooking?.workLocationAddress.city}</span>,
              <span>{selectedBooking?.workLocationAddress.state}</span>
            </p>
            <p className="text-black font-semibold">
              Work Description: {selectedBooking?.workDescription}
            </p>
            <p className="text-black font-semibold">
              Work Date: {new Date(booking?.workDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </ReactModal>
      <ReactModal
        isOpen={cancelModalIsOpen}
        onRequestClose={() => setCancelModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center "
        overlayClassName="fixed inset-0 bg-black z-50 bg-opacity-50"
      >
        <div className="bg-white rounded-2xl p-14  shadow-lg">
          <h2 className="text-2xl font-bold mb-10 text-center">
            Confirm Cancellation
          </h2>
          <p className="text-center text-black mb-5">
            Are you sure you want to cancel this booking? Please provide a
            reason for cancellation.
          </p>
          <label
            htmlFor="cancellationReason"
            className="block text-sm font-medium text-gray-700"
          >
            Reason for Cancellation
          </label>
          <select
            id="cancellationReason"
            name="cancellationReason"
            className="mt-1 text-black block w-full pl-3 pr-10 py-3 text-base border rounded-xl bg-white border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => setCancellationReason(e.target.value)}
          >
            <option value="" disabled selected>
              Select a reason
            </option>
            <option value="found another worker">Found another Worker</option>
            <option value="change in schedule">Change in schedule</option>
            <option value="no longer needed">No longer needed</option>
            <option value="other">Other (please specify)</option>
          </select>
          {cancellationReason === "other" && (
            <textarea
              id="otherReason"
              name="otherReason"
              rows={4}
              className="mt-2 block w-full text-black bg-white pl-3 pr-10 py-2  text-lg border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-xl"
              placeholder="Please specify the reason"
              onChange={(e) => setOtherReason(e.target.value)}
            ></textarea>
          )}

          <div className="flex justify-end mt-10 space-x-2">
            <button
              className="bg-gray-500 text-white rounded px-10 py-2"
              onClick={() => setCancelModalIsOpen(false)}
            >
              No
            </button>
            <button
              className="bg-red-500 text-white rounded px-4 py-2"
              onClick={handleCancellation}
            >
              Yes, Cancel
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default BookingCard;
