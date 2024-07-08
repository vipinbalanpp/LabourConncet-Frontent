import { useDispatch, useSelector } from "react-redux";
import WorkerListTable from "../../components/admin/WorkerListTable";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import Pagination from "../../components/public/Pagination";
import instance from "../../config/axiozConfig";
import { getAllWorkers } from "../../redux/actions/adminActions";

const WorkersList = () => {
  const workers = useSelector((state: RootState) => state.admin.workers);
  const services = useSelector((state: RootState) => state.admin.services);
  const dispatch = useDispatch<AppDispatch>();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [isBlocked, setIsBlocked] = useState<boolean | null>(null);
  const [serviceId, setServiceId] = useState<number | null>(null);
  useEffect(() => {
    console.log(services);

    const fetchData = async () => {
      try {
        dispatch(
          getAllWorkers({
            pageNumber: currentPage - 1,
            isBlocked: isBlocked,
            searchInput,
            serviceId: serviceId,
          })
        );
        let query = `user/api/v1/getTotalPageNumbersOfWorkers?searchInput=${encodeURIComponent(
          searchInput
        )}`;
        if (serviceId !== null) {
          query += `&serviceId=${serviceId}`;
        }
        if (isBlocked !== null) {
          query += `&isBlocked=${isBlocked}`;
        }
        const { data } = await instance.get(query);
        setTotalNumberOfPages(data);
      } catch (error) {}
    };
    fetchData();
  }, [searchInput, isBlocked, currentPage, dispatch, serviceId]);

  const handleServiceSelect = (serviceName: string) => {
    setShowDropdown(false);
    if (serviceName === "All") {
      setServiceId(null);
      return;
    }
    const service = services.find(
      (service) => service.serviceName === serviceName
    );
    if (service) {
      if(service.serviceId)
      setServiceId(service?.serviceId);
      console.log(serviceId, "this is service id");
    } else {
      console.log("Service not found");
    }
  };
  return (
    <>
      <div className="flex-grow py-6 px-1 mt-1 bg-white">
        <div className="flex justify-between">
          <div></div>
          <div></div>
          <div className="flex justify-center gap-1 mt-6">
            <button
              onClick={() => setIsBlocked(null)}
              className={`px-3 py-1 rounded-[7px] text-sm border border-[rgb(31,41,55)] ${
                isBlocked === null
                  ? "bg-[rgb(234,179,8)] text-white"
                  : "bg-white text-black"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setIsBlocked(false)}
              className={`px-3 py-1 rounded-[7px] text-sm border  border-[rgb(234,179,8)] ${
                isBlocked === false
                  ? "bg-[rgb(234,179,8)] text-white"
                  : "bg-white text-black"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setIsBlocked(true)}
              className={`px-3 py-1 rounded-[7px] text-sm border border-[rgb(234,179,8)] ${
                isBlocked === true
                  ? "bg-[rgb(234,179,8)] text-white"
                  : "bg-white text-black"
              }`}
            >
              Blocked
            </button>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setShowDropdown(true)}
              className="px-2 mt-5 me-2 py-1 rounded-[7px] font-semibold text-sm border border-[rgb(31,41,55)] bg-[rgb(31,41,55)] text-white"
            >
              Filter By service
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                <button
                  onClick={() => setShowDropdown(false)}
                  className="text-red-600 absolute right-0 p-2"
                >
                  <FaWindowClose />
                </button>
                <div
                  className="px-4  text-black cursor-pointer hover:bg-gray-200"
                  onClick={() => handleServiceSelect("All")}
                >
                  All
                </div>
                {services.map((service) => (
                  <div
                    key={service.serviceName}
                    className="px-4 py-2 text-black cursor-pointer hover:bg-gray-200"
                    onClick={() => handleServiceSelect(service.serviceName)}
                  >
                    {service.serviceName}
                  </div>
                ))}
              </div>
            )}
            <div className="px-3">
            <input
    onChange={(e) => setSearchInput(e.target.value)}
    className="bg-white me-3 border-2 rounded-2xl text-black border-yellow-500 text-blackrounded-lg px-3 py-2 text-sm focus:outline-none  focus:ring-[rgb(31,41,55)] focus:border-[rgb(31,41,55)] "
    type="text"
    placeholder="Search..."
  />
            </div>
          </div>
        </div>
        {workers.length > 0 && <WorkerListTable workers={workers} />}
        {workers.length === 0 && (
          <div
            className="bg-yellow-100 border mt-20 h-[100px] border-yellow-300 text-yellow-700 px-10 mx-10 py-3 rounded relative shadow-md flex items-center justify-between"
            role="alert"
          >
            <div>
              <strong className="font-bold">Notice: </strong>
              <span className="block sm:inline">No workers available.</span>
            </div>
          </div>
        )}
        {workers.length > 0 && (
          <div className="flex justify-center gap-10 mt-4">
            <Pagination
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalPages={totalNumberOfPages}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default WorkersList;
