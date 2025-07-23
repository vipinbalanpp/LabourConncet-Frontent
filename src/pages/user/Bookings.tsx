import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BookingCard from "../../components/user/BookingCard";
import { RootState } from "../../redux/store";
import { IBooking } from "../../interfaces/user";
import instance from "../../config/axiozConfig";
import Pagination from "../../components/public/Pagination";
import { Iservice } from "../../interfaces/admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import ReactModal from "react-modal";
import Lottie from "react-lottie";
import animatedData from "../../lotties/Animation - 1728021912821.json";
import AvailabilityCalendar from "../../components/worker/AvailabilityCalender";

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<IBooking[] | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [services, setServices] = useState<Iservice[]>([]);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [status, setStatus] = useState("");
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [dateSelectionError, setDateSelectionError] = useState<string | null>(
    null
  );
  useEffect(() => {
    fetchBookings();
    fetchAllServices();
  }, [currentPage, status, serviceId]);

  const fetchBookings = async () => {
    try {
      const response = await instance.get("/booking/api/v1", {
        params: {
          ...(user?.role === "USER" && { userId: user.id }),
          ...(user?.role === "WORKER" && { workerId: user.id }),
          ...(status && { status }),
          pageNumber: currentPage - 1,
          ...(selectedDate && { workDate: selectedDate }),
          serviceId: serviceId ? serviceId : undefined,
        },
      });
      if (response) {
        console.log("Bookings received from API:", response.data.bookings);
        setBookings(response.data.bookings);
        setTotalNumberOfPages(response.data.totalNumberOfPages);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animatedData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const fetchAllServices = async () => {
    try {
      const serviceResponse = await instance.get(`service/api/v1/services`);
      if (serviceResponse) {
        setServices(serviceResponse.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleStatusFilter = (newStatus: string) => {
    setStatus(newStatus);
    setCurrentPage(1);
  };

  const handleServiceFilter = (newServiceId: number | null) => {
    setServiceId(newServiceId);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="flex flex-col justify-between pt-5 w-full min-h-screen relative">
        <div className="fixed top-0 w-full bg-white z-10">
          <div className="flex justify-center pt-5 gap-6  pe-32 ">
            {[
              { label: "All", value: "" },
              { label: "Upcoming", value: "CONFIRMED" },
              { label: "Completed", value: "COMPLETED" },
              { label: "Cancelled", value: "CANCELLED" },
              {
                label: `${user?.role === "USER" ? "Requested" : "Reqeusts"}`,
                value: "REQUESTED",
              },
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
        <div className="pt-14 flex flex-col items-center">
          {bookings &&
            bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                setBookings={setBookings}
              />
            ))}
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
                {status !== "" && (
                  <span>
                    {" "}
                    {status.charAt(0) + status.slice(1).toLowerCase()}
                  </span>
                )}{" "}
                bookings
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
      <ReactModal
        isOpen={filterModalIsOpen}
        onRequestClose={() => setFilterModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full px-8 py-10 space-y-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Filter Services
          </h2>

          <div className="space-y-2">
            <select
              onChange={(e) =>
                handleServiceFilter(
                  e.target.value ? Number(e.target.value) : null
                )
              }
              value={serviceId || ""}
              className="bg-white text-black border border-black p-2 rounded"
            >
              <option value="">All Services</option>
              {services.map((service) => (
                <option key={service.serviceId} value={service.serviceId}>
                  {service.serviceName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <AvailabilityCalendar
              bookedDates={bookedDates}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setDateSelectionError={setDateSelectionError}
            />
          </div>

          <div className="flex justify-end pt-6 space-x-3">
            <button
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
              onClick={() => setFilterModalIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              onClick={() => {
                setFilterModalIsOpen(false);
              }}
            >
              Apply Filter
            </button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default Bookings;
