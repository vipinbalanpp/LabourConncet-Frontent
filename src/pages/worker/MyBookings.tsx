import { useDispatch, useSelector } from "react-redux";
import BookingCard from "../../components/public/BookingCard";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { IBooking } from "../../interfaces/user";
import instance from "../../config/axiozConfig";
import Pagination from "../../components/public/Pagination";

const MyBookings = () => {
  const worker = useSelector((state: RootState) => state.user);
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [status, setStatus] = useState<string>("");
  const [workDate, setWorkDate] = useState<Date | null>(null);
  useEffect(() => {
    fetchBookings();
  }, [currentPage, status]);

  const fetchBookings = async () => {
    try {
      const response = await instance.get("/booking/api/v1", {
        params: {
          workerId: worker?.id || undefined,
          status: status || undefined,
          pageNumber: currentPage - 1,
          workDate: workDate ? workDate : undefined,
          serviceId: null || undefined,
        },
      });

      if (response) {
        console.log(response, "response of all bookings");

        console.log(response.data, "this is the bookings I wnat");
        setBookings(response.data.bookings);

        setTotalNumberOfPages(response.data.totalNumberOfPages);
      }
    } catch (error) {}
  };
  return (
    <div className="flex flex-col justify-between pt-5 w-full min-h-screen relative">
      <div className="fixed top-0 w-full bg-white z-10">
        <div className="flex justify-center me-56 pt-5 gap-2">
          <button
            onClick={() => setStatus("")}
            className={`border border-1 px-2 py-1 font-semibold text-sm rounded-[7px] ${
              status === "" ? "bg-yellow-400 text-white" : ""
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatus("REQUESTED")}
            className={`border border-1 px-2 py-1 font-semibold text-sm rounded-[7px] ${
              status === "REQUESTED" ? "bg-yellow-400 text-white" : ""
            }`}
          >
            Requests
          </button>
          <button
            onClick={() => setStatus("CONFIRMED")}
            className={`border border-1 px-2 py-1 font-semibold text-sm rounded-[7px] ${
              status === "CONFIRMED" ? "bg-yellow-400 text-white" : ""
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setStatus("COMPLETED")}
            className={`border border-1 px-2 py-1 font-semibold text-sm rounded-[7px] ${
              status === "COMPLETED" ? "bg-yellow-400 text-white" : ""
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setStatus("CANCELLED")}
            className={`border border-1 px-2 py-1 font-semibold text-sm rounded-[7px] ${
              status === "CANCELLED" ? "bg-yellow-400 text-white" : ""
            }`}
          >
            Cancelled
          </button>
        </div>
        <hr className="mt-5" />
      </div>
      <div className="pt-20">
        <div className="pt-5 flex flex-col items-center gap-5">
          {bookings &&
            bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
        </div>
      </div>
      <div className="pt-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalNumberOfPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default MyBookings;
