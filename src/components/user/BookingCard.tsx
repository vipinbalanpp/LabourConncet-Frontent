import { useEffect, useState } from "react";
import { IBooking } from "../../interfaces/user";
import AvailabilityCalender from "../worker/AvailabilityCalender";
import instance from "../../config/axiozConfig";
import ReactModal from "react-modal";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import CustomButton from "../public/CustomButton";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type BookingType = {
  booking: IBooking;
  setBookings: React.Dispatch<React.SetStateAction<IBooking[] | null>>;
};

const BookingCard = ({ booking, setBookings }: BookingType) => {
  const user = useSelector((state: RootState) => state.user);

  const [bookingDetailsModalIsOpen, setBookingDetailsModalIsOpen] =
    useState(false);
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const navigate = useNavigate();
  const [cancellationReason, setCancellationReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [reScheduleModalIsOpen, setReScheduleModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [dateSelectionError, setDateSelectionError] = useState<string | null>(
    null
  );
  const [cancelModalIsOpen, setCancelModalIsOpen] = useState(false);
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
  const [reasonsForCancellation, setReasonsForCancellation] = useState<
    string[]
  >([]);
  const [
    rescheduleConfirmationModalIsOpen,
    setRescheduleConfirmationModalIsOpen,
  ] = useState(false);
  const [
    rescheduleCancellationModalIsOpen,
    setRescheduleCancellationModalIsOpen,
  ] = useState(false);

  useEffect(() => {
    fetchBookedDates();
    setReasonsForCancellation(
      user?.role === "USER"
        ? userCancellationReasons
        : workerCancellationReasons
    );
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
      cancellationReason === "other (please specify)"
        ? otherReason
        : cancellationReason;
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
      `/booking/api/v1/reschedule/${booking.id}?isWorker=${
        user?.role === "USER" ? false : true
      }&rescheduleDate=${selectedDate?.toISOString().split("T")[0]}`
    );
    setReScheduleModalIsOpen(false);
    console.log(response, "response of reschedule");
  };

  const handleBookingConfirmation = () => {
    instance
      .put(`/booking/api/v1/confirm/${booking.id}`)
      .then((result) => {
        toast.success("Booking Confirmed successfully.");
        setBookings(
          (prevBookings) =>
            prevBookings?.map((b) =>
              b.id === booking.id ? { ...b, status: "CONFIRMED" } : b
            ) || null
        );

        console.log(result);
        setConfirmationModalIsOpen(false);
      })
      .catch((error) => {
        console.error("Error cancelling booking:", error);
        toast.error("Failed to cancel booking.");
      });
    setConfirmationModalIsOpen(false);
  };

  const handleRescheduleConfirmation = () => {
    const response = instance.put(
      `/booking/api/v1/reschedule/${
        booking.id
      }?status='confirm'&rescheduleDate=${
        booking.rescheduleRequestedDate
      }&isWorker=${user?.role !== "USER" ? false : true}`
    );
    setRescheduleConfirmationModalIsOpen(false);
    console.log(response, "response of reschedule");
  };
  const handleRescheduleCancellation = () => {
    const response = instance.put(
      `/booking/api/v1/reschedule/${
        booking.id
      }?status='cancel'&rescheduleDate=${
        booking.rescheduleRequestedDate
      }&isWorker=${user?.role !== "USER" ? false : true}`
    );
    setRescheduleCancellationModalIsOpen(false);
    console.log(response, "response of reschedule");
  };

  const userCancellationReasons = [
    "Found another worker",
    "Change in schedule",
    "No longer needed",
    "Other (please specify)",
  ];

  const workerCancellationReasons = [
    "Client not responding",
    "Schedule conflict",
    "Not feeling well",
    "Other (please specify)",
  ];

  return (
    <>
      <div
        data-aos="fade-up"
        className=" border-black-600 border-2  justify-between  bg-white items-start w-full max-w-4xl mt-3  transition-shadow duration-300 rounded-3xl p-6"
      >
        <div className="flex flex-col  ">
          {user?.role === "USER" && (
            <p className="text-black font-semibold pb-3">
              {booking.worker.service.serviceName}
            </p>
          )}
          <div className="flex  items-start gap-6">
            {user?.role === "USER" && (
              <img
                className="w-24 h-24 object-cover rounded-[10px] border-2 border-yellow-400"
                src={booking.worker.profileImageUrl}
                alt="Worker"
              />
            )}
            <div className="flex-grow text-black space-y-3">
              <div className="flex items-center">
                <p className="text-black text-sm">
                  {user?.role === "USER" ? (
                    <span>Worker Name:</span>
                  ) : (
                    <span>Client Name:</span>
                  )}
                </p>
                <p
                  onClick={() =>
                    user?.role === "USER" &&
                    navigate(`/worker-details/${booking.worker.email}`)
                  }
                  className={`ml-2 text-lg  font-medium ${
                    user?.role === "USER"
                      ? "text-blue-600 cursor-pointer hover:underline"
                      : "text-black"
                  }`}
                >
                  {user?.role === "USER"
                    ? booking.worker.fullName
                    : booking.user.fullName}
                </p>
              </div>
              <p className="text-sm text-black">
                Scheduled Date:{" "}
                <span className="font-medium">
                  {booking?.workDate
                    ? format(new Date(booking.workDate), "PPP")
                    : "N/A"}
                </span>
              </p>

              {booking.status === "REQUESTED_FOR_RESCHEDULE" ? (
                <p className="text-sm font-medium ">
                  Status:{" "}
                  <span className="text-yellow-500">
                    {" "}
                    Requested for reschedule
                  </span>
                </p>
              ) : (
                booking.status !== "CANCELLED" &&
                booking.status !== "REQUESTED" && (
                  <p className="text-sm">
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
              {booking.status === "REQUESTED" && user?.role === "USER" && (
                <p className="text-sm">
                  Status:
                  <span className={`ml-2 text-yellow-500`}>
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1).toLowerCase()}
                  </span>
                </p>
              )}
              {booking.status === "REQUESTED_FOR_RESCHEDULE" && (
                <div className="flex">
                  <p className="text-sm text-black font-semibold">
                    Reschedule requested date:
                    <span className="text-yellow-500 ml-2">
                      {format(new Date(booking.rescheduleRequestedDate), "PPP")}
                    </span>
                  </p>
                  {user?.role !== booking.rescheduleRequestedBy && (
                    <>
                      <button
                        onClick={() =>
                          setRescheduleConfirmationModalIsOpen(true)
                        }
                        className="border px-2 ms-5 text-sm border-green-600 text-green-600 rounded-[6px] hover:bg-green-600 hover:text-white transition duration-300"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          setRescheduleCancellationModalIsOpen(true)
                        }
                        className="border px-2 ms-3 text-sm border-red-400 text-red-400 rounded-[6px] hover:bg-red-400 hover:text-white transition duration-300"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-4 pt-5">
            <button
              onClick={() => {
                setBookingDetailsModalIsOpen(true);
                setSelectedBooking(booking);
              }}
              className="px-2 border text-sm border-yellow-400 text-yellow-400 rounded-[6px] hover:bg-yellow-400 hover:text-white transition duration-300"
            >
              View Details
            </button>
            <button className="border px-2 text-sm border-blue-400 text-blue-400 rounded-[6px] hover:bg-blue-400 hover:text-white transition duration-300">
              Message
            </button>
            {booking.status !== "REJECTED" &&
              booking.status !== "COMPLETED" &&
              booking.status !== "REQUESTED_FOR_RESCHEDULE" &&
              booking.status !== "REQUESTED" &&
              booking.status !== "CANCELLED" && (
                <button
                  onClick={() => setReScheduleModalIsOpen(true)}
                  className="border px-2 text-sm border-yellow-400 text-yellow-400 rounded-[6px] hover:bg-yellow-400 hover:text-white transition duration-300"
                >
                  Reschedule
                </button>
              )}
            {booking.status !== "REQUESTED" &&
              booking.status !== "CANCELLED" && (
                <button
                  onClick={() => setCancelModalIsOpen(true)}
                  className="border px-2 text-sm border-red-400 text-red-400 rounded-[6px] hover:bg-red-400 hover:text-white transition duration-300"
                >
                  Cancel
                </button>
              )}
            {booking.status === "REQUESTED" && user?.role === "USER" && (
              <button
                onClick={() => setCancelModalIsOpen(true)}
                className="border px-2 text-sm border-red-400 text-red-400 rounded-[6px] hover:bg-red-400 hover:text-white transition duration-300"
              >
                Cancel
              </button>
            )}
          </div>
          {booking.status === "CANCELLED" && (
            <p className="text-sm text-red-500 text-right  -mt-5">
              Booking is cancelled by
              {booking.cancelledBy === "user" && user?.role === "WORKER" ? (
                <span> user</span>
              ) : booking.cancelledBy === "worker" && user?.role === "USER" ? (
                <span> worker</span>
              ) : (
                <span> you</span>
              )}{" "}
              due to {booking.cancellationReason}
            </p>
          )}
          {booking.status === "REJECTED" && (
            <p className="text-sm  text-red-500 text-right">
              Booking is rejected by{" "}
              {user?.role === "WORKER" ? <span>you</span> : <span>worker</span>}{" "}
              due to {booking.reasonForRejection}
            </p>
          )}
        </div>
        {user?.role === "WORKER" && booking.status === "REQUESTED" && (
          <div className="flex justify-end">
            <p className="text-sm text-black ">Requested for your service : </p>
            <button
              onClick={() => setConfirmationModalIsOpen(true)}
              className="border px-2 ms-3 text-sm border-green-400 text-green-400 rounded-[6px] hover:bg-green-400 hover:text-white transition duration-300"
            >
              Accept
            </button>
            <button
              onClick={() => setCancelModalIsOpen(true)}
              className="border px-2 ms-3 text-sm border-red-400 text-red-400 rounded-[6px] hover:bg-red-400 hover:text-white transition duration-300"
            >
              Reject
            </button>
          </div>
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
                Reschedule request must be accepted by the{" "}
                <span>{user?.role === "USER" ? "worker" : "user"}</span>.
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
            {reasonsForCancellation.map((reason) => (
              <option key={reason} value={reason.toLowerCase()}>
                {reason}
              </option>
            ))}
          </select>
          {cancellationReason === "other (please specify)" && (
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
      <ReactModal
        isOpen={confirmationModalIsOpen}
        onRequestClose={() => setConfirmationModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center "
        overlayClassName="fixed inset-0 bg-black z-50 bg-opacity-50"
      >
        <div className="bg-white rounded-2xl p-14  shadow-lg">
          <h2 className="text-2xl font-bold mb-10 text-center">
            Confirm Booking
          </h2>
          <p className="text-center text-black mb-5">
            Are you sure you want to confirm this booking?
          </p>

          <div className="flex justify-end mt-10 space-x-2">
            <button
              className="bg-gray-500 text-white rounded px-10 py-2"
              onClick={() => setConfirmationModalIsOpen(false)}
            >
              No
            </button>
            <button
              className="bg-green-500 text-white rounded px-4 py-2"
              onClick={handleBookingConfirmation}
            >
              Yes, Confirm
            </button>
          </div>
        </div>
      </ReactModal>
      <ReactModal
        isOpen={rescheduleConfirmationModalIsOpen}
        onRequestClose={() => setRescheduleConfirmationModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center "
        overlayClassName="fixed inset-0 bg-black z-50 bg-opacity-50"
      >
        <div className="bg-white rounded-2xl p-14  shadow-lg">
          <h2 className="text-2xl font-bold mb-10 text-center">
            Confirm Reschedule
          </h2>
          <p className="text-center text-black mb-5">
            Are you sure you want to confirm Rescheduling of this booking?
          </p>

          <div className="flex justify-end mt-10 space-x-2">
            <button
              className="bg-gray-500 text-white rounded px-10 py-2"
              onClick={() => setRescheduleConfirmationModalIsOpen(false)}
            >
              No
            </button>
            <button
              className="bg-green-500 text-white rounded px-10 py-2"
              onClick={handleRescheduleConfirmation}
            >
              Yes
            </button>
          </div>
        </div>
      </ReactModal>
      <ReactModal
        isOpen={rescheduleCancellationModalIsOpen}
        onRequestClose={() => setRescheduleCancellationModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center "
        overlayClassName="fixed inset-0 bg-black z-50 bg-opacity-50"
      >
        <div className="bg-white rounded-2xl p-14  shadow-lg">
          <h2 className="text-2xl font-bold mb-10 text-center">
            Reject Reschedule
          </h2>
          <p className="text-center text-black mb-5">
            Are you sure you want to reject resheduling of this booking?
          </p>

          <div className="flex justify-end mt-10 space-x-2">
            <button
              className="bg-gray-500 text-white rounded px-10 py-2"
              onClick={() => setRescheduleCancellationModalIsOpen(false)}
            >
              No
            </button>
            <button
              className="bg-green-500 text-white rounded px-10 py-2"
              onClick={handleRescheduleCancellation}
            >
              Yes
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default BookingCard;
