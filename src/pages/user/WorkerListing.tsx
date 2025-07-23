import { FaFilter, FaSearch, FaSort, FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Worker from "../../components/public/Worker";
import { useEffect, useRef, useState } from "react";
import Loading from "../../components/public/Loading";
import instance from "../../config/axiozConfig";
import Pagination from "../../components/public/Pagination";
import { Iservice } from "../../interfaces/admin";
import { IWorkerDetailsForStore } from "../../interfaces/worker";
import animatedData from "../../lotties/empty.json";
import Lottie from "react-lottie";

const WorkerListing = () => {
  const [workers, setWorkers] = useState<IWorkerDetailsForStore[]>([]);
  const { serviceName } = useParams();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [service, setService] = useState<Iservice | null>(null);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);
  const [filterApplied, setFilterApplied] = useState(false);
  useEffect(() => {
    fetchServiceDetails();
  }, []);
  useEffect(() => {
    if (service) {
      fetchWorkerData();
    }
  }, [service, searchInput, currentPage]);
  useEffect(() => {
    if (!filterApplied) {
      const radioButtons = document.querySelectorAll(
        "input[type='radio']"
      ) as NodeListOf<HTMLInputElement>;
      radioButtons.forEach((radio) => (radio.checked = false));
    }
  }, [filterApplied]);

  const fetchServiceDetails = async () => {
    const { data } = await instance.get(
      `service/api/v1/serviceDetail?serviceName=${serviceName}`
    );
    if (data) {
      setService(data);
    }
  };

  const fetchWorkerData = async () => {
    const params = {
      pageNumber: currentPage - 1,
      pageSize: 9,
      serviceId: service?.serviceId,
      searchInput,
      isBlocked: false,
      priceSort: price,
      experienceSort: experience,
    };
    const workerResponse = await instance.get(`user/api/v1/getAllWorkers`, {
      params,
    });
    if (workerResponse) {
      setTotalPages(workerResponse.data.totalNumberOfPages);
      setWorkers(workerResponse.data.workers);
      console.log(workerResponse, "workerslist response");
      console.log(totalPages, "toal nsuifdsflsdkjflskdfj");
    }
  };
  const handlePriceSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
    console.log(price);
  };
  const handleExperienceSortChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExperience(event.target.value);
  };
  const handleFilter = () => {
    fetchWorkerData();
    setFilterApplied(true);
    setCurrentPage(0);
  };
  const handleRemoveFilter = () => {
    setPrice(null);
    setExperience(null);
    setFilterApplied(false);
    setCurrentPage(1);
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animatedData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {workers.length > 0 && (
        <>
          <div className="px-44">
            <div className="flex justify-end w-full mt-10 p-5 hover:shadow-lg rounded-xl">
              <FaSearch className="text-2xl mt-3 text-black" />
              <input
                ref={inputRef}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full  bg-white  border-b  pl-6  text-black"
                placeholder="Search for worker... "
              />
            </div>
          </div>
          <div className="flex bg-white ps-5">
            <div className="border mt-10 py-6 w-64 h-[550px] shadow-2xl rounded-2xl">
              <p className="flex items-center text-black justify-center text-lg font-semibold mb-4">
                <FaFilter className="mr-2" />
                Filter
              </p>
              <hr />
              <div className="ps-10">
                <p className="text-sm font-medium text-gray-700">Rating</p>
                <ul className="space-y-3 mt-4">
                  <li className="flex gap-3 text-xl text-yellow-500">
                    <input
                      type="checkbox"
                      className="border rounded p-1 mr-2"
                    />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </li>
                  <li className="flex gap-3 text-xl text-yellow-500">
                    <input
                      type="checkbox"
                      className="border rounded p-1 mr-2"
                    />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar className="text-gray-300" />
                  </li>
                  <li className="flex gap-3 text-xl text-yellow-500">
                    <input
                      type="checkbox"
                      className="border gap-3 text-xl rounded p-1 mr-2"
                    />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar className="text-gray-300" />
                    <FaStar className="text-gray-300" />
                  </li>
                  <li className="flex gap-3 text-xl text-gray-300">
                    <input
                      type="checkbox"
                      className="border rounded p-1 mr-2"
                    />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </li>
                  <li className="flex gap-3 text-xl text-gray-300">
                    <input
                      type="checkbox"
                      className="border rounded p-1 mr-2"
                    />
                    <FaStar className="text-yellow-500" />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </li>
                </ul>
              </div>
              <div className="pt-10">
                <hr className="mb-4" />
                <p className="flex items-center text-black justify-center text-lg font-semibold mb-4">
                  <FaSort className="mr-2" />
                  Sort
                </p>
                <hr className="mt-4" />
              </div>
              <div className="flex gap-8 justify-between p-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm  text-gray-700 text-center font-bold">
                    Price
                  </p>
                  <label
                    htmlFor="lowToHigh"
                    className="text-xs font-medium text-gray-700 flex items-center"
                  >
                    <input
                      type="radio"
                      name="price"
                      id="lowToHigh"
                      className="mr-2"
                      value="lowToHigh"
                      onChange={handlePriceSortChange}
                    />
                    Low to High
                  </label>
                  <label
                    htmlFor="highToLow"
                    className="text-xs font-medium text-gray-700 flex items-center"
                  >
                    <input
                      type="radio"
                      name="price"
                      id="highToLow"
                      value="highToLow"
                      className="mr-2"
                      onChange={handlePriceSortChange}
                    />
                    High to Low
                  </label>
                </div>
                <div className="flex flex-col space-y-2 ">
                  <p className="text-sm  text-gray-700 text-center font-bold">
                    Experience
                  </p>
                  <label
                    htmlFor="lowToHigh"
                    className="text-xs font-medium text-gray-700 flex items-center"
                  >
                    <input
                      type="radio"
                      name="experience"
                      id="lowToHigh"
                      className="mr-2"
                      value="lowToHigh"
                      onChange={handleExperienceSortChange}
                    />
                    Low to High
                  </label>
                  <label
                    htmlFor="highToLow"
                    className="text-xs font-medium text-gray-700 flex items-center"
                  >
                    <input
                      type="radio"
                      name="experience"
                      id="highToLow"
                      value="highToLow"
                      className="mr-2"
                      onChange={handleExperienceSortChange}
                    />
                    High to Low
                  </label>
                </div>
              </div>
              <div className="flex justify-center w-full px-3 mt-10">
                {!filterApplied ? (
                  <button
                    onClick={handleFilter}
                    className="bg-yellow-400 text-white rounded-[7px] w-full text-sm py-1 px-3 font-semibold"
                  >
                    Apply
                  </button>
                ) : (
                  <button
                    onClick={handleRemoveFilter}
                    className="bg-red-400 text-white rounded-[7px] w-full text-sm py-1 px-3 font-semibold"
                  >
                    Remove filter
                  </button>
                )}
              </div>
            </div>

            <div
              className={` w-4/5   flex flex-wrap gap-11 ps-10 pt-10  bg-white`}
            >
              {workers.map((worker) => (
                <Worker key={worker.id} worker={worker} />
              ))}
            </div>
          </div>
        </>
      )}
      {workers.length === 0 && (
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
          <div
            className="h-[300px] w-[500px] bg-white  flex flex-col items-center justify-center  text-black font-semibold px-4 py-3 rounded relative shadow-xl"
            role="alert"
          >
            <Lottie options={defaultOptions} height={200} width={200} />
            <p className="mt-2">
              No workers available for{" "}
              {searchInput && (
                <span>
                  search of{" "}
                  <span className="text-red-500 font-semibold">
                    "{searchInput}"
                  </span>
                </span>
              )}{" "}
              {!searchInput && (
                <span>
                  {" "}
                  service{" "}
                  <span className="text-lg text-yellow-400 font-semibold">
                    {serviceName}
                  </span>
                </span>
              )}
              .
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => {
                  if (searchInput) {
                    setSearchInput("");
                    if (inputRef.current) inputRef.current.value = "";
                  } else {
                    navigate("/service-list");
                  }
                }}
                className="bg-white px-4 py-2 rounded-xl text-blue-400 text-sm font-semibold shadow-md hover:bg-gray-100"
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      )}
      {workers.length > 0 && (
        <div className="pt-10 ps-48 bg-white">
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      )}
      {loading && <Loading />}
    </>
  );
};

export default WorkerListing;
