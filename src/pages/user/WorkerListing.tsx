import { FaFilter, FaSearch, FaSort } from "react-icons/fa";
import Footer from "../../components/public/Footer";
import Navbar from "../../components/public/Navbar";
import Worker from "../../components/public/Worker";

const WorkerListing = () => {
  return (
    <>
      <Navbar />
      <div className="px-44">
        <div className="flex justify-center w-full mt-10 p-5 hover:shadow-lg rounded-xl">
          <FaSearch className="text-2xl mt-3 text-black" />
          <input
            className="w-full  bg-white  border-b  pl-4  text-black"
            placeholder="Search for worker... "
          />
          <button className="h-[50px] bg-yellow-500 w-32 rounded-xl border  ms-2  text-white hover:rounded-3xl duration-300">
            Search
          </button>
        </div>
        <div className="flex justify-end gap-5 px-20">
          <button className="hover:shadow-xl hover:border-0 duration-300 border px-10 py-2 text-black font-semibold rounded-3xl flex items-center">
            <FaSort/>
            Sort
          </button>
          <button className="hover:shadow-xl hover:border-0 duration-300 border px-10 py-2 text-black font-semibold rounded-3xl flex items-center">
          <FaFilter />Filter
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-10 ">
        <Worker />
        <Worker />
        <Worker />
        <Worker />
        <Worker />
        <Worker />
        <Worker />
        <Worker />
        <Worker />
        <Worker />
        <Worker />
        <Worker />
        <Worker />
        <Worker />
        <Worker />
        <Worker />
        <Worker />
        <Worker />
        <Worker />
        <Worker />
      </div>
      <Footer />
    </>
  );
};

export default WorkerListing;
