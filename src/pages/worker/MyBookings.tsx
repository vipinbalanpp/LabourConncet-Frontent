import { useDispatch, useSelector } from "react-redux";
import BookingCard from "../../components/user/BookingCard";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { IBooking } from "../../interfaces/user";
import instance from "../../config/axiozConfig";
import Pagination from "../../components/public/Pagination";
import Lottie from "react-lottie";
import animatedData from "../../lotties/Animation - 1728021912821.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const MyBookings = () => {
  const worker = useSelector((state: RootState) => state.user);
  const [bookings, setBookings] = useState<IBooking[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [status, setStatus] = useState<string>("");
  const [workDate, setWorkDate] = useState<Date | null>(null);
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);

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
          serviceId: undefined,
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
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animatedData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleStatusFilter = (newStatus: string) => {
    setStatus(newStatus);
    setCurrentPage(1);
  };
  return (
    <div className="flex flex-col justify-between pt-5 w-full min-h-screen relative">
      <div className="fixed top-0 w-full bg-white z-10">
        <div className="flex justify-center pt-5 gap-6 border-b pe-32 border-gray-300">
          {[
            { label: "All", value: "" },
            { label: "Upcoming", value: "CONFIRMED" },
            { label: "Completed", value: "COMPLETED" },
            { label: "Cancelled", value: "CANCELLED" },
            { label: "Requested", value: "REQUESTED" },
          ].map((btn) => (
            <button
              key={btn.value}
              onClick={() => handleStatusFilter(btn.value)}
              className={`relative text-sm font-medium text-gray-600 hover:text-yellow-600 transition-colors duration-200 ${
                status === btn.value ? "text-yellow-600" : ""
              }`}
            >
              <span className="inline-block w-24 text-center">
                {btn.label}
                <span
                  className={`absolute left-1/2 -bottom-1 h-[2px] w-20 -translate-x-1/2 transition-all duration-300 ${
                    status === btn.value ? "bg-yellow-600" : "bg-transparent"
                  }`}
                />
              </span>
            </button>
          ))}
          <div className="ps-10">
            <button
              onClick={() => setFilterModalIsOpen(true)}
              className="px-3 py-2 text-black rounded-[6px]"
            >
              <FontAwesomeIcon icon={faFilter} />
            </button>
          </div>
        </div>
      </div>
      <div className="pt-20">
        <div className="pt-5 flex flex-col items-center gap-5">
          {bookings &&
            bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                setBookings={setBookings}
              />
            ))}
        </div>
      </div>
      {bookings?.length === 0 && (
        <div className="flex items-center justify-center">
          <div
            data-aos="fade-up"
            className="  border-2 border-yellow-600    bg-white  w-full max-w-3xl mt-3 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-3xl p-6"
          >
            <Lottie options={defaultOptions} height={200} width={200} />
            <h1 className="text-center text-lg font-semibold text-red-600">
              You don't have any{" "}
              {status.charAt(0) + status.slice(1).toLowerCase()} bookings
            </h1>
          </div>
        </div>
      )}
      <div className="pt-10">
        {bookings?.length !== 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalNumberOfPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default MyBookings;
