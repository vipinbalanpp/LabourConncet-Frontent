import { useEffect, useState } from "react";
import { IBooking } from "../../interfaces/user";
import Modal from "react-modal";
import instance from "../../config/axiozConfig";
import toast from "react-hot-toast";
import { format } from "date-fns";
import CustomButton from "./CustomButton";
import AvailabilityCalender from "../worker/AvailabilityCalender";

type BookingType = {
  booking: IBooking;
  setBookings: React.Dispatch<React.SetStateAction<IBooking[] | null>>;
};

const BookingCard = ({ booking, setBookings }: BookingType) => {
  const [bookingDetailsModalIsOpen, setBookingDetailsModalIsOpen] =
    useState(false);
  const [bookingConfirmationModalIsOpen, setBookingConfirmationModalIsOpen] =
    useState(false);
  const [bookingRejectionModalIsOpen, setBookingRejectionModalIsOpen] =
    useState(false);
  const [cancelModalIsOpen, setCancelModalIsOpen] = useState(false);
  const [
    bookingRescheduleConfirmationModalIsOpen,
    setBookingRescheduleConfirmationModalIsOpen,
  ] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [cancellationReason, setCancellationReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [reScheduleModalIsOpen, setReScheduleModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
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

  const handleBookingConfirmation = () => {
    instance
      .put(`/booking/api/v1/confirm/${booking.id}`)
      .then((result) => {
        toast.success("Booking Confirmed successfully.");
        console.log(result);
        setBookingConfirmationModalIsOpen(false);
      })
      .catch((error) => {
        console.error("Error cancelling booking:", error);
        toast.error("Failed to cancel booking.");
      });
    setBookingConfirmationModalIsOpen(false);
  };
  const handleBookingRejection = () => {
    if (!rejectionReason) {
      toast.error("Please select a reason for rejection.");
      return;
    } else if (rejectionReason === "other") {
      if (otherReason.trim().length < 10) {
        toast.error("Please specify the reason for rejection");
        return;
      }
    }
    const reason = rejectionReason !== "other" ? rejectionReason : otherReason;
    console.log(reason);

    instance
      .put(`/booking/api/v1/reject/${booking.id}?reasonForRejection=${reason}`)
      .then((result) => {
        toast.success("Booking Rejected successfully.");
        console.log(result);
        setBookingRejectionModalIsOpen(false);
      })
      .catch((error) => {
        console.error("Error rejecting booking:", error);
        toast.error("Failed to reject booking.");
      });
  };
  const handleBookingRescheduleConfirmation = () => {
    const status = "RESCHEDULE_REQUEST_CONFIRMED";
    instance
      .put(`/booking/api/v1/update/${booking.id}?status=${status}`)
      .then((result) => {
        toast.success("Booking reshedule confirmed successfully.");
        console.log(result);
        setBookingRescheduleConfirmationModalIsOpen(false);
      })
      .catch((error) => {
        console.error("Error confirming reshedule booking:", error);
        toast.error("Failed to confirm reshedule request.");
      });
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
      cancelledBy: "worker",
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

  return (
    <>
      <div className="flex justify-between  items-center border-2 border-yellow-600 shadow-md rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 w-full max-w-5xl  mt-5">
        <div className="text-gray-700 space-y-2">
          <p className="text-black text-sm">
            Scheduled date:
            <span className="font-semibold ps-1">
              {booking?.workDate
                ? format(new Date(booking.workDate), "PPP")
                : "N/A"}
            </span>
          </p>
          <p className="text-black text-sm">
            Client name:
            <span className="font-semibold ps-1"> {booking.user.fullName}</span>
          </p>
          <p className="text-black text-sm">
            Location:{" "}
            <span className="font-semibold ps-1">
              {booking.workLocationAddress.city}
            </span>
          </p>
          {booking.status === "REQUESTED" ? (
            <div className="flex gap-10 h-7 items-center">
              <p className="text-yellow-600 pt-4">Requested for booking</p>
              <CustomButton
                style="border border-green-600 text-green-600 text-sm px-2 py-1 rounded hover:bg-green-600 duration-300 hover:text-white transition-colors"
                text="Accept"
                onClick={() => setBookingConfirmationModalIsOpen(true)}
              />
              <CustomButton
                style="border border-red-400 text-red-400 text-sm px-2 py-1 rounded hover:bg-red-400 duration-300 hover:text-white transition-colors"
                text="Reject"
                onClick={() => setBookingRejectionModalIsOpen(true)}
              />
            </div>
          ) : booking.status === "REQUESTED_FOR_RESCHEDULE" ? (
            <div className="flex gap-10 h-7 items-center">
              <p className="text-yellow-600 pt-4">Requested for Reshedule</p>
              <CustomButton
                style="border border-green-600 text-green-600 text-sm px-2 py-1 rounded hover:bg-green-600 duration-300 hover:text-white transition-colors"
                text="Confirm"
                onClick={() =>
                  setBookingRescheduleConfirmationModalIsOpen(true)
                }
              />
              <CustomButton
                style="border border-red-400 text-red-400 text-sm px-2 py-1 rounded hover:bg-red-400 duration-300 hover:text-white transition-colors"
                text="Reject"
                onClick={() => setBookingRejectionModalIsOpen(true)}
              />
            </div>
          ) : booking.status === "REJECTED" ? (
            <p className="text-red-500 pt-4">
              Rejected due to {booking.reasonForRejection}
            </p>
          ) : (
            <p className="text-green-500 pt-4">Accepted</p>
          )}
        </div>
        <div className="flex space-x-3">
          <CustomButton
            style="border border-yellow-600 font-semibold text-yellow-600 text-sm px-2 py-1 rounded hover:bg-yellow-600 duration-300 hover:text-white transition-colors"
            text=" View Details"
            onClick={() => setBookingDetailsModalIsOpen(true)}
          />
          <CustomButton
            style="border border-blue-400 text-blue-400 text-sm px-2 py-1 rounded hover:bg-blue-400 duration-300 hover:text-white transition-colors"
            text="Message"
          />
          <CustomButton
            onClick={() => setReScheduleModalIsOpen(true)}
            style="border border-yellow-600 font-semibold text-yellow-600 text-sm px-2 py-1 rounded hover:bg-yellow-600 duration-300 hover:text-white transition-colors"
            text="Reschedule"
          />
          {booking.status !== "REQUESTED" && (
            <CustomButton
              style="border border-red-400 text-red-400 text-sm px-2 py-1 rounded hover:bg-red-400 duration-300 hover:text-white transition-colors"
              text="Cancel"
              onClick={() => setCancelModalIsOpen(true)}
            />
          )}
        </div>
      </div>
      {bookingDetailsModalIsOpen && (
        <Modal
          isOpen={bookingDetailsModalIsOpen}
          onRequestClose={() => setBookingDetailsModalIsOpen(false)}
          className="fixed inset-0 flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white rounded-xl p-8 w-full max-w-4xl shadow-xl transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Booking Details
              </h2>
              <button onClick={() => setBookingDetailsModalIsOpen(false)}>
                <span className="text-red-500 text-2xl hover:text-red-700 transition-colors duration-200">
                  ×
                </span>
              </button>
            </div>
            <div className="space-y-4 text-lg">
              <p className="text-gray-700 font-medium">
                <span className="font-semibold">Client Name:</span>{" "}
                {booking?.user.fullName}
              </p>
              <p className="text-gray-700 font-medium">
                <span className="font-semibold">Work Site Location:</span>{" "}
                <span>{booking?.workLocationAddress.houseName}</span>,{" "}
                <span>{booking?.workLocationAddress.street}</span>,{" "}
                <span>{booking?.workLocationAddress.city}</span>,{" "}
                <span>{booking?.workLocationAddress.state}</span>
              </p>
              <p className="text-gray-700 font-medium">
                <span className="font-semibold">Work Description:</span>{" "}
                {booking?.workDescription}
              </p>
              <p className="text-gray-700 font-medium">
                <span className="font-semibold">Work Date:</span>{" "}
                {booking?.workDate
                  ? format(new Date(booking.workDate), "PPP")
                  : "N/A"}
              </p>
            </div>
          </div>
        </Modal>
      )}
      <Modal
        isOpen={bookingConfirmationModalIsOpen}
        onRequestClose={() => setBookingConfirmationModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center "
        overlayClassName="fixed inset-0 z-50 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-xl p-10  max-w-lg w-full mx-4 space-y-10 shadow-xl transition-transform transform">
          <h2 className="text-3xl font-bold mb-6 text-center ">
            Confirm Booking
          </h2>
          <p className="text-center text-black mb-8">
            Are you sure you want to confirm this booking ?
          </p>
          <div className="flex justify-end mt-8 space-x-4">
            <CustomButton
              style="px-10 py-1 font-semibold text-red-600 border border-red-600 rounded-xl hover:bg-red-100 transition duration-300"
              text="No"
              onClick={() => setBookingConfirmationModalIsOpen(false)}
            />
            <CustomButton
              style="px-10 py-1  font-semibold text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-100 transition duration-300"
              text="Yes"
              onClick={() => handleBookingConfirmation()}
            />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={bookingRescheduleConfirmationModalIsOpen}
        onRequestClose={() =>
          setBookingRescheduleConfirmationModalIsOpen(false)
        }
        className="fixed inset-0 flex items-center justify-center "
        overlayClassName="fixed inset-0 z-50 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-xl p-10  max-w-lg w-full mx-4 space-y-10 shadow-xl transition-transform transform">
          <h2 className="text-3xl font-bold mb-6 text-center ">
            Confirm Booking
          </h2>
          <p className="text-center text-black mb-8">
            Are you sure you want to confirm Reschedule ?
          </p>
          <div className="flex justify-end mt-8 space-x-4">
            <CustomButton
              style="px-10 py-1 font-semibold text-red-600 border border-red-600 rounded-xl hover:bg-red-100 transition duration-300"
              text="No"
              onClick={() => setBookingConfirmationModalIsOpen(false)}
            />
            <CustomButton
              style="px-10 py-1  font-semibold text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-100 transition duration-300"
              text="Yes"
              onClick={() => handleBookingRescheduleConfirmation()}
            />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={bookingRejectionModalIsOpen}
        onRequestClose={() => setBookingRejectionModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      >
        <div className="bg-white rounded-xl p-10 max-w-lg w-full mx-4 space-y-10 shadow-xl transition-transform transform">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Reject Booking
          </h2>
          <p className="text-center text-black mb-8">
            Are you sure you want to reject this booking? Please provide a
            reason for rejection.
          </p>
          <label
            htmlFor="rejectionReason"
            className="block text-sm font-medium text-gray-700"
          >
            Reason for Rejection
          </label>
          <select
            id="rejectionReason"
            name="rejectionReason"
            className="mt-1 text-black block w-full pl-3 pr-10 py-3 text-base border rounded-xl bg-white border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => setRejectionReason(e.target.value)}
            value={rejectionReason}
          >
            <option value="" disabled>
              Select a reason
            </option>
            <option value="Conflict with Another Booking">
              Conflict with Another Booking
            </option>
            <option value="Unavailability of Necessary Equipment">
              Unavailability of Necessary Equipment
            </option>
            <option value="Incompatibility with Job Requirements">
              Incompatibility with Job Requirements
            </option>
            <option value="Location Too Far">Location Too Far</option>
            <option value="Insufficient Information Provided">
              Insufficient Information Provided
            </option>
            <option value="Schedule Conflict with Personal Plans">
              Schedule Conflict with Personal Plans
            </option>
            <option value="Health or Safety Concerns">
              Health or Safety Concerns
            </option>
            <option value="Incomplete or Unclear Instructions">
              Incomplete or Unclear Instructions
            </option>
            <option value="Overbooked">Overbooked</option>
            <option value="other">Other (please specify)</option>
          </select>
          {rejectionReason === "other" && (
            <textarea
              id="otherReason"
              name="otherReason"
              rows={4}
              className="mt-2 block w-full text-black bg-white pl-3 pr-10 py-2 text-lg border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-xl"
              placeholder="Please specify the reason"
              onChange={(e) => setOtherReason(e.target.value)}
              value={otherReason}
            ></textarea>
          )}
          <div className="flex justify-end mt-10 space-x-4">
            <CustomButton
              style="px-10 py-1 font-semibold text-red-600 border border-red-600 rounded-xl hover:bg-red-100 transition duration-300"
              text="No"
              onClick={() => setBookingRejectionModalIsOpen(false)}
            />
            <CustomButton
              style="px-10 py-1 font-semibold text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-100 transition duration-300"
              text="Yes"
              onClick={() => handleBookingRejection()}
            />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={cancelModalIsOpen}
        onRequestClose={() => setCancelModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      >
        <div className="bg-white rounded-xl p-10 max-w-lg w-full mx-4 space-y-10 shadow-xl transition-transform transform">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Request Cancellation
          </h2>
          <p className="text-center text-black mb-8">
            Are you sure you want to cancel this booking ? Please provide a
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
            value={cancellationReason}
          >
            <option value="" disabled>
              Select a reason
            </option>
            <option value="Conflict with Another Booking">
              Conflict with Another Booking
            </option>
            <option value="Unavailability of Necessary Equipment">
              Unavailability of Necessary Equipment
            </option>
            <option value="Incompatibility with Job Requirements">
              Incompatibility with Job Requirements
            </option>
            <option value="Location Too Far">Location Too Far</option>
            <option value="Insufficient Information Provided">
              Insufficient Information Provided
            </option>
            <option value="Schedule Conflict with Personal Plans">
              Schedule Conflict with Personal Plans
            </option>
            <option value="Health or Safety Concerns">
              Health or Safety Concerns
            </option>
            <option value="Incomplete or Unclear Instructions">
              Incomplete or Unclear Instructions
            </option>
            <option value="Overbooked">Overbooked</option>
            <option value="other">Other (please specify)</option>
          </select>
          {cancellationReason === "other" && (
            <textarea
              id="otherReason"
              name="otherReason"
              rows={4}
              className="mt-2 block w-full text-black bg-white pl-3 pr-10 py-2 text-lg border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-xl"
              placeholder="Please specify the reason"
              onChange={(e) => setOtherReason(e.target.value)}
              value={otherReason}
            ></textarea>
          )}
          <div className="flex justify-end mt-10 space-x-4">
            <CustomButton
              style="px-10 py-1 font-semibold text-red-600 border border-red-600 rounded-xl hover:bg-red-100 transition duration-300"
              text="No"
              onClick={() => setCancelModalIsOpen(false)}
            />
            <CustomButton
              style="px-10 py-1 font-semibold text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-100 transition duration-300"
              text="Yes,Cancel"
              onClick={() => handleCancellation()}
            />
          </div>
        </div>
      </Modal>

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
    </>
  );
};

export default BookingCard;
