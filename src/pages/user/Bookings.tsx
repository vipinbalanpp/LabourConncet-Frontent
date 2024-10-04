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

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<IBooking[] | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [services, setServices] = useState<Iservice[]>([]);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchBookings();
    fetchAllServices();
  }, [currentPage, status, serviceId]);

  const fetchBookings = async () => {
    try {
      const response = await instance.get(
        `/booking/api/v1?userId=${user?.id}&pageNumber=${currentPage - 1}${
          status ? `&status=${status}` : ""
        }${serviceId ? `&serviceId=${serviceId}` : ""}`
      );
      if (response) {
        console.log("Bookings received from API:", response.data.bookings);
        setBookings(response.data.bookings);
        setTotalNumberOfPages(response.data.totalNumberOfPages);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
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
          <div className="flex justify-center me-56 pt-5 gap-2">
            <button
              onClick={() => handleStatusFilter("")}
              className={`border border-1 px-2 py-1 font-semibold text-sm rounded-[7px] ${
                status === "" ? "bg-yellow-400 text-white" : ""
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleStatusFilter("UPCOMING")}
              className={`border border-1 px-2 py-1 font-semibold text-sm rounded-[7px] ${
                status === "UPCOMING" ? "bg-yellow-400 text-white" : ""
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => handleStatusFilter("COMPLETED")}
              className={`border border-1 px-2 py-1 font-semibold text-sm rounded-[7px] ${
                status === "COMPLETED" ? "bg-yellow-400 text-white" : ""
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => handleStatusFilter("CANCELLED")}
              className={`border border-1 px-2 py-1 font-semibold text-sm rounded-[7px] ${
                status === "CANCELLED" ? "bg-yellow-400 text-white" : ""
              }`}
            >
              Cancelled
            </button>
            <button
              onClick={() => handleStatusFilter("REQUESTED")}
              className={`border border-1 px-2 py-1 font-semibold text-sm rounded-[7px] ${
                status === "REQUESTED" ? "bg-yellow-400 text-white" : ""
              }`}
            >
              Requested
            </button>

            <div className="ps-10">
              <button
                onClick={() => setFilterModalIsOpen(true)}
                className="border px-3 py-1 text-black rounded-[6px]"
              >
                <FontAwesomeIcon icon={faFilter} /> Filter
              </button>
            </div>
          </div>
          <hr className="mt-5" />
        </div>
        {/* <div className="pt-20"> */}
        <div className="pt-28 flex flex-col items-center gap-10">
          {bookings &&
            bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                setBookings={setBookings}
              />
            ))}
        </div>
        {/* </div> */}
        <div className="pt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalNumberOfPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      <ReactModal
        isOpen={filterModalIsOpen}
        onRequestClose={() => setFilterModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        <div className="bg-white p-5 rounded-md">
          <h2 className="text-lg font-bold mb-4">Filter by Service</h2>
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
          <div className="flex justify-end mt-10 space-x-2">
            <button
              className="bg-gray-500 text-white rounded px-4 py-2"
              onClick={() => setFilterModalIsOpen(false)}
            >
              Close
            </button>
            <button
              className="bg-red-500 text-white rounded px-4 py-2"
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
